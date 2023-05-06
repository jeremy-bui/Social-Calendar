/*
This file creates the backend connection to the database. Using Axios and MySQL, this communicates between the frontend and backend.
David Asatryan - Coded the Person table functionality
Jaejin Cha - Coded the CalendarEvent table functionality
Jeremy Bui - Coded the Comment table functionality
Cade Hanath-Culp - Coded the Reminder table functionality
*/


const express = require('express');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

// Create express app
const app = express();
const port = 5000;
const cors = require("cors");

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

// Simple function for generating commas between values to be used in queries
function commaGenerator(arr){
  let s = ""

  for (let i = 0 ; i < arr.length ; i++){
    s += arr[i]  + ','
  }

  s = s.substring(0, s.length - 1)

  return s
}

// Return the USER_NAME of the Person given USER_ID
async function getPersonByID(userID){
  const connection = await mysql.createConnection(dbconfig)
  let [rows, fields] = await connection.execute('SELECT USER_NAME FROM person WHERE USER_ID =' + userID + ';')
  connection.close()

  return rows[0];
}

// Return all Persons from the Person table
async function getPeople(){
  const connection = await mysql.createConnection(dbconfig)
  let [rows, fields] = await connection.execute('SELECT * FROM person;')
  connection.close()

  return rows;
}

// Return the first Person from the Person table
async function getFirstPerson(){
  const connection = await mysql.createConnection(dbconfig)
  let [rows, fields] = await connection.execute('SELECT * FROM person WHERE USER_ID = 2;')
  connection.close()

  return rows;
}

// Return all CalendarEvents from the CalendarEvents table
async function getEvents(){
  const connection = await mysql.createConnection(dbconfig)
  let [rows, fields] = await connection.execute('SELECT * FROM calendarevent;')
  connection.close()

  return rows;
}

// Return the CalendarEvent given an EVENT_ID
async function getEventById(eventID){
  const connection = await mysql.createConnection(dbconfig)
  let [rows, fields] = await connection.execute('SELECT * FROM calendarevent WHERE EVENT_ID =' + eventID +';')
  connection.close()

  return rows[0];
}

// Create a CalendarEvent given EVENT_DESC, EVENT_DATE, EVENT_NAME, USER_ID, EVENT_LOCATION
async function createEvent(data){
  const connection = await mysql.createConnection(dbconfig)
  let values = commaGenerator([data.desc, data.date, data.name, data.user, data.loc])
  await connection.execute('INSERT INTO calendarevent (EVENT_DESC, EVENT_DATE, EVENT_NAME, USER_ID, EVENT_LOCATION) VALUES ('+ values + ');')
  connection.close()

}

// Return Attendees to a CalendarEvent given EVENT_ID
async function getAttendeesById(eventId){
  const connection = await mysql.createConnection(dbconfig)
  let [rows, fields] = await connection.execute('SELECT USER_ID FROM attending WHERE EVENT_ID =' + eventId +';')
  connection.close()

  return rows;
}

// Add a Person to a CalendarEvent in the Attendees table given their USER_ID and the EVENT_ID
async function attendEvent(userId, eventId){
  const connection = await mysql.createConnection(dbconfig)
  let [rows, fields] = await connection.execute('SELECT * FROM attending WHERE EVENT_ID =' + eventId +' AND USER_ID =' + userId +' ;')

  if (rows.length ===0){
    let values = commaGenerator([eventId, userId])
    await connection.execute('INSERT INTO attending (EVENT_ID, USER_ID) VALUES (' + values +');')
  }

  connection.close()
}

// Return all Comments in a CalendarEvent given EVENT_ID
async function getCommentsById(eventId){
  const connection = await mysql.createConnection(dbconfig)
  let [rows, fields] = await connection.execute('SELECT * FROM comment WHERE EVENT_ID =' + eventId +' ORDER BY COMM_DATE DESC;')
  connection.close()

  return rows;
}

// Update a Comment's LIKES, DISKLIKES, LOVES, and SADS given the COMMENT
async function updateComment( comm ){
  const connection = await mysql.createConnection(dbconfig)
  
  await connection.execute('UPDATE comment SET COMM_LIKE = ' + comm.COMM_LIKE + ', COMM_DISLIKE ='+ comm.COMM_DISLIKE +', COMM_LOVE = '+ comm.COMM_LOVE +', COMM_SAD = '+ comm.COMM_SAD +' WHERE COMMENT_ID = ' + comm.COMMENT_ID +';')
  connection.close()
}

