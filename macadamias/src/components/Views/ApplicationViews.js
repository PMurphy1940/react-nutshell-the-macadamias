import {Route, Redirect} from 'react-router-dom';
import React from 'react';
import Login from "../Login/Login";
import NavBar from "../navbar/NavBar";
import EventList from '../../components/events/EventList';
import EventForm from "../../components/events/EventForm";
import TaskList from "../../components/tasks/TaskList"
import TaskForm from "../../components/tasks/TaskForm"

const hasUser = true

const ApplicationViews = () =>{
    return (
        <>
        <Route exact path="/login" component={Login}/>
        <Route exact path="/navbar" component={NavBar}/>
        <Route exact path="/events" render={(props) => {
           if (hasUser) {
            return <EventList {...props} />  
          } else {
            return <Redirect to="/login" />
          }
        }} />
        <Route path="/events/new" render={(props) => {
        if (hasUser) {
          return <EventForm {...props} />
        } else {
          return <Redirect to="/login" />
        }
      }} />
      <Route exact path="/tasks" render={(props) => {
           if (hasUser) {
            return <TaskList {...props} />  
          } else {
            return <Redirect to="/login" />
          }
        }} />
         <Route path="/tasks/new" render={(props) => {
        if (hasUser) {
          return <TaskForm {...props} />
        } else {
          return <Redirect to="/login" />
        }
      }} />
        {/* <Route exact path="/" component={Login}/> */}
        </>
    )
}
export default ApplicationViews;