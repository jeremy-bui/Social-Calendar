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

function commaGenerator(arr){
  let s = ""

  for (let i = 0 ; i < arr.length ; i++){
    s += arr[i]  + ','
  }

  s = s.substring(0, s.length - 1)

  return s
}

async function getPersonByID(userID){
  const connection = await mysql.createConnection(dbconfig)
  let [rows, fields] = await connection.execute('SELECT USER_NAME FROM person WHERE USER_ID =' + userID + ';')
  return rows[0];
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

async function getEvents(){
  const connection = await mysql.createConnection(dbconfig)
  let [rows, fields] = await connection.execute('SELECT * FROM calendarevent;')
  return rows;
}

async function getEventById(eventID){
  const connection = await mysql.createConnection(dbconfig)
  let [rows, fields] = await connection.execute('SELECT * FROM calendarevent WHERE EVENT_ID =' + eventID +';')
  return rows[0];
}

async function createEvent(data){
  //console.log("data is ", data)
  const connection = await mysql.createConnection(dbconfig)
  console.log("data is ", data)
  let values = commaGenerator([data.desc, data.date, data.name, data.user, data.loc, data.likes, data.dislikes, data.loves, data.sad])
  console.log(values)
  await connection.execute('INSERT INTO calendarevent (EVENT_DESC, EVENT_DATE, EVENT_NAME, USER_ID, EVENT_LOCATION, EVENT_LIKES, EVENT_DISLIKES, EVENT_LOVES, EVENT_SAD) VALUES ('+ values + ');')
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

  app.post("/createEvent",jsonParser, (req,res) =>{
    (async() =>{

      createEvent(req.body)

    })()

  })
  
  app.get("/getEvents", (req,res) =>{

    (async() =>{
      let events = await getEvents()

      for ( let i = 0 ; i < events.length ; i++){
        let username = await getPersonByID(events[i].USER_ID)
        console.log(username['USER_NAME'])
        events[i]['USER_NAME'] = username['USER_NAME']
      }
      console.log(events)
      res.send(events)
    })()

  })

  app.post("/getEventById", jsonParser, (req,res) =>{
    (async() =>{
      console.log(req.body)
      let event = await getEventById(req.body.eventID)

      let username = await getPersonByID(event.USER_ID)
      event['USER_NAME'] = username['USER_NAME']
      
      console.log(event)
      res.send(event)
    })()
  })

 


  app.listen(port,()=> console.log(`Listening to port ${port}`));

}


main()
