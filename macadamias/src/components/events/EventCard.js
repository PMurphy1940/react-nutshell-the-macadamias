import React from "react";
import { Card, CardBody, CardText, CardTitle } from "reactstrap"
import { Link } from "react-router-dom";
import "./Events.css";

const EventCard = (props) => {
  
   
  return (

    <section className={`section__itemCard event--${props.event.id}`}>
      <div className="div__card__event">
    <Card className="card">
      <CardBody className="card-content">
    
                <div className={`header__itemCard header__itemCard--${props.event.id}`}></div>
                <CardTitle><strong>Name:</strong>  {props.event.name}</CardTitle>
                <CardText><strong>Date:</strong>  {props.event.date}<br />
                <strong>Location:</strong>  {props.event.place}
                </CardText>
      </CardBody>
    </Card>
    </div>
    </section>
  );
};

export default EventCard;