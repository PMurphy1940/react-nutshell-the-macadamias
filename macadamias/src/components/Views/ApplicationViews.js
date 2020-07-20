import {Route, Redirect} from 'react-router-dom';
import React from 'react';
import Login from "../Login/Login";
import NavBar from "../navbar/NavBar";
import EventList from '../../components/events/EventList';
import TaskList from "../../components/tasks/TaskList";
 



const ApplicationViews = () =>{
    return (
        <>
        <Route exact path="/login" component={Login}/>
        <Route exact path="/navbar" component={NavBar}/>
        <Route exact path="/events" render={(props) => {
          return <EventList {...props} />;}} />
        <Route exact path="/tasks" component={TaskList}></Route>
        {/* <Route exact path="/articles" component={}></Route>
        <Route exact path="/news" component={}></Route>
        <Route exact path="/comments" component={}></Route> 
         <Route exact path="/" component={Login}/> */} 
        </>
    )
}
export default ApplicationViews;