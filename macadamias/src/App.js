import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css"
import Header from "./components/header/Header"
import Footer from "./components/footer/Footer"
import NavBar from './components/navbar/NavBar';
import ApplicationViews from './components/Views/ApplicationViews';
import { Card, CardBody, CardText, CardTitle} from "reactstrap"


function App() {
  const [loggedIn, setLogin] = useState(false)
  return (
    <>
      <div className="App">
            <div className="App-header">
              <Header />
            </div>
        <div className="div__main">

            <div className="div__navbar">
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
          <footer>
              <div className="div__footer">
                <Footer />
              </div>
          </footer>
      </div>    
    </>
  );
}

export default App;


