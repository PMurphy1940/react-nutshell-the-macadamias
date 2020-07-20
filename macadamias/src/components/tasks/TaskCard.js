//TaskCard.js - renders task object to React DOM
//Author: David Bruce


import React from "react";
import "./Tasks.css";

const TaskCard = (props) => {

  let setFriendClass = ""
  let displayClass = ""

  const setNextClass = (props.setNext) ? "section__nextTask" : ""
  if (props.activeUserId !== props.task.userId) { 
    setFriendClass = "section__friend"
    displayClass = "hidden"
  }

  
         
  return (
    <>
    <section className={`section__card task--${props.task.id}  ${setFriendClass}`}>
      <div className="div__card__task">
   
                <div className={`header__card  ${setNextClass}`}> {props.task.name}
                    <button className={`btn ${displayClass}`} onClick={() => props.deleteTask(props.task.id)} ><i className="fa fa-trash"></i></button>
                </div>
                <p className="card__text"><strong>Date:</strong>  {props.taskDate}</p>
                <div className="card__button__area__task"><button className="btn checkbox" type="checkbox" value={props.task.complete} id="complete" onClick={() => props.updateTask(props.task)}> <i className={`fa fa-check-square  `} aria-hidden="true"></i>
        </button></div>
               
      </div>
    </section>
    </>
  );
};

export default TaskCard;