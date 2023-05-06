// a wrapper components for the details of a particular event
// Coded by David Asatryan and Jaejin Cha


import EventDetails from "../Components/EventDetails";
import TimelineItem from "../Components/TimelineItem";
import HomeIcon from '@mui/icons-material/Home';
import { Button } from "@mui/material";
import { useState, useContext } from "react";
import { UserContext } from "../Contexts/userContext";


function EventPage() {
  
    // retrieves the user ID of the user who is currently logged in
    const {user,setUser } = useContext(UserContext)

  return (
    <div className="App" style = {{width:"100%"}}>

        <div style ={{display:"grid", marginBottom:20, gridTemplateColumns:"1fr 1fr 1fr"}} >
            <p style={{margin:0}}></p>
            <h1 style={{textAlign:"center", margin:0}}> Event info </h1>
            <Button> <HomeIcon /> </Button>
        </div>

        <EventDetails/>
    </div>
  );
}

export default EventPage;
