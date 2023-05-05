import EventDetails from "../Components/EventDetails";
import TimelineItem from "../Components/TimelineItem";
import ReminderItem from "../Components/ReminderItem";
import HomeIcon from '@mui/icons-material/Home';
import { Button } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { useState, useContext } from "react";
import { UserContext } from "../Contexts/userContext";
import { TextField } from "@mui/material";

import axios from 'axios'

// a page where a new event can be created
// utilizes the event database
const CreateEvent = () => {

    // retrieves the user ID of the user who is currently logged in
    const {user,setUser } = useContext(UserContext)
    const location = useLocation()

    const [name, setName] = useState("")
    const [date, setDate] = useState("")
    const [time, setTime] = useState("")
    const [loc, setLoc] = useState("")
    const [desc, setDesc] = useState("")

    // sends a request to the backend to create a new event
    // given the name, description, date and location for the new event
    function createEvent(){
        axios.post("http://localhost:5000/createEvent",
        {
            name: "\"" + name + "\"",
            desc: "\"" + desc + "\"",
            date: "\"" + date + " " + time +"\"",
            loc: "\"" + loc + "\"",
            user: user,
            likes: 0, 
            dislikes: 0,
            loves: 0,
            sad: 0
        })
    }

  return (
    <div className="App" style = {{width:"100%"}}>
        <div style ={{display:"grid", marginBottom:20, gridTemplateColumns:"1fr 1fr 0.7fr 0.3fr"}} >
            <p style={{margin:0}}></p>
            <h1 style={{textAlign:"center", margin:0}}> Create Event </h1>

            <p/>
            <Link to = "/Main">
                <HomeIcon /> 
            </Link>
        </div>

        <div style={{marginLeft:400}}>
            <h3>Enter event name</h3>
            <TextField variant="outlined" onChange = { (e) => setName(e.target.value)}></TextField>

            <h3>Enter event description</h3>
            <TextField variant="outlined" onChange = { (e) => setDesc(e.target.value)}></TextField>

            <h3 >Enter event location</h3>
            <TextField variant="outlined" onChange = { (e) => setLoc(e.target.value)}></TextField>

            <h3 >Enter event date</h3>
            <TextField variant="outlined" onChange = { (e) => setDate(e.target.value)}></TextField>

            <h3 >Enter event time</h3>
            <TextField variant="outlined" onChange = { (e) => setTime(e.target.value)}></TextField>

            <Button variant="outlined" onClick={() => createEvent()}> Submit </Button>
        </div>
        
        
    </div>
  );
}

export default CreateEvent;