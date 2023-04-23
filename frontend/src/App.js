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

function App() {

  const [user,setUser] = useState({})

  return (
    <div className="App" style = {{width:"100%"}}>
        <BrowserRouter>

          <UserContext.Provider value={{user,setUser}}>
            <Routes>

              <Route path="/" element={<MainPage/>} />
              <Route path="/Reminders" element={<RemindersPage />} />
              <Route path="/Timeline" element={<TimelinePage/>} />
              <Route path="/login" element={<LoginPage/>} />
              <Route path="/EventDetails" element={<EventDetails/>} />
              <Route path="/CreateReminder" element={<CreateReminder/>} />
            </Routes>
          </UserContext.Provider>
        </BrowserRouter>
    </div>
  );
}

export default App;
