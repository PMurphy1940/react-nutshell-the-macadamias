import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css"
import Header from "./components/header/Header"
import Footer from "./components/footer/Footer"
import NavBar from './components/navbar/NavBar';
import ApplicationViews from './components/Views/ApplicationViews';


function App() {

  // Generate unique keys for static elements
  const generateKey = (pre) => {
    const thisKey = `${ pre }_${ new Date().getTime() }`
    return thisKey;
}


  return (
    <>
      <div className="App Site">
            <div className="App-header" key={generateKey("AppHeader")}>
              <Header />
            </div>
            <div className="div__main" key={generateKey("divMain")}>
                  <NavBar />

              <div className="div__appviews scrollDiv" key={generateKey("divAppViews")}>
                <ApplicationViews  />
              </div>

        </div>
          <footer key={generateKey("AppFooter")}>
              <div className="div__footer" key={generateKey("AppDivFooter")}>
                <Footer />
              </div>
          </footer>
      </div>    
    </>
  );
}


export default App;


