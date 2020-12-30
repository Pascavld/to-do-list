const form = document.querySelector("#task-form");
const taskList = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-tasks");
const filter = document.querySelector("#filter");
const taskInput = document.querySelector("#task");
const checkbox = document.getElementById("checkbox");

loadAllEventListeners();

function loadAllEventListeners() {
    form.addEventListener("submit", addTask);
    document.addEventListener("DOMContentLoaded", getTask);
    taskList.addEventListener("click", removeTask);
    clearBtn.addEventListener("click", clearTasks);
    filter.addEventListener("keyup", filterTasks);
    taskList.addEventListener("click", checkedTask);
    checkbox.addEventListener("change", changeTheTheme);
}

function changeTheTheme() {
    document.body.classList.toggle("dark");
    document.querySelector(".card").classList.toggle("dark");
    document.querySelector("#filter").classList.toggle("dark");
    document.querySelector("#task").classList.toggle("dark");
}

function checkedTask(e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
    }
}

function getTask() {
    let tasks;

    if (localStorage.getItem("tasks") === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem("tasks"));
    }

    tasks.forEach(function (task) {
        const li = document.createElement("li");
        li.className = "collection-item";
        li.appendChild(document.createTextNode(task));
        const link = document.createElement("a");
        link.className = "delete-item secondary-content";
        link.innerHTML = '<i class = "fa fa-remove"></i>';

        li.appendChild(link);
        taskList.appendChild(li);
    });
}

function addTask(e) {
    if (taskInput.value === "") {
        alert("Add a task");
    }

    if (taskInput.value !== "") {
        const li = document.createElement("li");
        li.className = "collection-item";
        li.appendChild(document.createTextNode(taskInput.value));
        const link = document.createElement("a");
        link.className = "delete-item secondary-content";
        link.innerHTML = '<i class = "fa fa-remove"></i>';
        li.appendChild(link);
        taskList.appendChild(li);
        storeTaskInLocalStorage(taskInput.value);
    }

    taskInput.value = "";

    e.preventDefault();
}
function storeTaskInLocalStorage(task) {
    let tasks;

    if (localStorage.getItem("tasks") === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem("tasks"));
    }

    tasks.push(task);

    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function removeTask(e) {
    if (e.target.parentElement.classList.contains("delete-item")) {
        if (confirm("Are you sure you want to delete this task?")) {
            e.target.parentElement.parentElement.remove();

            removeTheTaskFromTheLocalStorage(
                e.target.parentElement.parentElement
            );
        }
    }
}

function removeTheTaskFromTheLocalStorage(taskItem) {
    let tasks;

    if (localStorage.getItem("tasks") === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem("tasks"));
    }

    tasks.forEach(function (task, index) {
        if (taskItem.textContent === task) {
            tasks.splice(index, 1);
        }
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function clearTasks(e) {
    taskList.innerHTML = "";

    clearTasksFromLocalStorage();
}

function clearTasksFromLocalStorage() {
    if (confirm("Are you sure?")) {
        localStorage.clear();
    }
}

function filterTasks(e) {
    const text = e.target.value.toLowerCase();

    const tasks = document.querySelectorAll(".collection-item");

    tasks.forEach(function (task) {
        const item = task.firstChild.textContent;

        if (item.toLowerCase().indexOf(text) != -1) {
            task.style.display = "block";
        } else {
            task.style.display = "none";
        }
    });
}
