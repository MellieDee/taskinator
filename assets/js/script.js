//ID and elements in HTML
var buttonEl = document.querySelector("#save-task");
var tasksToDoEl = document.querySelector("#tasks-to-do");

  //create taskHandler as shorthand for Btn function - do before so it is defiend by time btn sees it
  var createTaskHandler =  function() {
    var taskItemEl = document.createElement("li");
    taskItemEl.textContent = "Start Challenge"
    taskItemEl.className =  "task-item"
    tasksToDoEl.appendChild(taskItemEl);
  }

//add new task by listening to button  and applying the desired action, nicknamed: creatTaskHandler
buttonEl.addEventListener("click", createTaskHandler);
