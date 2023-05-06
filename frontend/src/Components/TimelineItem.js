// Renders the webpage for all CalendarEvents
// Coded by David Asatryan


import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useEffect, useContext } from "react";
import { UserContext } from "../Contexts/userContext";

import axios from 'axios'
import { AdminContext } from "../Contexts/adminContext";


const TimelineItem = (props) =>{

    const {user,setUser } = useContext(UserContext)
    const {admin, setAdmin} = useContext(AdminContext)

    // Call Axios function to attend a CalendarEvent as a Person
    function attendEvent(){
        axios.post("http://localhost:5000/attendEvent", {userId: user, eventId: props.eventId})
    }

    // Call Axios function to delete a CalendarEvent
    function deleteEvent(eventId){
        axios.post("http://localhost:5000/deleteEvent", {eventId: eventId})
        alert("reopen page to see changes (DO NOT RELOAD)")

    }
  

    return (
        <div>
            
            <div style={{width:"100%", display:"flex", justifyContent:"center"}}>

                <div style = {{maxHeight:"400px", width:"50%", border:"solid", borderWidth:2, margin:0}} >
                    

                    <div style ={{display:"grid", gridTemplateColumns:"1fr 1fr 1fr"}} >
                        <h4>Date: {props.date}</h4>
                        <h4></h4>
                        <Button  variant="outlined" onClick = { () => {attendEvent() }}> Click to Attend! </Button>

                        <h4> Organized By: {props.organizer}</h4>
                        <h2>Event: {props.event}</h2>
                        
                        <Link to = "/EventDetails" state={{eventId: props.eventId}}>
                            <Button variant = "outlined"> More details  </Button>
                        </Link>



                        <h4>Location: {props.location}</h4>

                        {admin && 
                        <Button variant = "outlined" style={{marginRight:20}} onClick={() => {deleteEvent(props.eventId)}}> Delete event  </Button>
                        }

                        {!admin && <p></p>}

                        <Link to="/CreateReminder" state={{eventId: props.eventId, event: props.event, date: props.date, time: props.time, organizer: props.organizer}}>
                            <Button variant = "outlined" > Add to Reminders</Button>
                        </Link>

                        {admin && 
                            <Link to = "/EditEvent" state={{eventId: props.eventId}}>
                                <Button variant = "outlined" style={{marginRight:20}} > Edit event </Button>
                            </Link>
                        }

                    </div>
                </div>
            </div>
        </div>
    );
}

export default TimelineItem;