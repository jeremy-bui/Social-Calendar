// a page that allows a user to change their username
// given their old username and password
// utilizes the person database
// Coded by David Asatryan 

import EventDetails from "../Components/EventDetails";
import TimelineItem from "../Components/TimelineItem";
import HomeIcon from '@mui/icons-material/Home';
import { Button } from "@mui/material";
import { TextField } from "@mui/material";
import { useState, useContext, useEffect } from "react";
import { UserContext } from "../Contexts/userContext";
import { Link } from "react-router-dom";


import axios from 'axios'


function ChangeUsername() {

    const [login, setLogin] = useState("")
    const [password, setPassword ] = useState("")
    const [newUsername, setNewUsername] = useState("")

    const [auth, setAuth] = useState(false)
    const [allUsers, setAllUsers] = useState([])

    // retrieves the user ID of the user who is currently logged in
    const { user,setUser } = useContext(UserContext)

    // retrieves all users to verify the enetered username and password
    useEffect(() =>{
        console.log("user is", user)

        axios.get("http://localhost:5000/getAll")
            .then( res => {
                console.log(res.data)
                setAllUsers(res.data)
            })
    },[])

    // checks if the old login entered by the user matches records
    function handleAuthenticate(){
        console.log(login, password)

        let authenticated = false

        for (let i = 0 ; i < allUsers.length ; i++){
            if (allUsers[i].USER_NAME === login && allUsers[i].PASSWORD === password){
                authenticated = true
                setUser(allUsers[i].USER_ID)
            }
        }

        if (authenticated){
            setAuth(true)
        }
    }

    // if a valid login is entered, sends a call to the database to update the username of the user
    // given the user ID and a new username
    function changeUser(){
        console.log("changing username")
        axios.post("http://localhost:5000/updatePerson", {userId:user, newUsername: newUsername})
        .then(() =>{
            console.log("axios done")

        })
    }

  return (
    <div className="App" style = {{width:"100%"}}>
        
        <h1 style={{textAlign:"center", margin:0}}> Login </h1>

        <div style={{display:"flex", justifyContent:"center", marginTop:50}}>
            <TextField label="Username" variant="outlined" onChange = {(e) => setLogin(e.target.value)}/>
        </div>

        <div style={{display:"flex", justifyContent:"center", marginTop:10}}>
            <TextField label="Password" variant="outlined" onChange = {(e) => setPassword(e.target.value)}/>
        </div>

        <div style={{display:"flex", justifyContent:"center", marginTop:10}}>
            <TextField label="New Username" variant="outlined" onChange = {(e) => setNewUsername(e.target.value)}/>
        </div>

        


        <div style={{display:"flex", justifyContent:"center", marginTop:10}}>
            <Button variant="outlined" onClick = {() => handleAuthenticate()}> Authenticate </Button>
            {!auth && <Button disabled variant="outlined" > Submit </Button>}
            {auth &&  <Button variant="outlined" onClick = {() => {changeUser()}}> Submit </Button> }
        </div>

    </div>
  );
}

export default ChangeUsername;
