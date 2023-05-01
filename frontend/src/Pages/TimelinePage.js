import EventDetails from "../Components/EventDetails";
import TimelineItem from "../Components/TimelineItem";
import HomeIcon from '@mui/icons-material/Home';
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import { UserContext } from "../Contexts/userContext";

import axios from 'axios'

function TimelinePage() {

  const {user,setUser } = useContext(UserContext)
  const [timelineItems, setTimelineItems] = useState([])
  const users = {}

  useEffect(() => {
    axios.get("http://localhost:5000/getEvents")
    .then( res => {
        console.log(res.data)
        setTimelineItems(res.data)
    })

    console.log("username in timeline is ", user)
  },[])

  // const timelineItems = [
  //   {eventId: 1, event:"party at david's house",date:"04/09/2023", time:"09:00 PM", organizer:"David A", location:"yeehaw"},
  //   {eventId: 2, event:"csce 310 final proj", date:"04/09/2023", time:"09:00 PM", organizer:"Cade", location:"yahoo"}
  // ]

  return (
    <div className="App" style = {{width:"100%"}}>
        <div style ={{display:"grid", marginBottom:20, gridTemplateColumns:"1fr 1fr 0.7fr 0.3fr"}} >
            <p style={{margin:0}}></p>
            <h1 style={{textAlign:"center", margin:0}}> Timeline </h1>
            <p/>
            <Link to ="/Main"> <HomeIcon /> </Link>
        </div>

        <div style={{display:"flex",width:"100%", justifyContent:"center"}}>
          <Link to="/CreateEvent">
            <Button variant="outlined"> Create event </Button>
          </Link>
        </div>

        {timelineItems.map( item => {
          return(
          <TimelineItem eventId = {item.EVENT_ID} event ={item.EVENT_NAME} organizer={item.USER_NAME} time={item.EVENT_DATE} location={item.EVENT_LOCATION} date={item.EVENT_DATE}/>
          )
        })}

    </div>
  );
}

export default TimelinePage;
