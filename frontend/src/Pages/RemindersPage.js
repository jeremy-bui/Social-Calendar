import EventDetails from "../Components/EventDetails";
import TimelineItem from "../Components/TimelineItem";
import ReminderItem from "../Components/ReminderItem";
import HomeIcon from '@mui/icons-material/Home';
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import { UserContext } from "../Contexts/userContext";

function RemindersPage() {
    const {user,setUser } = useContext(UserContext)

    const reminders=[
        {name:"bring diet soda", event:"davids birthday",date: "04/09/2023", time:"09:00 PM", organizer:"David A", description:"david asked me to bring soda for his birthday party, he liked dr pepper"},
        {name:"make frontend for website", event:"csce 310 hw",date: "04/09/2023", time:"09:00 PM", organizer:"JJ and Jeremy", description:"finish the frontend for our project"}
    ]

  return (
    <div className="App" style = {{width:"100%"}}>
        <div style ={{display:"grid", marginBottom:20, gridTemplateColumns:"1fr 1fr 0.7fr 0.3fr"}} >
            <p style={{margin:0}}></p>
            <h1 style={{textAlign:"center", margin:0}}> Reminders </h1>

            <p/>
            <Link to = "/">
                <HomeIcon /> 
            </Link>
        </div>
        
        {reminders.map( reminder => {
            return(
                <ReminderItem name={reminder.name} event = {reminder.event} date={reminder.date} time={reminder.time} organizer={reminder.organizer}/>
            )
        })}
        
    </div>
  );
}

export default RemindersPage;