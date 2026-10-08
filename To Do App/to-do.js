const todoInput = document.getElementById("todoInput");
const addBtn = document.getElementById("addBtn");
const todoList = document.getElementById("todoList");

let todos = [];

addBtn.addEventListener("click", addTodo);

todoInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        addTodo();
    }
});

function addTodo() {
    const task = todoInput.value.trim();

    if (task === "") {
        return;
    }

    const todo = {
        id: Date.now(),
        text: task,
        completed: false
    };

    todos.push(todo);

    todoInput.value = "";

    displayTodos();
}

function displayTodos() {
    todoList.innerHTML = "";

    todos.forEach(function (todo) {

        const li = document.createElement("li");
        li.classList.add("todo-item");

        const span = document.createElement("span");
        span.textContent = todo.text;
        span.classList.add("todo-text");

        if (todo.completed) {
            span.classList.add("completed");
        }

        span.addEventListener("click", function () {
            todo.completed = !todo.completed;
            displayTodos();
        });

        const deleteButton = document.createElement("button");

        deleteButton.textContent = "Delete";
        deleteButton.classList.add("delete-btn");

        deleteButton.addEventListener("click", function () {
            todos = todos.filter(function (item) {
                return item.id !== todo.id;
            });

            displayTodos();
        });

        li.appendChild(span);
        li.appendChild(deleteButton);

        todoList.appendChild(li);
    });
}