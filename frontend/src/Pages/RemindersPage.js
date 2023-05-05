import EventDetails from "../Components/EventDetails";
import TimelineItem from "../Components/TimelineItem";
import ReminderItem from "../Components/ReminderItem";
import HomeIcon from '@mui/icons-material/Home';
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import { UserContext } from "../Contexts/userContext";

import axios from "axios";

// a page which displays all of the
// current user's reminders
// utilizes the database to retrieve reminders
function RemindersPage() {
    
    // retrieves the user ID of the user who is currently logged in
    const {user,setUser } = useContext(UserContext)

    const [reminders, setReminders] = useState([])

    // gets all of the user's reminder given a user ID
    useEffect(() =>{
        axios.post("http://localhost:5000/getReminders", {userId: user})
            .then( data =>{
                setReminders(data.data)
            })

    },[])

  return (
    <div className="App" style = {{width:"100%"}}>
        <div style ={{display:"grid", marginBottom:20, gridTemplateColumns:"1fr 1fr 0.7fr 0.3fr"}} >
            <p style={{margin:0}}></p>
            <h1 style={{textAlign:"center", margin:0}}> Reminders </h1>

            <p/>
            <Link to = "/Main">
                <HomeIcon /> 
            </Link>
        </div>
        
        {reminders.map( reminder => {
            return(
                <ReminderItem reminderId = {reminder.REM_ID} name={reminder.REM_TITLE} event = {reminder.EVENT_NAME} date={reminder.EVENT_DATE} organizer={reminder.USER_NAME} description={reminder.REM_DESC}/>
            )
        })}
        
    </div>
  );
}

export default RemindersPage;