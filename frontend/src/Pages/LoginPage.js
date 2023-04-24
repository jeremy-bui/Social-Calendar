import EventDetails from "../Components/EventDetails";
import TimelineItem from "../Components/TimelineItem";
import HomeIcon from '@mui/icons-material/Home';
import { Button } from "@mui/material";
import { TextField } from "@mui/material";
import { useState, useContext } from "react";
import { UserContext } from "../Contexts/userContext";
import { Link } from "react-router-dom";

function LoginPage() {

    const [login, setLogin] = useState("")
    const [password, setPassword ] = useState("")
    const [auth, setAuth] = useState(false)

    const { user,setUser } = useContext(UserContext)

    function handleAuthenticate(){
        console.log(login, password)
        setAuth(true)
        setUser(login)
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

    </div>
  );
}

export default LoginPage;
