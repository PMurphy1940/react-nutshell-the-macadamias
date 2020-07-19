// EventList Component
// Author: David Bruce

import React, { useState,useEffect, Component, createRef, useRef } from 'react';
import APIManager from '../../modules/APIManager'
import EventCard from "./EventCard"
import 'bootstrap/dist/css/bootstrap.min.css';
        

const EventList = (props) => {
    //Set initial state
    const [ events, setUserEvents ] = useState([]);
    const [ nextEvent, setNextEvent ] = useState({});
    // const [ activeUserId, setActiveUserId ] = useState("");

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
                   
              });
            })
        };
        
    
    useEffect(() => {

        getEventList()
        
                    
    },[]);

    const deleteEvent = id => {
        APIManager.deleteObject(id,"events")
            .then(() => props.history.push("/events"))
    }

    return(
        <>
        <div className="div__container__component">
        <div className="container__cards scrollDiv">
            {events.map(event => <EventCard key={event.id} event={event} place={event.place} setNext = {nextEvent.id === event.id} activeUserId={activeUserId} deleteEvent={deleteEvent}
            {...props} />)}
            </div>
        
        </div>
        </>


    )
}

export default EventList


