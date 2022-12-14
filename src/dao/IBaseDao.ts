import { AggregateOptions, Document } from "mongodb"


export interface IBaseDao<T>{
  connection:unknown
  persistenceName:string
  create(data:T):Promise<unknown>
  find(filter?:Partial<T>):Promise<T[]>
  findOne(filter?:Partial<T>):Promise<T>
  findById(id:string):Promise<T>
  update(id:string,data:Partial<T>):Promise<unknown>
  delete(id:string):Promise<unknown>
  aggregate(pipeline?:Document[],options?:AggregateOptions):Promise<Document[]>
}
