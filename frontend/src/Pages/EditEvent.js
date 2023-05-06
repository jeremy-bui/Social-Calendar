// a page where an admin can update the details of an event
// utilizes the events database
// Coded by David Asatryan and Jaejin Cha


import EventDetails from "../Components/EventDetails";
import TimelineItem from "../Components/TimelineItem";
import ReminderItem from "../Components/ReminderItem";
import HomeIcon from '@mui/icons-material/Home';
import { Button } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import { UserContext } from "../Contexts/userContext";
import { TextField } from "@mui/material";

import axios from 'axios'


const EditEvent = () => {
    // retrieves the user ID of the user who is currently logged in
    const {user,setUser } = useContext(UserContext)
    const location = useLocation()

    const [name, setName] = useState("")
    const [date, setDate] = useState("")
    const [time, setTime] = useState("")
    const [loc, setLoc] = useState("")
    const [desc, setDesc] = useState("")

    const[event, setEvent] =useState({})

    // retrieves a specific event given an event ID
    useEffect(()=>{
        axios.post("http://localhost:5000/getEventById", {eventID: location.state.eventId})
            .then(data => {
                setEvent(data.data)
                console.log(data.data)
            })
    },[])

    // handles changes made to the event by the user
    function editEvent(){
        let newEvent = {
            EVENT_NAME: name,
            EVENT_DATE: date,
            EVENT_TIME: time, 
            EVENT_LOCATION: loc,
            USER_ID: event.USER_ID,
            EVENT_ID: event.EVENT_ID, 
            EVENT_DESC: desc
        }
        // sends changes to the backend
        axios.post("http://localhost:5000/updateEvent", {event: newEvent})
        .then(() =>{
            alert("success! return to your timeline to see changes")
        })
    }

  return (
    <div className="App" style = {{width:"100%"}}>
        <div style ={{display:"grid", marginBottom:20, gridTemplateColumns:"1fr 1fr 0.7fr 0.3fr"}} >
            <p style={{margin:0}}></p>
            <h1 style={{textAlign:"center", margin:0}}> Edit Event </h1>

            <p/>
            <Link to = "/Main">
                <HomeIcon /> 
            </Link>
        </div>

        <div style={{marginLeft:400}}>
            <h3>Enter event name</h3>
            <TextField variant="outlined" onChange = { (e) => setName(e.target.value)}></TextField>
            <p> Old name: {event.EVENT_NAME}</p>

            <h3>Enter event description</h3>
            <TextField variant="outlined" onChange = { (e) => setDesc(e.target.value)}></TextField>
            <p> Old description: {event.EVENT_DESC}</p>


            <h3 >Enter event location</h3>
            <TextField variant="outlined" onChange = { (e) => setLoc(e.target.value)}></TextField>
            <p> Old location: {event.EVENT_LOCATION}</p>


            <h3 >Enter event date</h3>
            <TextField variant="outlined" onChange = { (e) => setDate(e.target.value)}></TextField>

            <h3 >Enter event time</h3>
            <TextField variant="outlined" onChange = { (e) => setTime(e.target.value)}></TextField>
            <p> Old date & time: {event.EVENT_DATE} </p>


            <Button variant="outlined" onClick={() => { editEvent()} }> Submit </Button>
        </div>
        
        
    </div>
  );
}

export default EditEvent;