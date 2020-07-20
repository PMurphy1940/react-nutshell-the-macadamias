//EventCard.js Component - responsible for Event object to React DOM
//Author: David Bruce

import React from "react";
import "./Events.css";

const EventCard = (props) => {
  let setFriendClass = ""
  let displayClass = ""


  const setNextClass = (props.setNext) ? "section__nextEvent" : ""
  if (props.activeUserId !== props.event.userId) { 
    setFriendClass = "section__friend"
    displayClass = "hidden"
  }
     
  return (
    <>
    <section className={`section__card event--${props.event.id}  ${setFriendClass}`}>
      <div className="div__card__event">
   
                <div className={`header__card  ${setNextClass}`}> {props.event.name}
                    <button className={`btn ${displayClass}`} onClick={() => props.deleteEvent(props.event.id)} ><i className="fa fa-trash"></i></button>
                </div>
                <p className="card__text"><strong>Date:</strong>  {props.eventDate}</p>
                <p className="card__text"><strong>Location:</strong>  {props.event.place}</p>
               
      </div>
    </section>
    </>
  );
};

export default EventCard;