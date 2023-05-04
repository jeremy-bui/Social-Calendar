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

    function deleteUser(userId){
       axios.post("http://localhost:5000/deletePerson", {personId: userId})
        .then( () =>{
            axios.get("http://localhost:5000/getAll")
            .then( res => {
                console.log(res.data)
                setAllUsers(res.data)
            })
        })
       console.log("deleting user ", userId)

    }

   
  return (
    <div className="App" style = {{width:"100%"}}>
        
        <h1 style={{textAlign:"center", margin:0}}> User list </h1>

            {allUsers.map( user =>{
                return(
                    <div style = {{ display:"grid", gridTemplateColumns:"5fr 1fr 1fr 5fr", marginTop:10}}>
                        <p></p>
                        <p>{user.USER_NAME}</p>
                        <Button variant = "outlined" style={{marginLeft:20}} onClick = { () => {deleteUser(user.USER_ID)} }> delete</Button>
                        <p></p>
                    </div>
                )
            })}


    </div>
  );
}

export default ViewUsers;