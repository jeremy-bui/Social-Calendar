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
    const {user,setUser } = useContext(UserContext)
    const location = useLocation()

    const [name, setName] = useState("")
    const [desc, setDesc] = useState("")
   
    // <Link to="/CreateReminder" state={{eventId: props.eventId, event: props.event, date: props.date, time: props.time, organizer: props.organizer}}>

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
            <h3> Time: {location.state.time} </h3>
            <h3> Organizer: {location.state.organizer} </h3>

            <Button variant="outlined" onClick = { () => {addToReminders() }}> Submit </Button>
        </div>
        
        
    </div>
  );
}

export default CreateReminder;