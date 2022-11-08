import { getMongoConnection } from "../../config/mongodb";
import { genTokens } from "../../lib/jwt";
import { checkPassword, hashPassword } from "../../utils/crypto";
import { IUser } from "../entities/IUser";
import { AbstractMongoDao } from "./AbstractMongoDao";

export class UserMongoDao extends AbstractMongoDao<IUser> {
  constructor() {
    super("users", getMongoConnection());
  }
  async signup(user: IUser) {
    user.password = await hashPassword(user.password);
    const currentDate = new Date();
    user = {
      failedLoginAttempts: 0,
      updated: currentDate,
      lastLogin: currentDate,
      avatar: "",
      status: "ACT",
      refreshTokens: [],
      created: currentDate,
      oldPasswords: [user.password],
      roles: ["public"],
      ...user,
    };
    const data = await super.create(user);
    return {
      data,
      ...genTokens({
        userId: data.insertedId.toString() ,
      }),
    };
  }
  async signin(user: IUser) {
    const data = await super.findOne({ email: user.email });
    if (!data) {
      return null;
    }
    const valid = await checkPassword(data.password,user.password);
    if (!valid) {
      return null;
    }

    return {
      data,
      ...genTokens({
        userId: data._id as string,
      }),
    };
  }
}
