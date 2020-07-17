import React from 'react';
import Login from "./components/Login/Login";
import Messages from './components/messages/Messages';
import NavBar from './components/navbar/NavBar';
import { useState } from "react";
import ApplicationViews from './components/Views/ApplicationViews';


function App() {
  const [loggedIn, setLogin] = useState(false)
  return (
    <>
    <NavBar />
    <ApplicationViews/>
    <Messages />
    </>
  );
}

export default App;
