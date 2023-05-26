const { Client } = require('pg')
const path = require("path");
const fs = require("fs");

const client = new Client({
  user: 'admin',
  host: 'localhost',
  database: 'test_db',
  password: 'mypassword',
  port: 5432,
});
let qSql = 'SELECT NOW()';

//  Define the query to run. Define the default query  for it.

const sql = () => {

  //  Check the last parameter and see if it is a sql or psql file.
const f = process.argv.pop();
const e = f.split('.').pop().toLowerCase(); 
if (['sql', 'psql'].includes(e)) return path.resolve(__dirname, f) 
else return ''; 
};

const sqlFile = sql();

//  if sqlFile exists retrieve the text and set it to the query to run
if  (sqlFile) {
console.log("Checking for file: " , sqlFile);
if ( fs.existsSync( sqlFile)) {
  const b = fs.readFileSync(sqlFile).toString();
  if (b) qSql = b;

} else console.log("File not found..");

};

//  This is where we connect to the Postgresql server in a docker container. 
//  Then we run the query against the sql databse.

client.connect().then(() => {
  
  console.log("Running Query : ",qSql )
  client.query(qSql, (err, res) => {
    console.log(res.rows)
    client.end()
  });
});
