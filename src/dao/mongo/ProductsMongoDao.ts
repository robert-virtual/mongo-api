import { getMongoConnection } from "../../config/mongodb";
import { IProductos } from "../entities/IProducts";
import { AbstractMongoDao } from "./AbstractMongoDao";


export class ProductsMongoDao extends AbstractMongoDao<IProductos> {
 constructor() {
  super("products",getMongoConnection());
 } 
}
