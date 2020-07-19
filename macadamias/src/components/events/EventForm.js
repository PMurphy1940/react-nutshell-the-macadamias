import React, { useState } from 'react';
import APIManager from '../../modules/APIManager'
import './EventForm.css';
import 'bootstrap/dist/css/bootstrap.min.css';
  
// Form function for adding events
const EventForm = props => {
//get active user id for event
const activeUserId = JSON.parse(sessionStorage.getItem("credentials")).activeUserId;

  //useState for event (local to EventForm) that will update the named fields of the object
  const [event, setEvent] = useState({ name: "", date: "" , place: "", userId: activeUserId});

  //useState to determine if form is loading, so buttons will be disabled if true
  const [isLoading, setIsLoading] = useState(false);

  
  

  
  // handleFieldChange called from button onChange event, will update object as characters are typed in the fields. 
  const handleFieldChange = evt => {
    // stateToChange is previous keys/values in event with spread (...)
    const stateToChange = { ...event };
    // console.log("stateToChange Prev Value:",stateToChange)
    
    //stateToChange[key] set to value from input event
    stateToChange[evt.target.id] = evt.target.value;
    // console.log("stateToChange key value=",stateToChange[evt.target.id], "id:",evt.target.id)

    // sets new event object 
    setEvent(stateToChange);

  };

  /*  Local method for validation, set loadingStatus, create event      object, invoke the eventManager post method, and redirect to the full event list
  */
  const constructNewEvent = evt => {
    // Prevent Default Activity (don't refresh)
    evt.preventDefault();
    if (event.name === "" || event.date === "" || event.place === "") {
      window.alert("Please input a name, date, and place for your event");
    } else {
      setIsLoading(true);
      // Create the event and redirect user to event list
      
      APIManager.postObject(event,"events")
        .then(() => props.history.push("/events"));
    }
  };

  return (
    (!isLoading) && (
    <>
      <form>
        <fieldset>
          <div className="formgrid">
            <input
              type="text"
              required
              onChange={handleFieldChange}
              id="name"
              placeholder="Event Name"
            />
            <label htmlFor="name">Name</label>
            <input 
                type="date"
                required
                onChange={handleFieldChange}
                name="date" id="date" value={event.date}></input>
            <label htmlFor="date">Date</label>
            <input 
                type="text"
                required
                onChange={handleFieldChange}
                name="place" id="place" value={event.place}></input>
            <label htmlFor="place">Place</label>
          </div>
          <div className="alignRight">
            <button
              type="button"
              disabled={isLoading}
              onClick={constructNewEvent}
            >Submit</button>
          </div>
        </fieldset>
      </form>
    </>
  ))
};

export default EventForm;