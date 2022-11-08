import { Document, AggregateOptions } from "mongodb";
import { Connection, OkPacket, RowDataPacket } from "mysql2/promise";
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
  findOne(filter?: Partial<T>): Promise<T> {
    throw new Error("Method not implemented.");
  }
  aggregate(
    pipeline?: Document[],
    options?: AggregateOptions
  ): Promise<Document[]> {
    throw new Error("Method not implemented.");
  }
  async create(data: T): Promise<T> {
    const values = Object.values(data);
    const fields = Object.keys(data);
    const params = values.map(() => "?");
    const [info] = await this.connection.execute<OkPacket>(
      `insert into ${this.persistenceName}(${fields.join(
        ","
      )}) values (${params.join(",")})`,
      values
    );
    return { ...data, _id: info.insertId };
  }
  async find(filter?: Partial<T>): Promise<T[]> {
    const params = Object.keys(filter).filter((e) => filter[e]);
    const values = Object.values(filter).filter((e) => e);

    const where = values.length
      ? `where ${params.map((e) => `${e}=?`).join(",")}`
      : "";

    const [res] = await this.connection.query<RowDataPacket[]>(
      `select * from ${this.persistenceName} ${where}`,
      values
    );
    return res as T[];
  }
  async findById(id: string): Promise<T> {
    const [res] = await this.connection.query<RowDataPacket[]>(
      `select * from ${this.persistenceName} where _id = ? `,
      [+id]
    );
    return res as T;
  }
  async update(id: string, data: Partial<T>): Promise<boolean> {
    const values = Object.values(data);
    const fields = Object.keys(data);
    const params = fields.map((e) => `${e}=?`);
    const [info] = await this.connection.execute<OkPacket>(
      `update ${this.persistenceName} set ${params.join(",")} where _id = ? `,
      [...values, +id]
    );
    return info.affectedRows == 1;
  }
  async delete(id: string): Promise<boolean> {
    const [info] = await this.connection.execute<OkPacket>(
      `delete from ${this.persistenceName} where _id = ?`,
      [+id]
    );
    return info.affectedRows == 1;
  }
}
