// a page where a new user can be created
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


function CreateNewUser() {


    const [login, setLogin] = useState("")
    const [password, setPassword ] = useState("")
    const [fname, setFname] = useState("")
    const [lname, setLname] = useState("")
    const [userType, setUserType] = useState("")

    const [auth, setAuth] = useState(false)
    const [allUsers, setAllUsers] = useState([])

    // retrieves the user ID of the user who is currently logged in
    const { user,setUser } = useContext(UserContext)

    // retrieves all users to ensure a repeated username is not selected
    useEffect(() =>{
        console.log("user is", user)

        axios.get("http://localhost:5000/getAll")
            .then( res => {
                setAllUsers(res.data)
            })
    },[])

    // creates a new user
    // ensures that the login entered is not already in use
    function createNew(){

        let valid = true

        for (let i = 0 ; i < allUsers.length ; i++){
            if (allUsers[i].USER_NAME === login){
                valid = false
            }
        }

        if (!valid){
            alert("username taken! please enter a different username")
        }
        else {
            let shallowUser = 0
            if (userType === 1){
                shallowUser = 1
            }
            // creates a new user with the given login, password and user type
            axios.post("http://localhost:5000/createPerson", {username: login, password: password, userFname: fname, userLname: lname, userType: userType})
        }
       
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
            <TextField label="First Name" variant="outlined" onChange = {(e) => setFname(e.target.value)}/>
        </div>

        <div style={{display:"flex", justifyContent:"center", marginTop:10}}>
            <TextField label="Last Name" variant="outlined" onChange = {(e) => setLname(e.target.value)}/>
        </div>

        <div style={{display:"flex", justifyContent:"center", marginTop:10}}>
            <TextField label="User Type (set 1 for admin)" variant="outlined" onChange = {(e) => setUserType(e.target.value)}/>
        </div>


        <div style={{display:"flex", justifyContent:"center", marginTop:10}}>
        <Button variant="outlined" onClick = {() => createNew()}> Create new user </Button>
        </div>

    </div>
  );
}

export default CreateNewUser;
