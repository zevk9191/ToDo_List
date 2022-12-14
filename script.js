const form = document.querySelector('form');
const taskList = document.querySelector('#taskList');
const textInput = document.querySelector('.inputText');
const btnClearList = document.querySelector('#btnClearList');
const btnClearCompleted = document.querySelector('#btnClearCompleted');
const outNumberTasks = document.querySelector('#outNumberTasks');
const btnSortAll = document.querySelector('#btnSortAll');
const btnSortActive = document.querySelector('#btnSortActive');
const btnSortComplete = document.querySelector('#btnSortComplete');
const SEQUENCE_NUMBER_ENTER = 13;
const ACTIVE_STATUS = "active";
const COMPLETE_STATUS = "complete";
let newArr = JSON.parse(localStorage.getItem("tasks"));
let taskArray = [];

if (newArr) {
    for (let elem of newArr) {
        createTask(elem.id, elem.status ? ACTIVE_STATUS : COMPLETE_STATUS, elem.value);
    }
}

form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!textInput.value) return;
    let inpText = textInput.value;
    createTask(getToken(), ACTIVE_STATUS, inpText);
});

function getToken() {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

function createTask(id, status, text) {
    const li = document.createElement("li");
    const pre = document.createElement("pre");
    const buttonDelete = document.createElement("button");
    const buttonEdit = document.createElement("button");
    buttonEdit.className = "taskButton btnEdit";
    buttonDelete.className = "taskButton btnDelete";
    pre.className = "taskText";
    buttonEdit.textContent = "Edit";
    buttonDelete.textContent = "Delete";
    li.className = "tasks";
    li.setAttribute("data-status", status);
    if (li.dataset.status === "complete") pre.classList.toggle("active");
    li.setAttribute("data-id", id);
    pre.textContent = text;
    textInput.value = "";
    li.append(pre);
    li.append(buttonEdit);
    li.append(buttonDelete);
    taskList.append(li);
    taskList.style.visibility = "visible";
    taskArray.push({id: id, status: li.dataset.status === "active", value: text});
    localStorage.setItem("tasks", JSON.stringify(taskArray));
    outNumberTasks.textContent = `${taskArray.length}`;
    addListener(buttonDelete, buttonEdit, pre, li);
}

function addListener(buttonDelete, buttonEdit, text, li) {

    buttonDelete.addEventListener("click", () => {
        li.remove();
        let res = taskArray.findIndex(elem => elem.id === li.dataset.id)
        taskArray.splice(res, 1);
        localStorage.setItem("tasks", JSON.stringify(taskArray));
        outNumberTasks.textContent = `${taskArray.length}`;
    });

    buttonEdit.addEventListener("click", () => {
        text.setAttribute("contenteditable", "true");
        text.setAttribute("tabindex", "-1");
        text.focus();
    });

    text.addEventListener("blur", () => {
        text.setAttribute("contenteditable", "false")
        taskArray.forEach(function (elem) {
            if (elem.id === li.dataset.id) elem.value = text.textContent;
        })
        localStorage.setItem("tasks", JSON.stringify(taskArray));
        outNumberTasks.textContent = `${taskArray.length}`;
    });

    text.addEventListener("click", () => {
        text.classList.toggle("active");
        if (li.dataset.status === "active") {
            li.dataset.status = "complete";
            taskArray.forEach(function (elem) {
                if (elem.id === li.dataset.id) return elem.status = false;
            })
            localStorage.setItem("tasks", JSON.stringify(taskArray));
        } else {
            li.dataset.status = "active";
            taskArray.forEach(function (elem) {
                if (elem.id === li.dataset.id) return elem.status = true;
            })
            localStorage.setItem("tasks", JSON.stringify(taskArray));
        }
    });

    text.addEventListener("keydown", function (event) {
        if (event.keyCode === SEQUENCE_NUMBER_ENTER) text.blur();
    });
}

btnClearList.addEventListener("click", () => {
    taskList.innerHTML = '';
    taskArray = [];
    localStorage.setItem("tasks", JSON.stringify(taskArray));
    outNumberTasks.textContent = `${taskArray.length}`;
});

btnClearCompleted.addEventListener("click", () => {
    for (let i = taskList.children.length - 1; i >= 0; i--) {
        if (taskList.children[i].dataset.status === "complete") taskList.children[i].remove();
        taskArray = taskArray.filter(function (elem) {
            if (elem.status) return true
        })
    }
    localStorage.setItem("tasks", JSON.stringify(taskArray));
    console.log(taskArray.length)
    outNumberTasks.textContent = `${taskArray.length}`;
});

btnSortAll.addEventListener("click", () => {
    for (let i = taskList.children.length - 1; i >= 0; i--) {
        taskList.children[i].style.display = "flex"
    }
});

btnSortActive.addEventListener("click", () => {
    for (let i = taskList.children.length - 1; i >= 0; i--) {
        taskList.children[i].dataset.status === "active" ? taskList.children[i].style.display = "flex" : taskList.children[i].style.display = "none"
    }
});

btnSortComplete.addEventListener("click", () => {
    for (let i = taskList.children.length - 1; i >= 0; i--) {
        taskList.children[i].dataset.status === "complete" ? taskList.children[i].style.display = "flex" : taskList.children[i].style.display = "none"
    }
});

