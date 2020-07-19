// EventList Component
// Author: David Bruce

import React, { useState,useEffect } from 'react';
import APIManager from '../../modules/APIManager'
import EventCard from "./EventCard"

const EventList = (props) => {
    //Set initial state
    const [ events, setUserEvents ] = useState([]);
    const [ friends, setFriends ] = useState([])
    const [ nextEvent, setNextEvent ] = useState({});
    const [ activeUserId, setActiveUserId ] = useState()

     useEffect(() => {
        const getFriends = () => {
        
            APIManager.getFriends(activeUserId)
                        .then(myFriends => {
                        let tempFriendsArray = myFriends.map(friend => { return friend.userId});
                        tempFriendsArray.push(activeUserId)
                        return setFriends(tempFriendsArray)
                    })
                        
        };

        const getEventList = () => {
            const thisDate = new Date();
            //Function to retrieve events from database
            let eventArray = []
            let nextEventCalc = {};
            return APIManager.getAllforComponent("events")
                .then(eventsFromAPI => {
                    eventArray = eventsFromAPI.filter(function(event) {
                        return friends.indexOf(event.userId);
                      });
                    eventArray.sort((a, b) => {
                        if (a.date > b.date) return -1;
                        if (a.date < b.date) return 1;
                        return 0;
                    });
                    eventArray.forEach((event => {
                        let eventDate = new Date(event.date).getTime();
                        let today = thisDate.getTime();
                        if (eventDate > today) { nextEventCalc = event }
                        if ( eventDate < nextEventCalc.date ) { nextEventCalc = event }
                    }));
                    setNextEvent(nextEventCalc)
                    setUserEvents(eventArray)
              });
        };
        setActiveUserId(JSON.parse(sessionStorage.getItem("credentials")).activeUserId)
        getFriends();

        getEventList()
        

    },[friends,activeUserId]);

    return(
        <>
        <div className="div__container__component">
        {events.map(event => <EventCard key={event.id} event={event} place={event.place}
         {...props} />)}
            

        </div>
        </>


    )
}

export default EventList