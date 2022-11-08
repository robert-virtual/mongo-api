import {
  Collection,
  Db,
  Filter,
  MongoClient,
  ObjectId,
  OptionalUnlessRequiredId,
  UpdateFilter,
} from "mongodb";
import { IBaseDao } from "../IBaseDao";

export abstract class AbstractMongoDao<T> implements IBaseDao<T> {
  connection: MongoClient;
  persistenceName: string;
  db: Db;
  collection: Collection<T>;
  constructor(persistenceName: string, connection: MongoClient) {
    this.persistenceName = persistenceName;
    this.connection = connection;
    this.db = connection.db();
    this.collection = this.db.collection<T>(persistenceName);
  }
  async create(data: T): Promise<T> {
    const { insertedId: _id } = await this.collection.insertOne(
      data as OptionalUnlessRequiredId<T>
    );
    return { ...data, _id };
  }
  find(filter?: Partial<T>): Promise<T[]> {
    const values = Object.values(filter).filter((e) => e);

    return this.collection.find<T>(values.length ? filter : {}).toArray();
  }
  findOne(filter?: Partial<T>): Promise<T> {
    const values = Object.values(filter).filter((e) => e);

    return this.collection.findOne<T>(values.length ? filter : {})
  }
  findById(id: string): Promise<T> {
    const _id = new ObjectId(id) as Filter<T>;
    return this.collection.findOne<T>({ _id });
  }
  async update(id: string, data: Partial<T>): Promise<boolean> {
    const _id = new ObjectId(id) as Filter<T>;
    const { modifiedCount } = await this.collection.updateOne({ _id }, {
      $set: data,
    } as UpdateFilter<T>);
    return modifiedCount > 0;
  }
  async delete(id: string): Promise<boolean> {
    const _id = new ObjectId(id) as Filter<T>;
    const { deletedCount } = await this.collection.deleteOne({ _id });
    return deletedCount > 0
  }
}
