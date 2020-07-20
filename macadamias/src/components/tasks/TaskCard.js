import React, { useState, useEffect} from "react";
import APIManager from "../../modules/APIManager"
import "./Tasks.css";

const TaskCard = (props) => {
    const [ task, setTask ] = useState({complete: false});
    const [ isLoading, setIsLoading ] = useState(false);


    

  let setFriendClass = ""
  let displayClass = ""

  const dateConverter= (suppliedDate) => {
    let date = suppliedDate.toString()
    date = date.slice(0,10)
    date = date.split("-")
    return date = `${date[1]}-${date[2]}-${date[0]}`
  }

  props.task.date = dateConverter(props.task.date)

  const setNextClass = (props.setNext) ? "section__nextTask" : ""
  if (props.activeUserId !== props.task.userId) { 
    setFriendClass = "section__friend"
    displayClass = "hidden"
  }

  
         
  return (
    (!isLoading) ?
    <>
    <section className={`section__card task--${props.task.id}  ${setFriendClass}`}>
      <div className="div__card__task">
   
                <div className={`header__card  ${setNextClass}`}> {props.task.task}
                    <button className={`btn ${displayClass}`} onClick={() => props.deleteTask(props.task.id)} ><i className="fa fa-trash"></i></button>
                </div>
                <p className="card__text"><strong>Date:</strong>  {props.task.date}</p>
                <p className="card__text"><button className="btn checkbox" type="checkbox" value={props.task.complete} id="complete" onClick={() => props.updateTask(props.task)}> <i className={`fa fa-check-square  `} aria-hidden="true"></i>
        </button></p>
               
      </div>
    </section>
    </>
    :null
  );
};

export default TaskCard;