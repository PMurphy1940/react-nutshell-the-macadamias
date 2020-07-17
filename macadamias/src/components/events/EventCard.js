import React from "react";
import { Link } from "react-router-dom";
import "./Events.css";

const EventCard = (props) => {
  
   
  return (

    <div className="card">
      <div className="card-content">
      <section className={`section__itemCard event--${event.id}`}>
                <p class="header__itemCard header__itemCard--${event.id}">Name:  {event.name}</p>
                
                <p><strong>Date:</strong>  {event.date}</p>
                <p><strong>Location:</strong>  ${event.location}</p>
        </section>

      </div>
    </div>
  );
};

export default EventCard;