import { Button, TextField } from "@mui/material";
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import HomeIcon from '@mui/icons-material/Home';


import { useLocation, Link } from "react-router-dom";

import { useState, useContext, useEffect } from "react";
import { UserContext } from "../Contexts/userContext";

import axios from 'axios'
import { AdminContext } from "../Contexts/adminContext";

// a page that shows details of a specific event
// utilizes the attending, calendarevent and comment databases
const EventDetails = () =>{
    const location = useLocation()
    // then retrieve id by using id = location.state.eventId

    // State hooks for handling all attachments to a CalendarEvent
    const {user, setUser} = useContext(UserContext)
    const {admin, setAdmin} = useContext(AdminContext)
    const [currentComment, setCurrentComment] = useState("")
    const [attendees, setAttendees] = useState([])
    const [comments, setComments] = useState([])
    const [event, setEvent] = useState({})

    // Call Axios functions to add a Comment to a CalendarEvent
    function addComment(){
        const newComment = {USER_ID: user, COMM_DESC: currentComment, COMM_LIKE:0, COMM_DISLIKE:0, COMM_LOVE:0, COMM_SAD:0, EVENT_ID: location.state.eventId}

        axios.post("http://localhost:5000/addComment", newComment)
            .then(() => {
                axios.post("http://localhost:5000/getCommentsById", {eventId: location.state.eventId})
                    .then(data =>{
                        setComments(data.data)
                    })
            })
        alert("success! reopen the page to see the new comment")
    }

    // Update the LIKES when clicked
    function handleLike(index){
        const shallowComments = [...comments]
        shallowComments[index].COMM_LIKE += 1;
        setComments([...shallowComments]) 
        updateComment(index)

    }

    // Update the DISLIKES when clicked
    function handleDislike(index){
        const shallowComments = [...comments]
        shallowComments[index].COMM_DISLIKE += 1;
        setComments([...shallowComments]) 
        updateComment(index)

    }

    // Update the LOVES when clicked
    function handleLove(index){
        const shallowComments = [...comments]
        shallowComments[index].COMM_LOVE += 1;
        setComments([...shallowComments]) 
        updateComment(index)

    }

    // Update the SADS when clicked
    function handleSad(index){
        const shallowComments = [...comments]
        shallowComments[index].COMM_SAD += 1;
        setComments([...shallowComments]) 
        updateComment(index)
    }

    // Update the full comment when all components have been changed
    function updateComment(index){
        axios.post("http://localhost:5000/updateComment", comments[index])
    }

    // Call Axios functions to delete the Comment from the CalendarEvent
    function deleteComment(commentId){
        console.log(" a comment is sent to be deleted")
        axios.post("http://localhost:5000/deleteComment", {commentId:commentId})
        .then( () =>{
            axios.post("http://localhost:5000/getCommentsById", {eventId: location.state.eventId})
                .then(data =>{
                    setComments(data.data)
                })
        })

    }

    // Set the page's CalendarEvents and Comments as well as Attendees 
    useEffect(() =>{
        axios.post("http://localhost:5000/getEventById", {eventID: location.state.eventId})
            .then(data => {
                setEvent(data.data)
            })

        axios.post("http://localhost:5000/getAttendeesById", {eventId: location.state.eventId})
        .then(data =>{
            setAttendees(data.data)
        })

        axios.post("http://localhost:5000/getCommentsById", {eventId: location.state.eventId})
        .then(data =>{
            setComments(data.data)
        })

    },[])

    return (
        <div>

        <div style ={{display:"grid", marginBottom:20, gridTemplateColumns:"1fr 1fr 0.7fr 0.3fr"}} >
            <p style={{margin:0}}></p>
            <h1 style={{textAlign:"center", margin:0}}> Event Details </h1>

            <p/>
            <Link to = "/Main">
                <HomeIcon /> 
            </Link>
        </div>
            
            <div style={{width:"100%", display:"flex", justifyContent:"center"}}>
                <div style={{width:"50%"}}>
                    <div style = {{maxHeight:"400px",  border:"solid", borderWidth:2, margin:0}} >
                        

                        <div style ={{display:"grid", gridTemplateColumns:"1fr 1fr "}} >
                            <h4>Date: {event.EVENT_DATE}</h4>
                            <h4></h4>

                            <h4> Organized By: {event.USER_NAME}</h4>
                            <h4>Location: {event.EVENT_LOCATION}</h4>
                        </div>
                        <h4> Description: {event.EVENT_DESC}</h4>
                    </div>
                    <h2>Attendees</h2>
                    <p>start list of attendees here</p>
                    { attendees.map( attendee => { 
                        return (
                            <p >
                                {attendee['USER_NAME']}
                            </p>
                        )
                    })}

                    <h2>Comments</h2>
                    <TextField variant = "outlined" onChange = { (e) => setCurrentComment(e.target.value)}></TextField>
                    <Button variant = "outlined" onClick={ () => addComment()}> Submit Comment</Button>

                    { comments.map( (comment, index) => {
                        return (
                            <div style={{border:"solid", marginBottom:5}}>
                                <h4 style ={{margin:0}}>{comment['USER_NAME']} commented on {comment['COMM_DATE'].substring(0,10)} at {comment['COMM_DATE'].substring(11,20)}</h4>
                                <p style ={{margin:0, marginBottom:10}}>{comment['COMM_DESC']}</p>

                                <div style = {{display:"flex"}}>
                                    <div>
                                        
                                        <ThumbUpOffAltIcon onClick={() => handleLike(index)}/>
                                        <p style={{margin:0, textAlign:"center"}}>{comment['COMM_LIKE']}</p>
                                    </div>

                                    <div>
                                        <ThumbDownOffAltIcon onClick={() => handleDislike(index)}/>
                                        <p style={{margin:0, textAlign:"center"}}>{comment['COMM_DISLIKE']}</p>
                                    </div>

                                    <div>
                                        <FavoriteBorderIcon onClick={() => handleLove(index)}/>
                                        <p style={{margin:0, textAlign:"center"}}>{comment['COMM_LOVE']}</p>
                                    </div>

                                    <div>
                                        <SentimentVeryDissatisfiedIcon onClick={() => handleSad(index)}/>
                                        <p style={{margin:0, textAlign:"center"}}>{comment['COMM_SAD']}</p>                                        
                                    </div>

                                </div>

                                {admin && <Button variant="outlined" onClick = {() => {deleteComment(comment['COMMENT_ID'])}}> Delete Comment</Button>}
                            </div>
                        )
                    } )}
                    
                </div>
            </div>


        </div>
    );
}

export default EventDetails;