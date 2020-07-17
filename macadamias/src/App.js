import React from 'react';
import Login from "./components/Login/Login";
import NavBar from './components/navbar/NavBar';
import { useState } from "react";

function App() {
  const [loggedIn, setLogin] = useState(false)
  return (
    <div className="App">
   {loggedIn ? <NavBar/> :
     <Login setLogin={setLogin}/>}
    </div>
  );
}

export default App;
