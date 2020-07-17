import { Route, Redirect } from "react-router-dom";
import React from "react";

import EventList from './events/EventTest';


const ApplicationViews = (props) => {

  const hasUser = props.hasUser;
  const setUser = props.setUser;

  return (

    <React.Fragment>
      <Route exact path="/events" render={(props) => {
          return <EventList {...props} />;
      }}
      />

      
      {/*
        This is a new route to handle a URL with the following pattern:
        http://localhost:3000/employees/1

        It will not handle the following URL because the `(\d+)` matches only numbers after the slash
        http://localhost:3000/employees/meg
      
      */}


    </React.Fragment>
  );
};

export default ApplicationViews;