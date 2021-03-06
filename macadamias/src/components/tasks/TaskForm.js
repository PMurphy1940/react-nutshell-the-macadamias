import React, { useState } from 'react';
import APIManager from '../../modules/APIManager'
import './TaskForm.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Authentication from "../Auth/Authentication";
  
// Form function for adding tasks
const TaskForm = props => {
//get active user id for task
const activeUserId = JSON.parse(sessionStorage.getItem("credentials")).activeUserId;

  //useState for task (local to TaskForm) that will update the named fields of the object
  const [task, setTask] = useState({ task: "", date: "" , complete: false, userId: activeUserId});

  //useState to determine if form is loading, so buttons will be disabled if true
  const [isLoading, setIsLoading] = useState(false);

  
  

  
  // handleFieldChange called from button onChange task, will update object as characters are typed in the fields. 
  const handleFieldChange = evt => {
    // stateToChange is previous keys/values in task with spread (...)
    const stateToChange = { ...task };
    
    //stateToChange[key] set to value from input task
    stateToChange[evt.target.id] = evt.target.value;

    // sets new task object 
    setTask(stateToChange);

  };

  /*  Local method for validation, set loadingStatus, create task      object, invoke the taskManager post method, and redirect to the full task list
  */
  const cancelTask = evt => {
    props.history.push("/tasks")
  }

  const constructNewTask = evt => {
    // Prtask Default Activity (don't refresh)
    evt.preventDefault();
    if (task.task === "" || task.date === "") {
      window.alert("Please input a name, date, and place for your task");
    } else {
      setIsLoading(true);
      // Create the task and redirect user to task list
      
      APIManager.postObject(task,"tasks")
        .then(() => props.history.push("/tasks"));
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
              id="task"
              placeholder="Task Name"
              value={task.task}
            />
            <label htmlFor="name">Task</label>
            <input 
                type="date"
                required
                onChange={handleFieldChange}
                name="date" id="date" value={task.date}></input>
            <label htmlFor="date">Date</label>
            
          </div>
          <div className="div__task__buttons">
            <button
              type="button"
              className="btn"
              disabled={isLoading}
              onClick={constructNewTask}
            >Save</button>
            <button
              type="button"
              className="btn"
              disabled={isLoading}
              onClick={cancelTask}
            >Nevermind</button>
          </div>
        </fieldset>
      </form>
    </>
  ))
};

export default Authentication(TaskForm);