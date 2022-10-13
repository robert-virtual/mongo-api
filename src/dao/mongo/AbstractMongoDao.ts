import { Collection, Db, Filter, MongoClient, ObjectId, OptionalUnlessRequiredId } from "mongodb";
import { IBaseDao } from "../IBaseDao";


export abstract class AbstractMongoDao<T> implements IBaseDao<T>{
    connection: unknown;
    persistenceName: string;
    db:Db
    collection:Collection<T>
    constructor(persistenceName:string,connection:MongoClient) {
     this.persistenceName = persistenceName 
     this.connection = connection
     this.db = connection.db()
     this.collection = this.db.collection<T>(persistenceName)
    }
    create(data: T): Promise<T> {
      return this.collection.insertOne(data as OptionalUnlessRequiredId<T>) as Promise<T>

    }
    find(): Promise<T[]> {
      return this.collection.find<T>({}).toArray()
    }
    findById(id: string): Promise<T> {
      const _id = new ObjectId(id) as Filter<T>
      return this.collection.findOne<T>({_id})
    }
    update(id: string,data:Partial<T>): Promise<T> {
      const _id = new ObjectId(id) as Filter<T>
      return this.collection.updateOne({_id},data) as Promise<T>
    }
    delete(id: string): Promise<T> {
      const _id = new ObjectId(id) as Filter<T>
      return this.collection.deleteOne({_id}) as Promise<T>
    }
    

}
