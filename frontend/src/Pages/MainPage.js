import EventDetails from "../Components/EventDetails";
import TimelineItem from "../Components/TimelineItem";
import LogoutIcon from '@mui/icons-material/Logout';
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import { UserContext } from "../Contexts/userContext";


import axios from 'axios'

function MainPage() {
    const {user,setUser } = useContext(UserContext)

    useEffect(() =>{
        console.log("user is", user)

        axios.get("http://localhost:5000/getAll")
            .then( res => {
                console.log(res.data)
            })
    },[])

  return (
    <div className="App" style = {{width:"100%"}}>

        <div style ={{display:"grid", marginBottom:20, gridTemplateColumns:"1fr 1fr 1fr"}} >
            <p style={{margin:0}}></p>
            <h1 style={{textAlign:"center", margin:0}}> Home </h1>
            <Link to="/">
            <Button> Log out  <LogoutIcon/> </Button>
            </Link>
        </div>

        <div style ={{display:"grid", marginBottom:20, gridTemplateColumns:"1fr 1fr 1fr 1fr 1fr", height:100, marginTop:150}} >
            <p></p>
            <Link to = "/Timeline">
                <div style = {{backgroundColor:"green", height:100, borderRadius:15}}>
                    <h2 style={{textAlign:"center", color:"white"}}> Timeline </h2>
                </div>
            </Link>
            <p></p>

            <Link to = "/Reminders">
                <div style = {{backgroundColor:"green", height:100, borderRadius:15}} onClick = { () => console.log("yeah")}>
                    <h2 style={{textAlign:"center", color:"white"}}> Reminders </h2>
                </div>
            </Link>
            <p></p>
            

        </div>
    </div>
  );
}

export default MainPage;