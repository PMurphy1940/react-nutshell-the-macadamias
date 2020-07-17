import React from "react";
import { Redirect } from "react-router-dom";

const Authentication = (Component) =>{
    const loggedIn = () =>{
        return sessionStorage.credentials ? true : false
    }
   return (props) =>{
       if(loggedIn()){
           return <Component {...props}/>
       }else{
           return <Redirect to="/login"/>
       }
   }
}
export default Authentication;