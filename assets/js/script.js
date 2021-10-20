//ID and elements in HTML
// var buttonEl = document.querySelector("#save-task");
var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");


  //create taskHandler as shorthand for Btn function - do before so it is defined by time btn sees it
  var createTaskHandler =  function(event) {
    event.preventDefault()

    //to find value for input field using console.dir to
    var taskNameInput = document.querySelector("input[name='task-name']").value;

    var taskTypeInput = document.querySelector("select[name='task-type']").value;


    //create list item
    var listItemEl = document.createElement("li");
    listItemEl.className = "task-item";

    //create DIV to hold task info and add to list item
    var taskInfoEl = document.createElement("div");

    //class name for DIV aka taskInfoEl
    taskInfoEl.className = "task-info";
    //add HTML content to div
    taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskNameInput + "</h3><span class='task-type'>" + taskTypeInput + "</span";

    listItemEl.appendChild(taskInfoEl);

 //add entire list item to list
 tasksToDoEl.appendChild(listItemEl);
  }

//add new task by listening to form  and applying the desired action, nicknamed: creatTaskHandler
formEl.addEventListener("submit", createTaskHandler);

