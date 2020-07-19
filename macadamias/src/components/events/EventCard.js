import React from "react";
import { Card, CardBody, CardText, CardTitle, CardHeader } from "reactstrap"
import { Link } from "react-router-dom";
import "./Events.css";

const EventCard = (props) => {
  let setFriendClass = ""
  let friendColor = ""
  let displayClass = ""

  const dateConverter= (suppliedDate) => {
    let date = suppliedDate.toString()
    date = date.slice(0,10)
    date = date.split("-")
    return date = `${date[1]}-${date[2]}-${date[0]}`
  }

  props.event.date = dateConverter(props.event.date)

  const setNextClass = (props.setNext) ? "section__nextEvent" : ""
  if (props.activeUserId !== props.event.userId) { 
    setFriendClass = "section__friend"
    friendColor = "#fff8dc"
    displayClass = "hidden"
  }
     
  return (
    <>
    <section className={`section__card event--${props.event.id}  ${setFriendClass}`}>
      <div className="div__card__event">
   
                <div className={`header__card header__itemCard--${props.event.id} ${setNextClass}`}>{props.event.name}</div>
                <p><strong>Date:</strong>  {props.event.date}</p>
                <p><strong>Location:</strong>  {props.event.place}</p>
                <div className="card__button__area">
                    <button className={`btn ${displayClass}`} id="button__event__delete--${event.id}" onClick={() => props.deleteEvent(props.event.id)} ><i className="fa fa-trash"></i></button>
                </div>
      </div>
    </section>
    </>
  );
};

export default EventCard;