

const todoInput = document.querySelector(".todo-input");
const dateInput = document.querySelector(".todo-date");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

document.addEventListener("DOMContentLoaded", getLocalTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", handleTodoClick);
filterOption.addEventListener("change", filterTodo);

function addTodo(event) {
  event.preventDefault();

  if (todoInput.value.trim() === "") return;

  const todoText = todoInput.value.trim();
  const todoDate = dateInput.value;

  createTodoElement(todoText, todoDate);
  saveLocalTodos({ text: todoText, date: todoDate });

  todoInput.value = "";
  dateInput.value = "";
}

function createTodoElement(text, date) {
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");

  const dateLabel = document.createElement("span");
  dateLabel.classList.add("todo-date-label");
  dateLabel.innerText = date;
  todoDiv.appendChild(dateLabel);

  const newTodo = document.createElement("li");
  newTodo.innerText = text;
  newTodo.classList.add("todo-item");
  todoDiv.appendChild(newTodo);

  const completedButton = document.createElement("button");
  completedButton.innerHTML = '<i class="fas fa-check-circle"></i>';
  completedButton.classList.add("complete-btn");
  todoDiv.appendChild(completedButton);

  const editButton = document.createElement("button");
  editButton.innerHTML = '<i class="fas fa-edit"></i>';
  editButton.classList.add("edit-btn");
  todoDiv.appendChild(editButton);

  const trashButton = document.createElement("button");
  trashButton.innerHTML = '<i class="fas fa-trash"></i>';
  trashButton.classList.add("trash-btn");
  todoDiv.appendChild(trashButton);

  todoList.appendChild(todoDiv);
}
function handleTodoClick(e) {
  const item = e.target;
  const todo = item.closest(".todo");

  if (item.closest(".trash-btn")) {
    todo.classList.add("slide");
    removeLocalTodo(todo);
    todo.addEventListener("transitionend", () => {
      todo.remove();
    });
  } else if (item.closest(".complete-btn")) {
    todo.classList.toggle("completed");
  } else if (item.closest(".edit-btn")) {
    makeEditable(todo);
  } else if (item.closest(".save-btn")) {
    saveEdits(todo);
  }
}


function makeEditable(todo) {
  const li = todo.querySelector(".todo-item");
  const dateLabel = todo.querySelector(".todo-date-label");

  const text = li.innerText;
  const date = dateLabel.innerText;

  const textInput = document.createElement("input");
  textInput.type = "text";
  textInput.value = text;
  textInput.classList.add("editing-input");

  const dateInput = document.createElement("input");
  dateInput.type = "date";
  dateInput.value = date;
  dateInput.classList.add("editing-input");

  li.replaceWith(textInput);
  dateLabel.replaceWith(dateInput);

  const editBtn = todo.querySelector(".edit-btn");
  editBtn.innerHTML = '<i class="fas fa-save"></i>';
  editBtn.classList.remove("edit-btn");
  editBtn.classList.add("save-btn");
}

function saveEdits(todo) {
  const textInput = todo.querySelector("input[type='text']");
  const dateInput = todo.querySelector("input[type='date']");

  const newText = textInput.value.trim();
  const newDate = dateInput.value;

  if (!newText) return;

  const li = document.createElement("li");
  li.classList.add("todo-item");
  li.innerText = newText;

  const dateLabel = document.createElement("span");
  dateLabel.classList.add("todo-date-label");
  dateLabel.innerText = newDate;

  textInput.replaceWith(li);
  dateInput.replaceWith(dateLabel);

  const saveBtn = todo.querySelector(".save-btn");
  saveBtn.innerHTML = '<i class="fas fa-edit"></i>';
  saveBtn.classList.remove("save-btn");
  saveBtn.classList.add("edit-btn");

  updateLocalTodos();
}

function filterTodo(e) {
  const todos = todoList.childNodes;
  todos.forEach((todo) => {
    switch (e.target.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        todo.style.display = todo.classList.contains("completed")
          ? "flex"
          : "none";
        break;
      case "incomplete":
        todo.style.display = !todo.classList.contains("completed")
          ? "flex"
          : "none";
        break;
    }
  });
}

function saveLocalTodos(todoObj) {
  let todos = localStorage.getItem("todos")
    ? JSON.parse(localStorage.getItem("todos"))
    : [];
  todos.push(todoObj);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function removeLocalTodo(todoElement) {
  const todos = JSON.parse(localStorage.getItem("todos")) || [];

  const todoText = todoElement.querySelector(".todo-item")?.innerText;

  const filtered = todos.filter((todo) => todo.text !== todoText);
  localStorage.setItem("todos", JSON.stringify(filtered));
}

function updateLocalTodos() {
  const allTodos = document.querySelectorAll(".todo");
  const updatedTodos = [];

  allTodos.forEach((todo) => {
    const text = todo.querySelector(".todo-item")?.innerText;
    const date = todo.querySelector(".todo-date-label")?.innerText;
    if (text) updatedTodos.push({ text, date });
  });

  localStorage.setItem("todos", JSON.stringify(updatedTodos));
}

function getLocalTodos() {
  const todos = JSON.parse(localStorage.getItem("todos")) || [];
  todos.forEach((todo) => {
    createTodoElement(todo.text, todo.date);
  });
}
