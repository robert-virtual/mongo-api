import {createConnection,Connection} from "mysql2/promise"
let mysqlConnection:Connection

export async function getMysqlConnection() {
  if (mysqlConnection) {
   return mysqlConnection 
  }
  try {
    if (process.env.MYSQL_URI == null) {
     throw new Error("no se encontro la cadena de conexion de la base de datos de mysql") 
    }
    mysqlConnection = await createConnection({
      uri:process.env.MYSQL_URI,
    })
    return mysqlConnection 
    
  } catch (error) {
   console.error(error);
  }
}
