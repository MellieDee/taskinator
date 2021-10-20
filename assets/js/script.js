//ID and elements in HTML
// var buttonEl = document.querySelector("#save-task");
var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");


  //create taskHandler as shorthand for Btn function - do before so it is defined by time btn sees it
  var createTaskHandler =  function(event) {
  

    event.preventDefault()

    var taskItemEl = document.createElement("li");
    taskItemEl.textContent = "Start Challenge";
    taskItemEl.className =  "task-item";
    tasksToDoEl.appendChild(taskItemEl);
  }

//add new task by listening to form  and applying the desired action, nicknamed: creatTaskHandler
formEl.addEventListener("submit", createTaskHandler);
