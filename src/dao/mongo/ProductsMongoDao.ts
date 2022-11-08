import { ObjectId } from "mongodb";
import { getMongoConnection } from "../../config/mongodb";
import { IProductos } from "../entities/IProducts";
import { AbstractMongoDao } from "./AbstractMongoDao";

export class ProductsMongoDao extends AbstractMongoDao<IProductos> {
  constructor() {
    super("products", getMongoConnection());
  }
  create(data: IProductos): Promise<IProductos> {
    return super.create({
      ...data,
      user: { $ref: "users", $id: new ObjectId(data.user as string) },
    });
  }
}
