import {Route} from 'react-router-dom';
import React from 'react';
import Login from "../Login/Login";
import NavBar from "../navbar/NavBar";
import Dashboard from "../Dashboard/Dashboard"
import EventList from '../../components/events/EventList';
import TaskList from "../../components/tasks/TaskList"
import TaskForm from "../../components/tasks/TaskForm";
import Friend from "../../components/Friends/Friend";
import NewsFeed from "../News/NewsList"
import EventForm from "../events/EventForm"
import Messages from '../messages/Messages';


const ApplicationViews = () =>{
    return (
        <>
        <Route exact path="/login" component={Login}/>
        <Route exact path="/navbar" component={NavBar}/>
        <Route exact path="/" component={Dashboard}/>
        <Route exact path="/events" component={EventList} />
        <Route exact path="/tasks" component={TaskList}></Route>
        <Route exact path="/events/new" component={EventForm}/>
        <Route exact path="/tasks/new" component={TaskForm}/>
        <Route
            exact
            path="/articles"
            render={props => {
                return <NewsFeed {...props} />
                }} />
        <Route exact path="/messages" render={props => <Messages />} />
        <Route exact path="/friends" component={Friend}/>
        </>
    )
}
export default ApplicationViews;
