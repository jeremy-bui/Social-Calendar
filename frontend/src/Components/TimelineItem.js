import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useEffect, useContext } from "react";
import { UserContext } from "../Contexts/userContext";

import axios from 'axios'

const TimelineItem = (props) =>{

    const {user,setUser } = useContext(UserContext)

    useEffect(() =>{
        console.log(props)
    },[])

    function attendEvent(){
        console.log("event attended")
        axios.post("http://localhost:5000/attendEvent", {userId: user, eventId: props.eventId})
    }

    

    return (
        <div>
            
            <div style={{width:"100%", display:"flex", justifyContent:"center"}}>

                <div style = {{maxHeight:"400px", width:"50%", border:"solid", borderWidth:2, margin:0}} >
                    

                    <div style ={{display:"grid", gridTemplateColumns:"1fr 1fr 1fr"}} >
                        <h4>Date: {props.date}</h4>
                        <h4> {props.time}</h4>
                        <Button  variant="outlined" onClick = { () => {attendEvent() }}> Click to Attend! </Button>

                        <h4> Organized By: {props.organizer}</h4>
                        <h2>Event: {props.event}</h2>
                        
                        <Link to = "/EventDetails" state={{eventId: props.eventId}}>
                            <Button variant = "outlined"> More details {props.eventId} </Button>
                        </Link>


                        <h4>Location: {props.location}</h4>
                        <p></p>
                        <Link to="/CreateReminder" state={{eventId: props.eventId, event: props.event, date: props.date, time: props.time, organizer: props.organizer}}>
                            <Button variant = "outlined" > Add to Reminders</Button>
                        </Link>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default TimelineItem;