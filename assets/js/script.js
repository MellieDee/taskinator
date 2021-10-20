// to give each task unique ID for referencing when action like delete
var taskIdCounter = 0;
var pageContentEl = document.querySelector("#page-content");

//ID and elements in HTML
// var buttonEl = document.querySelector("#save-task");
var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");


//******task FORM HANDLER function *****

//define and package (as 1 obj) name and type as reference in the form input fields. Can easily add more properties here
  var taskFormHandler =  function(event) {

    event.preventDefault();

    //(remember can check values by  console.dir)
    var taskNameInput = document.querySelector("input[name='task-name']").value;
    var taskTypeInput = document.querySelector("select[name='task-type']").value;

    //check if input values are empty strings
    if (!taskNameInput || !taskTypeInput) {
        alert("I thought you wanted to accomplish something??");
        return false;
    }
    formEl.reset();

    //package data as object
    var taskDataObj = {
      name: taskNameInput,
      type: taskTypeInput
    };
//*******FORM HANDLER Function  Ends  *************/

 //****send  taskFormHandler() new object as argument to createTaskEl ***
    createTaskEl(taskDataObj);
  };


  //********* TASK ACTIONS Function Starts ********/

  //*** Add Dynamic DIV and Buttons to EACH list item */
var createTaskActions = function(taskId) {
  //add DIV w/class name
  var actionContainerEl = document.createElement("div");
  actionContainerEl.className = "task-actions";

  //create dynamic EDIT & DELETE Buttons w/class names and assign each to a particular task with tastkId

  //EDIT btn
  var editButtonEl = document.createElement("button");
  editButtonEl.textContent = "Edit";
  editButtonEl.className = "btn edit-btn";
  editButtonEl.setAttribute("data-task-id", taskId);

  actionContainerEl.appendChild(editButtonEl);

  //DELETE Btn
  var deleteButtonEl = document.createElement("button");
  deleteButtonEl.textContent = "Delete";
  deleteButtonEl.className = "btn delete-btn";
  deleteButtonEl.setAttribute("data-task-id", taskId);

  actionContainerEl.appendChild(deleteButtonEl);


  //STATUS Dropdown
  var statusSelectEl  = document.createElement("select");
  statusSelectEl.className = "select-status";
  statusSelectEl.setAttribute("name", "status-change");
  statusSelectEl.setAttribute("data-task-id", taskId);

  actionContainerEl.appendChild(statusSelectEl);


  //   //to quicklky add 3 <option> tags using for loop
  var statusChoices = ["To Do", "In Progress", "Completed"];

  for (var i = 0; i < statusChoices.length; i++) {
       var statusOptionEl = document.createElement("option");
       statusOptionEl.textContent = statusChoices[i];
       statusOptionEl.setAttribute("value", statusChoices[i]);

  //   append to parent "select" tag
       statusSelectEl.appendChild(statusOptionEl);
   }
   return actionContainerEl;
}



//*******  create TASK  function  ******

//Funk to create list item obj. HTML/DOM current holds: name and type
var createTaskEl =  function(taskDataObj) {


  //create list item
  var listItemEl = document.createElement("li");
  listItemEl.className = "task-item";

  //assign unique task ID to each task as custom attribute
  listItemEl.setAttribute("data-task-id", taskIdCounter);

  //define new task info we want to add to the individual tasks
  //create DIV to hold task info and add to list item
  var taskInfoEl = document.createElement("div");
    //class name for DIV aka taskInfoEl
    taskInfoEl.className = "task-info";
    //add HTML content to div
    taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span";
    //add task info to the list item
    listItemEl.appendChild(taskInfoEl);

    var taskActionsEl = createTaskActions(taskIdCounter);
   listItemEl.appendChild(taskActionsEl);

    //add  list item and its info to ul list
    tasksToDoEl.appendChild(listItemEl);

    //increase task counter for next unique id
    taskIdCounter++;
};


//ADD TASK in Viewport ie run app
//add new task by listening to form  and applying the desired action, nicknamed: creatTaskHandler
formEl.addEventListener("submit", taskFormHandler);


//*******Task BUTTON HANDLER function *******/
var taskButtonHandler = function(event) {
  console.log(event.target);

  //****** DELETE ACTIOIN starts *****
  if (event.target.matches(".delete-btn")) {
    //get element's task id
    var taskId = event.target.getAttribute("data-task-id");
    deleteTask(taskId);
  }
}


//***** DELETE ACTION  Starts******/
var deleteTask = function(taskId) {
  console.log(taskId);
  var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
  console.log(taskSelected);
  taskSelected.remove();
  
}
pageContentEl.addEventListener("click", taskButtonHandler);

