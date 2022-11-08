import {
    AggregateOptions,
  Collection,
  Db,
  DeleteResult,
  Document,
  Filter,
  InsertOneResult,
  MongoClient,
  ObjectId,
  OptionalUnlessRequiredId,
  UpdateFilter,
  UpdateResult,
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
  aggregate(pipeline?:Document[],options?:AggregateOptions) {
    return this.collection.aggregate(pipeline,options).toArray()
  }
  create(data: T): Promise<InsertOneResult> {
    return this.collection.insertOne(
      data as OptionalUnlessRequiredId<T>
    );
  }
  find(filter?: Filter<T>): Promise<T[]> {
    return this.collection.find<T>(filter).toArray();
  }
  findOne(filter?: Partial<T>): Promise<T> {
    const values = Object.values(filter).filter((e) => e);

    return this.collection.findOne<T>(values.length ? filter : {})
  }
  findById(id: string): Promise<T> {
    const _id = new ObjectId(id) as Filter<T>;
    return this.collection.findOne<T>({ _id });
  }
  update(id: string, data: Partial<T>): Promise<UpdateResult> {
    const _id = new ObjectId(id) as Filter<T>;
    return this.collection.updateOne({ _id }, {
      $set: data,
    } as UpdateFilter<T>);
  }
  delete(id: string): Promise<DeleteResult> {
    const _id = new ObjectId(id) as Filter<T>;
    return this.collection.deleteOne({ _id });
  }
}
