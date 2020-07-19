import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css"
import Header from "./components/header/Header"
import Footer from "./components/footer/Footer"
import NavBar from './components/navbar/NavBar';
import ApplicationViews from './components/Views/ApplicationViews';


function App() {
  const [loggedIn, setLogin] = useState(false)
  return (
    <>
      <div className="App Site">
            <div className="App-header">
              <Header />
            </div>
            <div className="div__main">
                  <NavBar />

              <div className="div__appviews scrollDiv">
                <ApplicationViews  />
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


