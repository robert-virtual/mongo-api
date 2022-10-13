import {
  Collection,
  Db,
  Filter,
  MongoClient,
  ObjectId,
  OptionalUnlessRequiredId,
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
    console.log({values});
    
    return this.collection.find<T>(values.length ? filter : {}).toArray();
  }
  findById(id: string): Promise<T> {
    const _id = new ObjectId(id) as Filter<T>;
    return this.collection.findOne<T>({ _id });
  }
  update(id: string, data: Partial<T>): Promise<T> {
    const _id = new ObjectId(id) as Filter<T>;
    return this.collection.updateOne({ _id }, data) as Promise<T>;
  }
  delete(id: string): Promise<T> {
    const _id = new ObjectId(id) as Filter<T>;
    return this.collection.deleteOne({ _id }) as Promise<T>;
  }
}
