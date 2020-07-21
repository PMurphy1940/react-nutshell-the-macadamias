import React from "react";
import { Redirect } from "react-router-dom";

const Authentication = (Component) =>{
    const loggedIn = () =>{
        return window.sessionStorage.credentials ? true : false
    }
   return (props) =>{
       if(loggedIn()){
           return <Component {...props}/>
       }else{
           if(Component == "NavBar"){
           return <Component {...props}/>
        }
           return <Redirect to="/login"/>
       }
   }
}
export default Authentication;