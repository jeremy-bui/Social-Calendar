// displays the details of a reminder
// utilizes the reminder database
// Coded by David Asatryan and Cade Hanath-Culp

import { Button } from "@mui/material";
import { Link } from "react-router-dom";

import axios from "axios";


const ReminderItem = (props) =>{

    // Call Axios function to delete a Reminder
    function deleteReminder( reminderId){
        axios.post("http://localhost:5000/deleteReminder", {remID: reminderId})
        alert("please reload the page to see changes")
    }

    return (
        <div>
            
            <div style={{width:"100%", display:"flex", justifyContent:"center"}}>
                <div style={{width:"50%"}}>
                    <div style = {{maxHeight:"400px",  border:"solid", borderWidth:2, margin:0}} >    
                        <div style ={{display:"grid", gridTemplateColumns:"1fr 1fr "}} >
                            <div style = {{marginLeft:5}}>
                                <h4 > Reminder name: {props.name}</h4>
                                <h4> Event: {props.event}</h4>
                                <h4>Date: {props.date}</h4>
                                <h4>Organizer: {props.organizer}</h4>
                            </div>

                            <div>
                                <h5>Reminder Description </h5>
                                <h5 style ={{height:"20%"}}> {props.description} </h5>
                                <Link to = "/EditReminder" state={{reminderId: props.reminderId, name:props.name, description: props.description,event: props.event, date: props.date, organizer: props.organizer}}>
                                    <Button variant ="outlined"> Edit Reminder</Button>
                                </Link>
                                <Button variant = "outlined" onClick = {() => deleteReminder(props.reminderId)}>Remove reminder </Button>
                            </div>
                        </div>
                    </div>
                    

                    
                    
                </div>
            </div>


        </div>
    );
}

export default ReminderItem;