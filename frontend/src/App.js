import EventDetails from "./Components/EventDetails";
import TimelineItem from "./Components/TimelineItem";
import EventPage from "./Pages/EventPage";
import RemindersPage from "./Pages/RemindersPage";
import TimelinePage from "./Pages/TimelinePage";
import MainPage from "./Pages/MainPage";
import LoginPage from "./Pages/LoginPage";

import { UserContext } from "./Contexts/userContext";
import { useContext, useState } from "react";

import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import CreateReminder from "./Pages/CreateReminder";
import CreateEvent from "./Pages/CreateEvent";

function App() {

  const [user,setUser] = useState({})

  return (
    <div className="App" style = {{width:"100%"}}>
        <BrowserRouter>

          <UserContext.Provider value={{user,setUser}}>
            <Routes>

              <Route path="/" element={<LoginPage/>} />
              <Route path="/Reminders" element={<RemindersPage />} />
              <Route path="/Timeline" element={<TimelinePage/>} />
              <Route path="/Main" element={<MainPage/>} />
              <Route path="/EventDetails" element={<EventDetails/>} />
              <Route path="/CreateReminder" element={<CreateReminder/>} />

              <Route path="/CreateEvent" element={<CreateEvent/>} />
            </Routes>
          </UserContext.Provider>
        </BrowserRouter>
    </div>
  );
}

export default App;
