console.log("task.js wird jetzt ausgeführt");

//neuen Eintrag im Aufgabenbereich hinzufügen
function addTaskbyEnter(e){
  //console.log("Aufgabe hinzufügen");
  //this.focus();e.preventDefault();
   if (e.which === 13){
    //Enter-Event
        var todotext = $(this).val();
        var todoID = document.getElementById("todoID").innerHTML;
        console.log(todoID);
        $(this).val("");
        $("ul").append("<li>"+ todotext +"<input type='text' name='tasks[task]' value='" +todotext+"' hidden='true'></li>");
        sendText(todotext, todoID);
        //var addTaskForm = document.getElementById("addTaskForm");
        //addTaskForm.addEventListener("keypress", removeDefault);
   }
}
//Delete und Edit Elemente in einem task einblenden
function showElements(e){
  console.log("Function: showElements");
  //document.getElementByClassName
}

//Ausgabe des Keycodes/////
function retrievekeyCode(e){
  e = e || window.event;
  console.log( e.keyCode); 
}

function sendText(text,id){
    $.post("/saveTask",
    {
        task: text,
        todoID: id
    },
    function(data, status){
        //console.log("Data: " + data + "\nStatus: " + status);
        console.log("Callback");
    });
}


//HOOVER über Listeneintrag
var tasks = document.getElementsByClassName("taskListItem");
console.log(tasks.length);
for (var i = 0; i < tasks.length; i++){
  tasks[i].addEventListener("mouseover", showElements);
}


//Listeneintrag mit enter hinzufügen
var addTask = document.getElementById("taskName");//Hier die Klasse Anpassen, auf die das Tastenelement hören soll
//var addTaskForm = document.getElementById("addTaskForm");
addTask.addEventListener("keypress", addTaskbyEnter);


