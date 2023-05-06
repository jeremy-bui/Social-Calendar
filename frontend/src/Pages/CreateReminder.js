// a page where a user can create a new reminder
// utilizes the reminder database
// Coded by David Asatryan and Cade Hanath-Culp

import EventDetails from "../Components/EventDetails";
import TimelineItem from "../Components/TimelineItem";
import ReminderItem from "../Components/ReminderItem";
import HomeIcon from '@mui/icons-material/Home';
import { Button } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { useState, useContext } from "react";
import { UserContext } from "../Contexts/userContext";
import { TextField } from "@mui/material";

import axios from "axios";


const CreateReminder = (props) => {

    // retrieves the user ID of the user who is currently logged in
    const {user,setUser } = useContext(UserContext)
    const location = useLocation()

    const [name, setName] = useState("")
    const [desc, setDesc] = useState("")
   
    // sends a request to create a new reminder in the backend
    // given a name for the reminder, the description for the reminder, the ID of the user creating it
    // and the ID of the event for which the reminder is made
    function addToReminders(){
        console.log("added to reminders")
        axios.post("http://localhost:5000/createReminder", {userID: user, eventID: location.state.eventId, title: name, desc: desc })
    }

  return (
    <div className="App" style = {{width:"100%"}}>
        <div style ={{display:"grid", marginBottom:20, gridTemplateColumns:"1fr 1fr 0.7fr 0.3fr"}} >
            <p style={{margin:0}}></p>
            <h1 style={{textAlign:"center", margin:0}}> Create Reminder </h1>

            <p/>
            <Link to = "/Main">
                <HomeIcon /> 
            </Link>
        </div>

        <div style={{marginLeft:400}}>
            <h3>Enter reminder name</h3>
            <TextField variant="outlined" onChange = { (e) => setName(e.target.value)}></TextField>

            <h3 >Enter reminder Description</h3>
            <TextField variant="outlined" onChange = { (e) => setDesc(e.target.value)}></TextField>

            <h3> Event: {location.state.event}</h3>
            <h3> Date: {location.state.date} </h3>
            <h3> Organizer: {location.state.organizer} </h3>

            <Button variant="outlined" onClick = { () => {addToReminders() }}> Submit </Button>
        </div>
        
        
    </div>
  );
}

export default CreateReminder;