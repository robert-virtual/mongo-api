

export interface IBaseDao<T>{
  connection:unknown
  persistenceName:string
  create(data:T):Promise<T>
  find(filter?:Partial<T>):Promise<T[]>
  findById(id:string):Promise<T>
  update(id:string,data:Partial<T>):Promise<unknown>
  delete(id:string):Promise<unknown>
}
