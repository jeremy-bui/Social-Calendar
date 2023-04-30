const express = require('express');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

// Create express app
const app = express();
const port = 5000;
const cors = require("cors");
//const path = require("path");
const { json } = require('body-parser');
app.use(cors());

const util = require('util');
const mysql = require('mysql2/promise')
const https = require('https');

let dbconfig = {
  host: 'localhost',
  user: 'root',
  password: '',
  database: '310project'
}


async function getPeople(){
  const connection = await mysql.createConnection(dbconfig)
  let [rows, fields] = await connection.execute('SELECT * FROM person;')
  return rows;
}

async function getFirstPerson(){
  const connection = await mysql.createConnection(dbconfig)
  let [rows, fields] = await connection.execute('SELECT * FROM person WHERE USER_ID = 2;')
  return rows;
}


async function main(){


  app.get("/getOnePerson", (req,res) =>{

    (async() =>{
      //let people = await getPeople()
      let people = await getFirstPerson()
      res.send(people)
    })()

  })

  app.get("/getAll", (req,res) =>{

    (async() =>{
      //let people = await getPeople()
      let people = await getPeople()
      res.send(people)
    })()

  })


  app.listen(port,()=> console.log(`Listening to port ${port}`));

}


main()
