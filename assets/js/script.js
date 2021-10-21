// to give each task unique ID for referencing when action like delete
var taskIdCounter = 0;

var formEl = document.querySelector("#task-form");
// task column names
var tasksToDoEl = document.querySelector("#tasks-to-do");
var tasksInProgressEl = document.querySelector("#tasks-in-progress");
var tasksCompletedEl = document.querySelector("#tasks-completed");

var pageContentEl = document.querySelector("#page-content");


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

  
//*******FORM HANDLER Function  Ends  *************/
var isEdit = formEl.hasAttribute("data-task-id");

 //**** Complete EDIT TASK****/
 var completeEditTask = function(taskName, taskType,taskID) {
  //find matching task list item
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

  //set new values
    taskSelected.querySelector("h3.task-name").textContent =taskName;
    taskSelected.querySelector("span.task-type").textContent = taskType;

    alert("Task Updated!");
  //clear form contents and change button back
    formEl.removeAttribute("data-task-id");
    document.querySelector("#save-task").textContent = "Add Task";
  };

//  decide to Save Changes or Create new object /
  //has data attribute,so get task id and call lfunction to complete edit process
  if (isEdit) {
    var taskId = formEl.getAttribute("data-task-id");
    completeEditTask(taskNameInput, taskTypeInput, taskId);
    }
  //no data attribute, so create object as normak and pass to createTaskEl function
  else {
    //package data as object
    var taskDataObj = {
      name: taskNameInput,
      type: taskTypeInput
    };
    createTaskEl(taskDataObj);
    }

   
   }



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
  //get target element from event
  var targetEl = event.target;

  //this function has 2 parts:
  //  (1)  EDIT Button Clicked
  if  (targetEl.matches(".edit-btn")){
      var taskId = targetEl.getAttribute("data-task-id");
      editTask(taskId);
      }

  //   (2)  DELETE Button Clicked
  else if (targetEl.matches(".delete-btn")) {
    //get element's task id
      var taskId = targetEl.getAttribute("data-task-id");
      deleteTask(taskId);
      }
};


  //    **** ADDING BUTTON ACTION Starts (2 parts)   ****    
  //   (1)  EDIT Button Starts
      var editTask = function(taskId) {
      console.log("editing task #" + taskId);
      //get task list item
      var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
     
      //get content from task name and type
      var taskName = taskSelected.querySelector("h3.task-name").textContent;
      var taskType = taskSelected.querySelector("span.task-type").textContent;
      document.querySelector("input[name='task-name']").value = taskName;
      document.querySelector("select[name='task-type']").value = taskType;
      document.querySelector("#save-task").textContent = "Save Changes";
      formEl.setAttribute("data-task-id", taskId);
      };

  //   (2)  DELETE ACTION Starts
      var deleteTask = function(taskId) {
   
      //get the list item
      var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
  
      taskSelected.remove();
}

//*****     STATUS CHANGE Handler  Function Starts *******/
var taskStatusChangeHandler = function(event) {
console.log(event.target)

  //get task item's ID
  var taskId = event.target.getAttribute("data-task-id");

  //get currently selected options value and convert to lowercase
  var statusValue =  event.target.value.toLowerCase();

  //find the parent task item element based on the ID found
  var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

  if (statusValue === "to do") {
    tasksToDoEl.appendChild(taskSelected);
  } 
  else if (statusValue === "in progress") {
      tasksInProgressEl.appendChild(taskSelected);
    }
  else if (statusValue === "completed") {
    tasksCompletedEl.appendChild(taskSelected);
  }
};


pageContentEl.addEventListener("click", taskButtonHandler);
pageContentEl.addEventListener("change", taskStatusChangeHandler);
