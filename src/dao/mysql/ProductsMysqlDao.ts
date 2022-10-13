import { getMysqlConnection } from "../../config/mysqldb";
import { IProductos } from "../entities/IProducts";
import { AbstractMysqlDao } from "./AbstractMysqlDao";


export class ProductsMysqlDao extends AbstractMysqlDao<IProductos> {
 constructor() {
  super("products",getMysqlConnection());
 } 
}
