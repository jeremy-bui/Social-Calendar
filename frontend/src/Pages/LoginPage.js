// the page where a user logs into the website
// utilizes the person database to validate correct login
// and password
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
import { AdminContext } from "../Contexts/adminContext";
    

function LoginPage() {

    const [login, setLogin] = useState("")
    const [password, setPassword ] = useState("")
    const [auth, setAuth] = useState(false)
    const [allUsers, setAllUsers] = useState([])

    // retrieves the user ID of the user who is currently logged in
    const { user,setUser } = useContext(UserContext)

    // checks if the user currently logged in is an admin or not
    const {admin, setAdmin} = useContext(AdminContext)

    useEffect(() =>{
        setAdmin(false)

        console.log("user is", user)
        // gets all users from the backend
        axios.get("http://localhost:5000/getAll")
            .then( res => {
                setAllUsers(res.data)
            })
    },[])

    // validates user's input with the users retrieved from DB
    function handleAuthenticate(){
        console.log(login, password)
        setAdmin(false)
        let authenticated = false

        for (let i = 0 ; i < allUsers.length ; i++){
            if (allUsers[i].USER_NAME === login && allUsers[i].PASSWORD === password){
                authenticated = true
                setUser(allUsers[i].USER_ID)
                if (allUsers[i].USER_TYPE === 1){
                    setAdmin(true)
                }
            }
        }

        if (authenticated){
            setAuth(true)
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
            <Button variant="outlined" onClick = {() => handleAuthenticate()}> Authenticate </Button>
            {!auth && <Button disabled variant="outlined" > Submit </Button>}
            {auth && <Link to="/Main"> <Button variant="outlined" > Submit </Button> </Link>}
        </div>

        <div style={{display:"flex", justifyContent:"center", marginTop:10}}>
            <Link to ="/CreateNewUser">
                <Button variant="outlined" > Create new user </Button>
            </Link>
        </div>

        <div style={{display:"flex", justifyContent:"center", marginTop:10}}>
            <Link to ="/ChangeUsername">
                <Button variant="outlined" > Change username </Button>
            </Link>
        </div>

        <div style={{display:"flex", justifyContent:"center", marginTop:10}}>
            { !admin && <Button disabled variant="outlined" > Edit Users </Button>}
            { admin && 
            <Link to ="/ViewUsers">
                <Button variant="outlined" > Edit Users </Button>
            </Link>
            }
        </div>

    </div>
  );
}

export default LoginPage;
