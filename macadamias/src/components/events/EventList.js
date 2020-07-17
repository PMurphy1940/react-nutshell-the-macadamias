// EventList Component
// Author: David Bruce

import React, { useState,useEffect } from 'react';
import APIManager from '../../../modules/APIManager'
import EventCard from './EventCard'

const EventList = () => {
    //Set initial state
    const [ userEvents, setUserEvents ] = useState([]);
    const [ friends, setFriends ] = useState([])
    const activeUserId = parseInt(sessionStorage.getItem("activeUser"))

    let eventArray = [];
    let nextEvent = {};
    
    const getEventList = () => {
        const thisDate = new Date();
        //Function to retrieve events from database
        return APIManager.getAllUsersFriendsAndComponentItems("events")
            .then(eventsFromAPI => {
                APIManager.getFriends(activeUserId)
                    .then(setFriends(friends));
                eventsFromAPI.forEach(user => {
                    let friendOfUser = false
                    friends.forEach(friend => {
                        friendOfUser = (friend.userId === userId) ? true:false 
                    });
                    user.events.forEach(event => {
                        event.userName = user.userName
                        event.friendOfUser = friendOfUser
                        ( event.friendOfUser === true || event.userId === activeUserId) && eventArray.push(event)
                    });
                });
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
                setUserEvents(eventArray);
                
          });
    }

    useEffect(() => {
        getEventList()
    },[]);

    return (
            <div>Hello</div>

    )
}