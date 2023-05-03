import EventDetails from "../Components/EventDetails";
import TimelineItem from "../Components/TimelineItem";
import HomeIcon from '@mui/icons-material/Home';
import { Button } from "@mui/material";
import { TextField } from "@mui/material";
import { useState, useContext, useEffect } from "react";
import { UserContext } from "../Contexts/userContext";
import { Link } from "react-router-dom";


import axios from 'axios'
    
function ViewUsers() {

    

    const [allUsers, setAllUsers] = useState([])

    const { user,setUser } = useContext(UserContext)


    useEffect(() =>{
        axios.get("http://localhost:5000/getAll")
            .then( res => {
                console.log(res.data)
                setAllUsers(res.data)
            })
    },[])

   
  return (
    <div className="App" style = {{width:"100%"}}>
        
        <h1 style={{textAlign:"center", margin:0}}> User list </h1>

        {allUsers.map( user =>{
            return(
                <p>{user.USER_NAME}</p>
            )
        })}

    </div>
  );
}

export default ViewUsers;