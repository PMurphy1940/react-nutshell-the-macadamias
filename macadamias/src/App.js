import React from 'react';
import Login from "./components/Login/Login";
import NavBar from './components/navbar/NavBar';
import { useState } from "react";
import ApplicationViews from './components/Views/ApplicationViews';


function App() {
  const [loggedIn, setLogin] = useState(true)
  return (
    <>
    <NavBar />
    <ApplicationViews/>
    
    </>
  );





}

export default App;