// Add a Comment to a CalendarEvent given the COMMENT
async function addComment( comm ){
  const connection = await mysql.createConnection(dbconfig)
  
  let values = commaGenerator([comm.USER_ID, '\'' + comm.COMM_DESC + '\'', "CURRENT_TIMESTAMP", comm.EVENT_ID, 0, 0, 0, 0]);

  await connection.execute('INSERT INTO comment (USER_ID, COMM_DESC, COMM_DATE, EVENT_ID, COMM_LIKE, COMM_DISLIKE, COMM_LOVE, COMM_SAD) VALUES ('+ values +') ;')
  connection.close()
}

// Delete a Comment from the Comment table given the COMM_ID
async function deleteComment( commId ){
  const connection = await mysql.createConnection(dbconfig)
  await connection.execute('DELETE FROM comment WHERE COMMENT_ID = ' + commId +';')
  connection.close()
}


// JJ's reminder functions
// Return the Reminders made by a Person given USER_ID
async function getReminders(userId){
  const connection = await mysql.createConnection(dbconfig)
  let [rows, fields] = await connection.execute('SELECT * FROM reminder WHERE USER_ID =' + userId +';')

  connection.close()
  return rows;
}

// Return the Reminders given a REM_ID
async function getReminderById(remID){
  const connection = await mysql.createConnection(dbconfig)
  let [rows, fields] = await connection.execute('SELECT * FROM reminder WHERE REM_ID =' + remID +';')
  connection.close()

  return rows[0];

}

// Create and add a Reminder given the information from the Person and their USER_ID & EVENT_ID
async function createReminder(data){
  //console.log("data is ", data)
  const connection = await mysql.createConnection(dbconfig)
  console.log("data is ", data)
  let values = commaGenerator([data.userID, data.eventID,'\'' + data.desc +'\'', '\'' + data.title + '\''])
  console.log(values)
  await connection.execute('INSERT INTO reminder (USER_ID, EVENT_ID, REM_DESC, REM_TITLE) VALUES ('+ values + ');')

  connection.close()

}

// Delete a Reminder given REM_ID
async function deleteReminder(remId){
  const connection = await mysql.createConnection(dbconfig)
  await connection.execute('DELETE FROM reminder WHERE REM_ID = ' + remId +';')
  connection.close()
}


// Jeremy's user functions
// Create and add a Person given their information
async function createPerson(data){
  
  const connection = await mysql.createConnection(dbconfig)

  let values = commaGenerator([ '\'' + data.username + '\'', '\'' + data.password + '\'', data.userType, '\'' + data.userFname + '\'', '\'' + data.userLname + '\'', "CURRENT_TIMESTAMP"])
  await connection.execute('INSERT INTO person (USER_NAME, PASSWORD, USER_TYPE, USER_FNAME, USER_LNAME, DATE_MADE) VALUES ('+ values + ');')
  connection.close()

}

// Update a Person's USER_NAME given their USER_ID
async function updatePerson(person){
  const connection = await mysql.createConnection(dbconfig)
  await connection.execute('UPDATE person SET USER_NAME = ' + '\'' + person.newUsername + '\'' + ' WHERE USER_ID = ' + person.userId + ';')
  connection.close()
}

// Delete a CalendarEvent given the EVENT_ID
// Subsequently delete all associated links to the CalendarEvent as well
async function deleteEvent(eventId){
  const connection = await mysql.createConnection(dbconfig)

  await connection.execute('DELETE FROM comment WHERE EVENT_ID = ' + eventId +';')
  await connection.execute('DELETE FROM attending WHERE EVENT_ID = ' + eventId +';')
  await connection.execute('DELETE FROM reminder WHERE EVENT_ID = ' + eventId +';')
  await connection.execute('DELETE FROM calendarevent WHERE EVENT_ID = ' + eventId +';')
  connection.close()
}

// Update a CalendarEvent given the CalendarEvent
async function updateEvent(event){
  console.log(event)
  const connection = await mysql.createConnection(dbconfig)
  await connection.execute('UPDATE calendarevent SET EVENT_NAME = ' + '\'' + event.EVENT_NAME + '\'' + ', EVENT_DESC = '+ '\'' + event.EVENT_DESC + '\'' + ', EVENT_DATE = '+ '\'' + event.EVENT_DATE + '\'' + ', EVENT_LOCATION = '+ '\'' + event.EVENT_LOCATION + '\'' + ' WHERE EVENT_ID = ' + event.EVENT_ID + ';')
  connection.close()
}

// Update a Reminder given the Reminder
async function updateReminder(reminder){
  console.log(reminder)
  const connection = await mysql.createConnection(dbconfig)
  await connection.execute('UPDATE reminder SET REM_TITLE = ' + '\'' + reminder.title + '\'' + ', REM_DESC = '+ '\'' + reminder.desc + '\'' + ' WHERE REM_ID = ' + reminder.reminderId + ';')
  connection.close()
}

