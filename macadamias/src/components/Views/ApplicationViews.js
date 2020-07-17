import { Route, Redirect } from "react-router-dom";
import React from "react";
import NewsFeed from "../News/NewsList"


const ApplicationViews = (props) => {
 

return (
    <>
    <Route
        exact
        path="/"
        render={props => {
          return <Home  />;
        }}
      />    
      <Route
        exact
        path="/news"
        render={props => {
            return <NewsFeed {...props}               
            />
        }}
        />
    </>
    
)
}

export default ApplicationViews