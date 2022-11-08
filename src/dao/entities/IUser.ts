import { IProductos } from "./IProducts"


type TStatus = 'ACT'|"INA"|"BLQ"
export interface IUser{
  name:string,
  email:string,
  password:string,
  refreshTokens:string[]
  products:IProductos[]
  status:TStatus,
  oldPasswords:string[]
  created:Date
  updated:Date
  lastLogin:Date
  avatar:string
  failedLoginAttempts:number
  roles:string[]
  _id?:string | number
}
