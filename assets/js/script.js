//ID and elements in HTML
// var buttonEl = document.querySelector("#save-task");
var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");

//define and package (as 1 obj) name and type as reference in the form input fields. Can easily add more properties here
  var taskFormHandler =  function(event) {
    event.preventDefault()

    //(remember can check values by  console.dir)
    var taskNameInput = document.querySelector("input[name='task-name']").value;
    var taskTypeInput = document.querySelector("select[name='task-type']").value;

    //package data as object
    var taskDataObj = {
      name: taskNameInput,
      type: taskTypeInput
    };

    //send as argument to createTaskEl
    createTaskEl(taskDataObj);
  };



//Funk to create list item obj. HTML/DOM current holds: name and type
var createTaskEl =  function(taskDataObj) {
  //create list item
  var listItemEl = document.createElement("li");
  listItemEl.className = "task-item";

  //create DIV to hold task info and add to list item
  var taskInfoEl = document.createElement("div");

  //class name for DIV aka taskInfoEl
  taskInfoEl.className = "task-info";
  //add HTML content to div
  taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span";

  listItemEl.appendChild(taskInfoEl);

//add entire list item to ul list
tasksToDoEl.appendChild(listItemEl);
};



//add new task by listening to form  and applying the desired action, nicknamed: creatTaskHandler
formEl.addEventListener("submit", taskFormHandler);