// Delete a Person and all attachments to the Person given the USER_ID
async function deletePerson(personId){
  const connection = await mysql.createConnection(dbconfig)

  
  await connection.execute('DELETE FROM comment WHERE USER_ID = ' + personId + ';')
  await connection.execute('DELETE FROM attending WHERE USER_ID = ' + personId + ';')
  await connection.execute('DELETE FROM reminder WHERE USER_ID = ' + personId + ';')

  const [rows, fields] = await connection.execute('SELECT EVENT_ID FROM calendarevent WHERE USER_ID = ' + personId + ';')

  for (let i = 0; i < rows.length; i++) {
    await deleteEvent(rows[i].EVENT_ID)
  }

  await connection.execute('DELETE FROM person WHERE USER_ID = ' + personId +';')
  connection.close()
}


async function main(){

  // Axios call to getFirstPerson()
  app.get("/getOnePerson", (req,res) =>{

    (async() =>{
      //let people = await getPeople()
      let people = await getFirstPerson()
      res.send(people)
    })()

  })

  // Axios call to getPeople()
  app.get("/getAll", (req,res) =>{

    (async() =>{
      //let people = await getPeople()
      let people = await getPeople()
      res.send(people)
    })()

  })

  // Axios call to createEvent(Event)
  app.post("/createEvent",jsonParser, (req,res) =>{
    (async() =>{

      createEvent(req.body)

    })()

  })
  
  // Axios call to getEvents()
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

  // Axios call to getEventById(EVENT_ID)
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

  // Axios call to attendEvent(USER_ID, EVENT_ID)
  app.post("/attendEvent", jsonParser, (req,res) =>{
    (async() =>{
      console.log("attending event: ")
      console.log(req.body)
      attendEvent(req.body.userId, req.body.eventId)
    })()
  })

  // Axios call to getAttendeesById(EVENT_ID)
  app.post("/getAttendeesById", jsonParser, (req,res) =>{
    (async() =>{
      let attendees = await getAttendeesById(req.body.eventId)
      

      for (let i = 0 ; i < attendees.length ; i++){
        attendees[i] = await getPersonByID(attendees[i].USER_ID)
      }

      res.send(attendees)
    })()
  })

  // Axios call to getCommentsById(EVENT_ID)
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
  
  // Axios call to updateComment(Comment)
  app.post("/updateComment", jsonParser, (req,res) =>{
    (async() =>{
      await updateComment(req.body)
    })()
  })

  // Axios call to addComment(Comment)
  app.post("/addComment", jsonParser, (req,res) =>{
    (async() =>{
      await addComment(req.body)
      res.send("comment added on the backend!")
    })()
  })

  // Axios call to deleteComment(COMM_ID)
  app.post("/deleteComment", jsonParser, (req,res) =>{
    (async() =>{
      await deleteComment(req.body.commentId)
      res.send("comment deleted on the backend!")
    })()
  })

  // Axios call to getReminders(USER_ID)
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

  // Axios call to deleteReminder(REM_ID)
  app.post("/deleteReminder", jsonParser, (req, res) => {
    (async() =>{
      await deleteReminder(req.body.remID)
    })()

  })

  // Axios call to createReminder(Reminder)
  app.post("/createReminder",jsonParser, (req,res) =>{
    (async() =>{

      createReminder(req.body)

    })()

  })

  // Axios call to createPerson(Person)
  app.post("/createPerson", jsonParser, (req, res)=>
  {
    (async() =>{
      createPerson(req.body)
    })()
  })

  // Axios call to updatePerson(Person)
  app.post('/updatePerson', jsonParser, (req, res) =>
  {
      (async() =>{
        await updatePerson(req.body)
      })()
  })

  // Axios call to deleteEvent(EVENT_ID)
  app.post("/deleteEvent", jsonParser, (req, res) => {
    (async() =>{
      console.log("deleting event")
      console.log(req.body)
      await deleteEvent(req.body.eventId)
    })()

  })

  // Axios call to updateEvent(Event)
  app.post('/updateEvent', jsonParser, (req, res) =>
  {
    (async() =>{
      await updateEvent(req.body.event)
      res.send("event updated!")
    })()
  })

  // Axios call to updateReminder(Reminder)
  app.post('/updateReminder', jsonParser, (req, res) =>
  {
    (async() =>{
      //console.log("changing usernasme")
      await updateReminder(req.body)
      res.send("reminder updated!")
    })()
  })

  // Axios call to deletePerson(USER_ID)
  app.post("/deletePerson", jsonParser, (req, res) => {
    (async() =>{
      console.log("deleting person")
      console.log(req.body)
      await deletePerson(req.body.personId)
      res.send("delete complete")
    })()

  })

  app.listen(port,()=> console.log(`Listening to port ${port}`));

}


main()
