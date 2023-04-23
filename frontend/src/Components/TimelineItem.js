import { Button } from "@mui/material";
import { Link } from "react-router-dom";

const TimelineItem = (props) =>{
    return (
        <div>
            
            <div style={{width:"100%", display:"flex", justifyContent:"center"}}>

                <div style = {{maxHeight:"400px", width:"50%", border:"solid", borderWidth:2, margin:0}} >
                    

                    <div style ={{display:"grid", gridTemplateColumns:"1fr 1fr 1fr"}} >
                        <h4>Date: {props.date}</h4>
                        <h4> {props.time}</h4>
                        <Button  variant="outlined"> Click to Attend! </Button>

                        <h4> Organized By: {props.organizer}</h4>
                        <h2>Event: {props.event}</h2>
                        
                        <Link to = "/EventDetails" state={{eventId: props.eventId}}>
                            <Button variant = "outlined"> More details</Button>
                        </Link>


                        <h4>Location: {props.location}</h4>
                        <p></p>
                        <Link to="/CreateReminder" state={{event: props.event, date: props.date, time: props.time, organizer: props.organizer}}>
                            <Button variant = "outlined"> Add to Reminders</Button>
                        </Link>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default TimelineItem;