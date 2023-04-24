import EventDetails from "../Components/EventDetails";
import TimelineItem from "../Components/TimelineItem";
import ReminderItem from "../Components/ReminderItem";
import HomeIcon from '@mui/icons-material/Home';
import { Button } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { useState, useContext } from "react";
import { UserContext } from "../Contexts/userContext";
import { TextField } from "@mui/material";

const CreateEvent = () => {
    const {user,setUser } = useContext(UserContext)
    const location = useLocation()

    const [name, setName] = useState("")
    const [date, setDate] = useState("")
    const [time, setTime] = useState("")
    const [loc, setLoc] = useState("")

   

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

            <h3 >Enter date location</h3>
            <TextField variant="outlined" onChange = { (e) => setLoc(e.target.value)}></TextField>

            <h3 >Enter date date</h3>
            <TextField variant="outlined" onChange = { (e) => setDate(e.target.value)}></TextField>

            <h3 >Enter date time</h3>
            <TextField variant="outlined" onChange = { (e) => setTime(e.target.value)}></TextField>

            <Button variant="outlined" onClick={() => alert(name + loc + date + time + user)}> Submit </Button>
        </div>
        
        
    </div>
  );
}

export default CreateEvent;