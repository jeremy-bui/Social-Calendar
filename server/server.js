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
  connection.close()

  return rows[0];
}

async function getPeople(){
  const connection = await mysql.createConnection(dbconfig)
  let [rows, fields] = await connection.execute('SELECT * FROM person;')
  connection.close()

  return rows;
}

async function getFirstPerson(){
  const connection = await mysql.createConnection(dbconfig)
  let [rows, fields] = await connection.execute('SELECT * FROM person WHERE USER_ID = 2;')
  connection.close()

  return rows;
}

async function getEvents(){
  const connection = await mysql.createConnection(dbconfig)
  let [rows, fields] = await connection.execute('SELECT * FROM calendarevent;')
  connection.close()

  return rows;
}

async function getEventById(eventID){
  const connection = await mysql.createConnection(dbconfig)
  let [rows, fields] = await connection.execute('SELECT * FROM calendarevent WHERE EVENT_ID =' + eventID +';')
  connection.close()

  return rows[0];
}

async function createEvent(data){
  //console.log("data is ", data)
  const connection = await mysql.createConnection(dbconfig)
  let values = commaGenerator([data.desc, data.date, data.name, data.user, data.loc])
  await connection.execute('INSERT INTO calendarevent (EVENT_DESC, EVENT_DATE, EVENT_NAME, USER_ID, EVENT_LOCATION) VALUES ('+ values + ');')
  connection.close()

}

async function getAttendeesById(eventId){
  const connection = await mysql.createConnection(dbconfig)
  let [rows, fields] = await connection.execute('SELECT USER_ID FROM attending WHERE EVENT_ID =' + eventId +';')
  connection.close()

  return rows;
}

async function attendEvent(userId, eventId){
  const connection = await mysql.createConnection(dbconfig)
  let [rows, fields] = await connection.execute('SELECT * FROM attending WHERE EVENT_ID =' + eventId +' AND USER_ID =' + userId +' ;')

  if (rows.length ===0){
    let values = commaGenerator([eventId, userId])
    await connection.execute('INSERT INTO attending (EVENT_ID, USER_ID) VALUES (' + values +');')
  }

  connection.close()
}

async function getCommentsById(eventId){
  const connection = await mysql.createConnection(dbconfig)
  let [rows, fields] = await connection.execute('SELECT * FROM comment WHERE EVENT_ID =' + eventId +' ORDER BY COMM_DATE DESC;')
  connection.close()

  return rows;
}

async function updateComment( comm ){
  const connection = await mysql.createConnection(dbconfig)
  
  await connection.execute('UPDATE comment SET COMM_LIKE = ' + comm.COMM_LIKE + ', COMM_DISLIKE ='+ comm.COMM_DISLIKE +', COMM_LOVE = '+ comm.COMM_LOVE +', COMM_SAD = '+ comm.COMM_SAD +' WHERE COMMENT_ID = ' + comm.COMMENT_ID +';')
  connection.close()
}

async function addComment( comm ){
  const connection = await mysql.createConnection(dbconfig)
  
  let values = commaGenerator([comm.USER_ID, '\'' + comm.COMM_DESC + '\'', "CURRENT_TIMESTAMP", comm.EVENT_ID, 0, 0, 0, 0]);

  await connection.execute('INSERT INTO comment (USER_ID, COMM_DESC, COMM_DATE, EVENT_ID, COMM_LIKE, COMM_DISLIKE, COMM_LOVE, COMM_SAD) VALUES ('+ values +') ;')
  connection.close()
}


// JJ's reminder functions

async function getReminders(userId){
  const connection = await mysql.createConnection(dbconfig)
  let [rows, fields] = await connection.execute('SELECT * FROM reminder WHERE USER_ID =' + userId +';')
  return rows;
}

async function getReminderById(remID){
  const connection = await mysql.createConnection(dbconfig)
  let [rows, fields] = await connection.execute('SELECT * FROM reminder WHERE REM_ID =' + remID +';')
  return rows[0];
}

