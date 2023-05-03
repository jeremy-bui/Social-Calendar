import { Button } from "@mui/material";

import axios from "axios";

const ReminderItem = (props) =>{
    const attendees = [{"name":"David A"}, {"name":"Cade"}, {"name":"JJ"}, {"name":"Jeremey"}]
    const comments = [{"username":"imap usay", "text":"real"}, {"username":"clancloss", "text":"Can't make it, will be in hawaii"}]

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
                                <h5 style ={{height:"40%"}}> {props.description} </h5>
                                <Button onClick = {() => deleteReminder(props.reminderId)}>Remove reminder </Button>
                            </div>
                        </div>
                    </div>
                    

                    
                    
                </div>
            </div>


        </div>
    );
}

export default ReminderItem;