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

const EventDetails = () =>{
    const location = useLocation()
    // then retrieve id by using id = location.state.eventId

    const {user, setUser} = useContext(UserContext)

    const [currentComment, setCurrentComment] = useState("")
    const [attendees, setAttendees] = useState([])
    const [comments, setComments] = useState([])

    const [event, setEvent] = useState({})

    function addComment(){
        console.log("username is ", user)
        const newComment = {USER_ID: user, COMM_DESC: currentComment, COMM_LIKE:0, COMM_DISLIKE:0, COMM_LOVE:0, COMM_SAD:0, EVENT_ID: location.state.eventId}
        // setComments( [ newComment, ...comments] )
        // TODO: add comment to database here

        axios.post("http://localhost:5000/addComment", newComment)
            .then(() => {
                axios.post("http://localhost:5000/getCommentsById", {eventId: location.state.eventId})
                    .then(data =>{
                        console.log(data.data)
                        setComments(data.data)
                    })
            })
        alert("success! reopen the page to see the new comment")
    }

    function handleLike(index){
        console.log("liked ", index, "comment")
        const shallowComments = [...comments]
        shallowComments[index].COMM_LIKE += 1;
        setComments([...shallowComments]) 
        // TODO: send like to db
        updateComment(index)

    }
    function handleDislike(index){
        console.log("disliked ", index, "comment")
        const shallowComments = [...comments]
        shallowComments[index].COMM_DISLIKE += 1;
        setComments([...shallowComments]) 
        // TODO: send dislike to db
        updateComment(index)

    }
    function handleLove(index){
        console.log("loved ", index, "comment")
        const shallowComments = [...comments]
        shallowComments[index].COMM_LOVE += 1;
        setComments([...shallowComments]) 
        // TODO: send love to db
        updateComment(index)

    }
    function handleSad(index){
        console.log("sad ", index, "comment")
        const shallowComments = [...comments]
        shallowComments[index].COMM_SAD += 1;
        setComments([...shallowComments]) 
        // TODO: send sad to db
        console.log(event)
        updateComment(index)
    }

    function updateComment(index){
        console.log("a comment update has been sent")
        axios.post("http://localhost:5000/updateComment", comments[index])
    }

    useEffect(() =>{
        console.log(location.state.eventId)
        axios.post("http://localhost:5000/getEventById", {eventID: location.state.eventId})
            .then(data => {
                setEvent(data.data)
            })

        axios.post("http://localhost:5000/getAttendeesById", {eventId: location.state.eventId})
        .then(data =>{
            console.log(data.data)
            setAttendees(data.data)
        })

        axios.post("http://localhost:5000/getCommentsById", {eventId: location.state.eventId})
        .then(data =>{
            console.log(data.data)
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
                            <h4> {event.EVENT_DATE}</h4>

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
                                    {/* <ThumbUpOffAltIcon onClick = {() => {console.log("hi")}}/>
                                    <ThumbDownOffAltIcon onClick = {() => {console.log("hi")}}/>
                                    <FavoriteBorderIcon/>
                                    <SentimentVeryDissatisfiedIcon/> */}
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
                            </div>
                        )
                    } )}
                    
                </div>
            </div>


        </div>
    );
}

export default EventDetails;