async function createReminder(data){
  //console.log("data is ", data)
  const connection = await mysql.createConnection(dbconfig)
  console.log("data is ", data)
  let values = commaGenerator([data.userID, data.eventID,'\'' + data.desc +'\'', '\'' + data.title + '\''])
  console.log(values)
  await connection.execute('INSERT INTO reminder (USER_ID, EVENT_ID, REM_DESC, REM_TITLE) VALUES ('+ values + ');')

  connection.close()

}

async function deleteReminder(remId){
  const connection = await mysql.createConnection(dbconfig)
  await connection.execute('DELETE FROM reminder WHERE REM_ID = ' + remId +';')
  connection.close()
}


// Jeremy's user functions

async function createPerson(data){
  
  const connection = await mysql.createConnection(dbconfig)

  let values = commaGenerator([ '\'' + data.username + '\'', '\'' + data.password + '\'', data.userType, '\'' + data.userFname + '\'', '\'' + data.userLname + '\'', "CURRENT_TIMESTAMP"])
  await connection.execute('INSERT INTO person (USER_NAME, PASSWORD, USER_TYPE, USER_FNAME, USER_LNAME, DATE_MADE) VALUES ('+ values + ');')
  connection.close()

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
        events[i]['USER_NAME'] = username['USER_NAME']
      }
      res.send(events)
    })()

  })

  app.post("/getEventById", jsonParser, (req,res) =>{
    (async() =>{
      console.log(req.body)

      // req.body.
      let event = await getEventById(req.body.eventID)

      let username = await getPersonByID(event.USER_ID)
      event['USER_NAME'] = username['USER_NAME']
      
      console.log(event)
      res.send(event)
    })()
  })

  app.post("/attendEvent", jsonParser, (req,res) =>{
    (async() =>{
      console.log("attending event: ")
      console.log(req.body)
      attendEvent(req.body.userId, req.body.eventId)
    })()
  })

  app.post("/getAttendeesById", jsonParser, (req,res) =>{
    (async() =>{
      let attendees = await getAttendeesById(req.body.eventId)
      

      for (let i = 0 ; i < attendees.length ; i++){
        attendees[i] = await getPersonByID(attendees[i].USER_ID)
      }

      res.send(attendees)
    })()
  })

  app.post("/getCommentsById", jsonParser, (req,res) =>{
    (async() =>{
      let comments = await getCommentsById(req.body.eventId)
      
      for (let i = 0 ; i < comments.length ; i++){
        let username = await getPersonByID(comments[i].USER_ID)
        comments[i]['USER_NAME'] = username['USER_NAME']
      }

      console.log(comments)
      res.send(comments)
    })()
  })
 
  app.post("/updateComment", jsonParser, (req,res) =>{
    (async() =>{
      await updateComment(req.body)
    })()
  })

  app.post("/addComment", jsonParser, (req,res) =>{
    (async() =>{
      await addComment(req.body)
      res.send("comment added on the backend!")
    })()
  })

  app.post("/getReminders", jsonParser, (req,res) =>{

    (async() =>{
      console.log(req.body)
      let reminders = await getReminders(req.body.userId)

      for (let i = 0 ; i < reminders.length ; i++){
        

        let event = await getEventById(reminders[i].EVENT_ID)
        reminders[i]['EVENT_NAME'] = event['EVENT_NAME']
        reminders[i]['EVENT_DATE'] = event['EVENT_DATE']

        let username = await getPersonByID(event['USER_ID'])
        reminders[i]['USER_NAME'] = username['USER_NAME']
      }

      res.send(reminders)
    })()
  })

  app.post("/deleteReminder", jsonParser, (req, res) => {
    (async() =>{
      console.log("deleting reminder")
      console.log(req.body)
      await deleteReminder(req.body.remID)
    })()

  })

  app.post("/createReminder",jsonParser, (req,res) =>{
    (async() =>{

      createReminder(req.body)

    })()

  })

  app.post("/createPerson", jsonParser, (req, res)=>
  {
    (async() =>{
      createPerson(req.body)
    })()
  })


  app.listen(port,()=> console.log(`Listening to port ${port}`));

}


main()
