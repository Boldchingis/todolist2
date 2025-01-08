const STATUS = ["todo", "in-progress", "done", "blocked"];
let todos = [];

function addOne(newTodo) {
  todos.push(newTodo);
}

function editName(index, name) {
  let item = todos[index];
  item.name = name;
  render();
}

function editStatus(index, status) {
  let item = todos[index];
  item.status = status;
  render();
}

function deleteOne(index) {
  todos.splice(index, 1);
  render();
}

function render() {
  const todoList = document.querySelector("#todo-tasks");
  const inProgressList = document.querySelector("#in-progress-tasks");
  const doneList = document.querySelector("#done-tasks");
  const blockedList = document.querySelector("#blocked-tasks");

  todoList.innerHTML = "";
  inProgressList.innerHTML = "";
  doneList.innerHTML = "";
  blockedList.innerHTML = "";

  todos.forEach((item, i) => {
    const element = document.createElement("div");
    element.classList.add("todo-item");

    const titleEl = document.createElement("p");
    titleEl.innerText = item.name;

    const editBtnEl = document.createElement("i");
    editBtnEl.classList.add("fa-solid", "fa-pen");
    editBtnEl.onclick = function () {
      openEditModal(i);
    };

    const deleteBtnEl = document.createElement("i");
    deleteBtnEl.classList.add("fa-trash", "fa-solid");
    deleteBtnEl.onclick = function () {
      openDeleteModal(i);
    };

    element.appendChild(titleEl);
    element.appendChild(editBtnEl);
    element.appendChild(deleteBtnEl);

    if (item.status === "todo") {
      todoList.appendChild(element);
    } else if (item.status === "in-progress") {
      inProgressList.appendChild(element);
    } else if (item.status === "done") {
      doneList.appendChild(element);
    } else if (item.status === "blocked") {
      blockedList.appendChild(element);
    }
  });
}

function addTask() {
  const modal = document.querySelector("#modal");
  modal.style.display = "block";
}

function saveTask() {
  const inputValue = document.getElementById("task-name").value;
  const taskStatus = document.getElementById("task-status").value;

  if (!inputValue.trim()) {
    alert("Please enter a task name.");
    return;
  }

  todos.push({
    name: inputValue,
    status: taskStatus,
  });

  render();
  const modal = document.querySelector("#modal");
  modal.style.display = "none";

  document.getElementById("task-name").value = "";
  document.getElementById("task-status").value = "todo";
}


function openEditModal(index) {
  const modal = document.querySelector("#edit-modal");
  const task = todos[index];

  document.getElementById("task-name-edit").value = task.name;
  document.getElementById("task-status-edit").value = task.status;

  modal.style.display = "block";

  //  saving the edited task
  document.getElementById("save-edit-btn").onclick = function() {
    const newName = document.getElementById("task-name-edit").value;
    const newStatus = document.getElementById("task-status-edit").value;

    if (newName.trim() !== "") {
      editName(index, newName);
      editStatus(index, newStatus);
    }

    modal.style.display = "none";
  };
}

// Show delete modal
function openDeleteModal(index) {
  const modal = document.querySelector("#delete-modal");

  // Confirm delete
  document.getElementById("confirm-delete-btn").onclick = function() {
    deleteOne(index);
    modal.style.display = "none";
  };

  modal.style.display = "block";
}

// Close modal
window.onclick = function (event) {
  const modals = [document.querySelector("#modal"), document.querySelector("#edit-modal"), document.querySelector("#delete-modal")];
  modals.forEach(modal => {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });
};
