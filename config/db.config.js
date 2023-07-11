import mysql from 'mysql';
import { config } from 'dotenv';

config()

export const PORT = process.env.PORT;
export const URL_API = process.env.URL_API;
export const WHPP_KEY = process.env.WHPP_KEY;
export const TOKEN_ZOHO = process.env.TOKEN_ZOHO;

const HOST = process.env.HOST;
const USER = process.env.USER;
const PASSWORD = process.env.PASSWORD;
const PORT_BD = process.env.PORT_BD;
const DATA_BASE = process.env.DATA_BASE;

//local mysql db connection
const dbConn = mysql.createConnection({
  host     : HOST,
  user     : USER,
  password : PASSWORD,
  port     : PORT_BD,
  database : DATA_BASE
});
dbConn.connect(function(err) {
  if (err) throw err;
  console.log("¡Database Connected!");
});
//consultas sql

export default dbConn;
