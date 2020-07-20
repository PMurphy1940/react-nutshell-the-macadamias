// EventList Component
// Author: David Bruce

import React, { useState,useEffect } from 'react';
import APIManager from '../../modules/APIManager'
import EventCard from "./EventCard"
import 'bootstrap/dist/css/bootstrap.min.css';
import Authentication from "../Auth/Authentication";
      
const EventList = (props) => {
    //Set initial state
    const [ events, setUserEvents ] = useState([]);
    const [ nextEvent, setNextEvent ] = useState({});
    const [isLoading, setIsLoading] = useState(true);


    // Generate unique keys for static elements
    const generateKey = (pre) => {
        const thisKey = `${ pre }_${ new Date().getTime() }`
        return thisKey;
    }

    const activeUserId = JSON.parse(sessionStorage.getItem("credentials")).activeUserId;

    const getEventList = () => {

        // setActiveUserId(JSON.parse(sessionStorage.getItem("credentials")).activeUserId)
        //Get Friends first to identify all events for active user and friends
        APIManager.getFriends(activeUserId)
            .then(myFriends => {
            let tempFriendsArray = myFriends.map(friend => { return friend.userId});
            tempFriendsArray.push(activeUserId)  //Add activeUser for event filter
            return tempFriendsArray
        }).then((friends) => {
            
            const thisDate = new Date();
            //Function to retrieve events from database
            let eventArray = []; //temp array for sorting and finding next occurring event
            let nextEventCalc = {}; //temp nextEvent obj for comparison and useState set
            
            //Get all events
            return APIManager.getAllforComponent("events")
                .then(eventsFromAPI => {
                    //Filter friends and active user events into temp array
                    eventArray = eventsFromAPI.filter(function(event) {
                          return friends.indexOf(event.userId);
                      });
                    //sort by date for list
                    eventArray.sort((a, b) => {
                        if (a.date > b.date) return -1;
                        if (a.date < b.date) return 1;
                        return 0;
                    });
                    //find next event
                    eventArray.forEach((event => {
                        let eventDate = new Date(event.date).getTime();
                        let today = thisDate.getTime();
                        if (eventDate > today) { nextEventCalc = event }
                        if ( eventDate < nextEventCalc.date ) { nextEventCalc = event }
                    }))

                    setNextEvent(nextEventCalc);
                    setUserEvents(eventArray);
                    setIsLoading(false)

               
              });
            })
        };
        
    
    useEffect(() => {

        getEventList()
        
                    
    },[isLoading]);

    const deleteEvent = id => {
        APIManager.deleteObject(id,"events")
            .then(() => { 
                setIsLoading(true)
                props.history.push("/events")
            })
    }

    return(
        
        <>
        <div className="div__container__component" key={generateKey("eventsContainer") } >
            <div className="div__component__toolbar" id="div__component__toolbar" key={generateKey("eventsToolbar") }>
               <h3 className="header__component__toolbar"> Event Center </h3><button className="btn" onClick={() => {props.history.push("/events/new")}}><i className="fa fa-plus"></i> Add Me An E-vent</button>
                
            </div>
            <div className="container__cards scrollDiv" key={generateKey("eventsContainerCards") } >
                {events.map(event => <EventCard key={event.id} event={event} place={event.place} setNext = {nextEvent.id === event.id} activeUserId={activeUserId} deleteEvent={deleteEvent} {...props} />)}
            </div>
        
        </div>
        </>

        
    )
}

export default Authentication(EventList)


