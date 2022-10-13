import { Connection ,RowDataPacket} from "mysql2/promise";
import { IBaseDao } from "../IBaseDao";

export abstract class AbstractMysqlDao<T> implements IBaseDao<T> {
  connection: Connection;
  persistenceName: string;
  constructor(persistenceName: string, connection: Promise<Connection>) {
    this.persistenceName = persistenceName;
    connection.then((x) => {
      this.connection = x;
    });
  }
  create(data: T): Promise<T> {
    const values = Object.values(data);
    const fields = Object.keys(data);
    const params = values.map(() => "?");
    return this.connection.execute(
      `insert into ${this.persistenceName}(${fields.join(
        ","
      )}) values (${params.join(",")})`,
      values
    ) as Promise<T>;
  }
  async find(): Promise<T[]> {
    const res = await this.connection.query(`select * from ${this.persistenceName}`);
    return res[0] as T[]
  }
  findById(id: number): Promise<T> {
    return this.connection.query(
      `select * from ${this.persistenceName} where _id = ? `,
      [id]
    ) as Promise<T>;
  }
  async update(id: number, data: Partial<T>): Promise<boolean> {
    const values = Object.values(data);
    const fields = Object.keys(data);
    const params = fields.map((e) => `${e}=?`);
    try {
      await this.connection.execute(
        `update ${this.persistenceName} set ${params.join(",")} where _id = ? `,
        [...values, id]
      );
      return true;
    } catch(error) {
      console.error(error);
      return false;
    }
  }
  async delete(id: number): Promise<boolean> {
    try {
      await this.connection.execute(
        `delete from ${this.persistenceName} where _id = ?`,
        [id]
      );
      return false;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
}
