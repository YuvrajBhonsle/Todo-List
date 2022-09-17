// Selectors
const todoInput = document.querySelector(".todo_input");
const todoButton = document.querySelector(".todo_button");
const todoList = document.querySelector(".todo_list");
const filterOption = document.querySelector(".filter_todo");

// Event Listeners
document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", filterTodo);

// Functions
function addTodo(event) {
    // Prevent form from submitting
    event.preventDefault();

    // TODO Div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    // CREATE LI
    const newTodo = document.createElement("li");
    newTodo.innerText = todoInput.value;
    newTodo.classList.add("todo_item");
    todoDiv.appendChild(newTodo);

    // ADD TODOS TO LOCAL STORAGE
    saveLocalTodos(todoInput.value);

    // CHECK MARK BUTTON
    const completedButton = document.createElement("button");
    completedButton.classList.add("complete_btn");
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    todoDiv.appendChild(completedButton);

    // TRASH BUTTON
    const trashButton = document.createElement("button");
    trashButton.classList.add("trash_btn");
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    todoDiv.appendChild(trashButton);
    todoList.appendChild(todoDiv);

    // Clear todoInput value
    todoInput.value = "";
}

function deleteCheck(e) {
    const item = e.target;

    // DELETE TODO
    if(item.classList[0] === 'trash_btn'){
        const todo = item.parentElement;
        // Animation
        todo.classList.toggle("fall");
        removeLocalTodos(todo);
        // We wait till transition to end and then we delete the list item
        // Note: We have transitionend for transition,
        // Similarly we have animationend for animation
        todo.addEventListener("transitionend", function(){
            todo.remove();
        })
    }

    // CHECK TODO 
    if(item.classList[0] === 'complete_btn'){
        const todo = item.parentElement;
        todo.classList.toggle("completed");
    }
}

function filterTodo(e){
    const todos = todoList.childNodes;
    todos.forEach(function(todo) {
        switch(e.target.value){
            case "all":
                todo.style.display = "flex";
                break;
            case "completed":
                if(todo.classList.contains("completed")){
                    todo.style.display = "flex";
                }else {
                    todo.style.display = "none";
                }
                break;
            case "incomplete":
                if(!todo.classList.contains("completed")){
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
        }
    });
}

function saveLocalTodos(todo){
    // CHECK--> Hey do I have things already in localStorage ?
    let todos;
    if(localStorage.getItem("todos") === null){
        todos = [];
    }else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos(){
    // CHECK--> Hey do I have things already in localStorage ?
    let todos;
    if(localStorage.getItem("todos") === null){
        todos = [];
    }else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    todos.forEach(function(todo){
    // TODO Div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    // CREATE LI
    const newTodo = document.createElement("li");
    newTodo.innerText = todo;
    newTodo.classList.add("todo_item");
    todoDiv.appendChild(newTodo);

    // CHECK MARK BUTTON
    const completedButton = document.createElement("button");
    completedButton.classList.add("complete_btn");
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    todoDiv.appendChild(completedButton);

    // TRASH BUTTON
    const trashButton = document.createElement("button");
    trashButton.classList.add("trash_btn");
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    todoDiv.appendChild(trashButton);
    todoList.appendChild(todoDiv);
    });
}

function removeLocalTodos(todo){
    // CHECK--> Hey do I have things already in localStorage ?
    let todos;
    if(localStorage.getItem("todos") === null){
        todos = [];
    }else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    // Targeting text of todoItem and getting its index for removing it from Local Storage
    const todoIndex = todo.children[0].innerText; //(Returns the name of targetted item)->Targets the particular todoItem on clicking the trash button
    todos.splice(todos.indexOf(todoIndex), 1); //Gets the index of the clicked todoItem and removes it from array of todos

//     console.log(todo.children[0].innerText);
//     console.log(todo.indexOf("potato"))

// Syncing elements with Local Storage
    localStorage.setItem("todos", JSON.stringify(todos)); //Removes the clicked todoItem from LocalStorage array also
}