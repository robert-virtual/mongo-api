

export interface IBaseDao<T>{
  connection:unknown
  persistenceName:string
  create(data:T):Promise<T>
  find(filter?:Partial<T>):Promise<T[]>
  findById(id:unknown):Promise<T>
  update(id:unknown,data:Partial<T>):Promise<unknown>
  delete(id:unknown):Promise<unknown>
}
