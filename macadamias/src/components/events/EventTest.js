// EventList Component
// Author: David Bruce

import React, { useState,useEffect } from 'react';
import APIManager from '../../modules/APIManager'

const EventList = (props) => {
    //Set initial state
    const [ events, setUserEvents ] = useState([]);
    const [ eventItem, setUserEvent ] = useState([]);
    const [ friends, setFriends ] = useState([])
    let myFriends = [];
    // const activeUserId = parseInt(sessionStorage.getItem("credentials"))
    const activeUserId = 1;

    let nextEvent = {};
 
    const getFriends = () => {
        console.log("ActiveUser:",activeUserId)
        APIManager.getFriends(activeUserId)
                    .then(friends => {
                    myFriends = friends.map(friend => { return friend.userId});
                    myFriends.push(activeUserId)
                    return setFriends(myFriends)
                })
                    
    }

    const getEventList = () => {
        const thisDate = new Date();
        //Function to retrieve events from database
        let eventArray = []
        return APIManager.getAllUsersFriendsAndComponentItems("events")
            .then(eventsFromAPI => {
                eventsFromAPI.forEach((user => {
                    user.events.forEach(event => {
                        console.log("event:",event.userId)
                    })
                }))
                eventArray = eventsFromAPI.filter(thisUser => thisUser.events.find(event => myFriends.includes(event.userId)))
                ;
                console.log("Array length",eventArray.length)
                eventArray.sort((a, b) => {
                    if (a.date > b.date) return -1;
                    if (a.date < b.date) return 1;
                    return 0;
                });
                eventArray.forEach((event => {
                    let eventDate = new Date(event.date).getTime();
                    let today = thisDate.getTime();
                    if (eventDate > today) { nextEvent = event }
                    if ( eventDate < nextEvent.date ) { nextEvent = event }
                }));
                eventArray.map(eventItem => setUserEvent(eventItem))
          });
    }

    useEffect(() => {
        getFriends();
        getEventList()

    },[]);

    return(
        <>
        <div className="div__container__component">
            {eventItem.name}
        </div>
        </>


    )
}

export default EventList