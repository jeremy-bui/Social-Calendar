import { Button, TextField } from "@mui/material";
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import HomeIcon from '@mui/icons-material/Home';


import { useLocation, Link } from "react-router-dom";

import { useState, useContext } from "react";
import { UserContext } from "../Contexts/userContext";

const EventDetails = () =>{
    const location = useLocation()
    // then retrieve id by using id = location.state.eventId

    const {user, setUser} = useContext(UserContext)

    const [currentComment, setCurrentComment] = useState("")
    const attendees = [{name:"David A"}, {name:"Cade"}, {name:"JJ"}, {name:"Jeremey"}]
    const [comments, setComments] = useState([{username:"imap usay", text:"real", like:1, dislike: 2, love: 3, sad:4}, {username:"clancloss", text:"Can't make it, will be in hawaii", like:5, dislike: 4, love: 3, sad:4}])


    function addComment(){
        console.log("username is ", user)
        const newComment = {username: user, text: currentComment, like:0, dislike:0, love:0, sad:0}
        setComments( [ newComment, ...comments] )
        // TODO: add comment to database here
    }

    function handleLike(index){
        console.log("liked ", index, "comment")
        const shallowComments = [...comments]
        shallowComments[index].like += 1;
        setComments([...shallowComments]) 
        // TODO: send like to db
    }
    function handleDislike(index){
        console.log("liked ", index, "comment")
        const shallowComments = [...comments]
        shallowComments[index].dislike += 1;
        setComments([...shallowComments]) 
        // TODO: send dislike to db

    }
    function handleLove(index){
        console.log("liked ", index, "comment")
        const shallowComments = [...comments]
        shallowComments[index].love += 1;
        setComments([...shallowComments]) 
        // TODO: send love to db

    }
    function handleSad(index){
        console.log("liked ", index, "comment")
        const shallowComments = [...comments]
        shallowComments[index].sad += 1;
        setComments([...shallowComments]) 
        // TODO: send sad to db

    }

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
                            <h4>Date: 04/09/2023</h4>
                            <h4> 09:00 PM</h4>

                            <h4> Organized By: David A</h4>
                            <h4>Location: Armenia</h4>
                        </div>
                    </div>
                    <h2>Attendees</h2>
                    <p>start list of attendees here</p>
                    { attendees.map( attendee => { 
                        return (
                            <p >
                                {attendee.name}
                            </p>
                        )
                    })}

                    <h2>Comments</h2>
                    <TextField variant = "outlined" onChange = { (e) => setCurrentComment(e.target.value)}></TextField>
                    <Button variant = "outlined" onClick={ () => addComment()}> Submit Comment</Button>

                    { comments.map( (comment, index) => {
                        return (
                            <div style={{border:"solid", marginBottom:5}}>
                                <h4 style ={{margin:0}}>{comment.username}</h4>
                                <p style ={{margin:0, marginBottom:10}}>{comment.text}</p>

                                <div style = {{display:"flex"}}>
                                    {/* <ThumbUpOffAltIcon onClick = {() => {console.log("hi")}}/>
                                    <ThumbDownOffAltIcon onClick = {() => {console.log("hi")}}/>
                                    <FavoriteBorderIcon/>
                                    <SentimentVeryDissatisfiedIcon/> */}
                                    <div>
                                        
                                        <ThumbUpOffAltIcon onClick={() => handleLike(index)}/>
                                        <p style={{margin:0, textAlign:"center"}}>{comment.like}</p>
                                    </div>

                                    <div>
                                        <ThumbDownOffAltIcon onClick={() => handleDislike(index)}/>
                                        <p style={{margin:0, textAlign:"center"}}>{comment.dislike}</p>
                                    </div>

                                    <div>
                                        <FavoriteBorderIcon onClick={() => handleLove(index)}/>
                                        <p style={{margin:0, textAlign:"center"}}>{comment.love}</p>
                                    </div>

                                    <div>
                                        <SentimentVeryDissatisfiedIcon onClick={() => handleSad(index)}/>
                                        <p style={{margin:0, textAlign:"center"}}>{comment.sad}</p>                                        
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