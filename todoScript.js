let todoinput = document.getElementById("input");
let todoButton = document.getElementById("todoAddButton");
let ul = document.getElementById("todoList");
let clearList = document.getElementById("clearAll");

loadTask();


//for 
todoinput.addEventListener("keypress",function (e){
    if(e.key==="Enter"){
        add();
    }
});

todoButton.addEventListener("click",()=>{
    add();
});

clearList.addEventListener("click",()=>{
localStorage.clear();
document.querySelector("ul").innerHTML="";
})

function add(){
    if(todoinput.value !== ""){
        let li = document.createElement("li");
        li.textContent=todoinput.value;

        let removeButton = document.createElement("button");
        removeButton.textContent="Remove";
        li.appendChild(removeButton);

        if(ul.children.length>=6){
            alert("Exceed Limit: 5 Task");
            todoinput.value="";
        }

        else{
            ul.appendChild(li);
            todoinput.value="";
            saveTask();
        }

        //remove task when click on remove button
        removeButton.addEventListener("click",()=>{
            if(confirm("Can You Really Remove The Task")){
                ul.removeChild(li);
                saveTask();
            }
        });

        }
        else{
            alert("Field is empty");
        }
}


function saveTask(){
    let tasks = [];
    ul.querySelectorAll("li").forEach(li=>{
        tasks.push(li.textContent.replace("Remove",""));
    });
        localStorage.setItem("Tasks", JSON.stringify(tasks));
}

function loadTask(){

    let tasks = JSON.parse(localStorage.getItem("Tasks"))  || [];
    tasks.forEach(task=>{
        let li= document.createElement("li");
        li.textContent=task;

        let removeButton=document.createElement("button");
        removeButton.textContent="Remove";
        li.appendChild(removeButton);
        ul.appendChild(li);


        //update local storage after removing item from list
        removeButton.addEventListener("click", ()=>{
            if(confirm("Are you really wants to remove the task")){
                ul.removeChild(li);

                saveTask();

            }
    }); 
});   
}



