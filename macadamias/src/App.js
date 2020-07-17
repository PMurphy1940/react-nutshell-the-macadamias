import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from "./components/header/Header"
import Footer from "./components/footer/Footer"
import Login from "./components/Login/Login";
import NavBar from "./components/navbar/NavBar"
import ApplicationViews from "./components/ApplicationViews"

import "./App.css"
import { Card, CardBody, CardTitle, CardText } from "reactstrap";


function App() {
  const [loggedIn, setLogin] = useState(false)
  return (
    <div className="App">
        <div className="App-header">
          <Header />
        </div>
        <div className="div__main">
            <div className="div__navbar">
              {/* <Login /> */}
              {loggedIn ? <NavBar/> :
     <Login setLogin={setLogin}/>}
              <NavBar />
              <h3>Messages</h3>
              <Card>
                <CardTitle>Message from DB</CardTitle>
              <CardBody>
                <CardText>blah blah covid-19 blah</CardText>
                </CardBody>
                </Card>
            </div>
            <div className="div__appviews">
               <ApplicationViews />
               <p>Items</p>
            </div>
        </div>
        <footer><div className="div__footer">
            <Footer />
          </div></footer>
    </div>
  );
}

export default App;
