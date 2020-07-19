import {Route, Redirect} from 'react-router-dom';
import React from 'react';
import Login from "../Login/Login";
import NavBar from "../navbar/NavBar";
import EventList from '../../components/events/EventList';
import NewsFeed from "../News/NewsList"


const ApplicationViews = () =>{
    return (
        <>
        <Route exact path="/login" component={Login}/>
        <Route exact path="/navbar" component={NavBar}/>
        <Route exact path="/events" render={(props) => {
          return <EventList {...props} />;}} />
        {/* <Route exact path="/" component={Login}/> */}
        <Route
        exact
        path="/articles"
        render={props => {
            return <NewsFeed {...props}               
            />
        }}
        />
        </>
    )
}
export default ApplicationViews;
