// TaskList Component
// Author: David Bruce

import React, { useState,useEffect } from 'react';
import APIManager from '../../modules/APIManager'
import TaskCard from "./TaskCard"
import 'bootstrap/dist/css/bootstrap.min.css';
import Authentication from "../Auth/Authentication";
      
const TaskList = (props) => {
    //Set initial state
    const [ tasks, setUsertasks ] = useState([]);
    const [ nextTask, setnextTask ] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [checkClass, setCheckClass] = useState("fa-square")

    
    // Generate unique keys for static elements
    const generateKey = (pre) => {
        const thisKey = `${ pre }_${ new Date().getTime() }`
        return thisKey;
    }

    const activeUserId = JSON.parse(sessionStorage.getItem("credentials")).activeUserId;

    const getTaskList = () => {

            const thisDate = new Date();
            //Function to retrieve tasks from database
            let taskArray = []; //temp array for sorting and finding next occurring task
            let nextTaskCalc = {}; //temp nextTask obj for comparison and useState set
            
            
            //Get all tasks
            return APIManager.getAllforComponent("tasks")
                .then(tasksFromAPI => {
                    //Filter friends and active user tasks into temp array
                    taskArray = tasksFromAPI.filter(function(task) {
                          return (task.userId === activeUserId && task.complete === false);
                      });
                    //sort by date for list
                    taskArray.sort((a, b) => {
                        if (a.date > b.date) return -1;
                        if (a.date < b.date) return 1;
                        return 0;
                    });
                    //find next task
                    taskArray.forEach((task => {
                        let taskDate = new Date(task.date).getTime();
                        let today = thisDate.getTime();
                        if (taskDate > today) { nextTaskCalc = task }
                        if ( taskDate < nextTaskCalc.date ) { nextTaskCalc = task }
                    }))
                    setCheckClass("fa-square")
                    setnextTask(nextTaskCalc);
                    setUsertasks(taskArray);
                    setIsLoading(false)

               
              });
            
        };
        
    
    useEffect(() => {

        getTaskList()
        
                    
    },[isLoading]);

    const updateTask = (taskObject) => {
        
        setIsLoading(true);
        
        // This is an edit, so we need the id
        const editedTask = {
            id: taskObject.id,
            name: taskObject.task,
            date: taskObject.date,
            complete: true,
            userId: taskObject.userId
        };

        APIManager.update(editedTask,"tasks")
          .then(() => {
              setIsLoading(false)})
              .then(()=> {
              props.history.push("/tasks")
              console.log("After push")
          })
    
    };


    const deleteTask = id => {
        APIManager.deleteObject(id,"tasks")
            .then(() => { 
                setIsLoading(true)
                props.history.push("/tasks")
            })
    }

    return(
        
        <>
        <div className="div__container__component" key={generateKey("tasksContainer") } >
            <div className="div__component__toolbar" id="div__component__toolbar" key={generateKey("tasksToolbar") }>
               <h3 className="header__component__toolbar"> Task Center </h3><button className="btn" onClick={() => {props.history.push("/tasks/new")}}><i className="fa fa-plus"></i> Add Me A Task</button>
                
            </div>
            <div className="container__cards scrollDiv" key={generateKey("tasksContainerCards") } >
                {tasks.map(task => <TaskCard key={task.id} task={task} checkClass={checkClass} setNext = {nextTask.id === task.id} activeUserId={activeUserId} deleteTask={deleteTask} updateTask={updateTask} {...props} />)}
            </div>
        
        </div>
        </>

        
    )
}

export default Authentication(TaskList);


