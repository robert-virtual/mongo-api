import { Db, MongoClient } from "mongodb";

let mongoConnection:MongoClient

export function getMongoConnection() {
  if (mongoConnection) {
   return mongoConnection 
  }
  try {
    if (process.env.MONGO_URI == null) {
     throw new Error("no se encontro la cadena de conexion de la base de datos de mongo db") 
    }
    mongoConnection = new MongoClient(process.env.MONGO_URI,)
    return mongoConnection 
    
  } catch (error) {
   console.error(error);
  }
}
