const form = document.body.querySelector('form');
const taskList = document.querySelector('#taskList');
const textInput = document.querySelector('.inputText');
const btnClearList = document.querySelector('#btnClearList');
const btnClearCompleted = document.querySelector('#btnClearCompleted');
const selectTypeTask = document.querySelector('#selectTypeTask');
const outNumberTasks = document.querySelector('#outNumberTasks');
const SEQUENCE_NUMBER_ENTER = 13;
const ACTIVE_STATUS = "active";
const COMPLETE_STATUS = "complete"

let taskArray = [];

(function loadToWeb() {
    let newArr = JSON.parse(localStorage.getItem("tasks"))
    for (let elem of newArr) {
        if (elem.status) {
            createTask(elem.id, ACTIVE_STATUS, elem.value);
        } else {
            createTask(elem.id, COMPLETE_STATUS, elem.value)
        }
    }
})()

form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!textInput.value) return;
    let inpText = textInput.value;
    createTask(randomToken(), ACTIVE_STATUS, inpText);
});

function randomToken() {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

function createTask(id, status, text) {
    const li = document.createElement("li");
    const divText = document.createElement("div");
    const buttonDelete = document.createElement("button");
    const buttonEdit = document.createElement("button");
    buttonEdit.className = "taskButton btnEdit";
    buttonDelete.className = "taskButton btnDelete";
    divText.className = "taskText";
    buttonEdit.textContent = "Edit";
    buttonDelete.textContent = "Delete";
    li.className = "tasks";
    li.setAttribute("data-status", status);
    li.setAttribute("data-id", id);
    divText.textContent = text;
    textInput.value = "";
    li.append(divText);
    li.append(buttonEdit);
    li.append(buttonDelete);
    taskList.append(li);
    taskList.style.visibility = "visible";
    taskArray.push({id: li.dataset.id, status: li.dataset.status === "active", value: divText.textContent});
    localStorage.setItem("tasks", JSON.stringify(taskArray));
    outNumberTasks.textContent = `${taskArray.length}`;
    addListener(buttonDelete, buttonEdit, divText, li);
}

function addListener(buttonDelete, buttonEdit, divText, li) {

    buttonDelete.addEventListener("click", () => {
        li.remove();
        taskArray.forEach(function (elem, index) {
            if (elem.id === li.dataset.id) taskArray.splice(index, 1);
        });
        localStorage.setItem("tasks", JSON.stringify(taskArray));
        outNumberTasks.textContent = `${taskArray.length}`;
    });

    buttonEdit.addEventListener("click", () => {
        divText.setAttribute("contenteditable", "true");
        divText.setAttribute("tabindex", "-1");
        divText.focus();
    });

    divText.addEventListener("blur", () => {
        divText.setAttribute("contenteditable", "false")
        taskArray.forEach(function (elem) {
            if (elem.id === li.dataset.id) return elem.value = divText.textContent;
        })
        localStorage.setItem("tasks", JSON.stringify(taskArray));
        outNumberTasks.textContent = `${taskArray.length}`;
    });

    divText.addEventListener("click", () => {
        divText.classList.toggle("active");
        if (li.dataset.status === "active") {
            li.dataset.status = "complete";
            taskArray.forEach(function (elem) {
                if (elem.id === li.dataset.id) return elem.status = false;
            })
            localStorage.setItem("tasks", JSON.stringify(taskArray));
            outNumberTasks.textContent = `${taskArray.length - 1}`;
        } else {
            li.dataset.status = "active";
            taskArray.forEach(function (elem) {
                if (elem.id === li.dataset.id) return elem.status = true;
            })
            localStorage.setItem("tasks", JSON.stringify(taskArray));
            outNumberTasks.textContent = `${taskArray.length}`;
        }
    });

    divText.addEventListener("keydown", function (event) {
        if (event.keyCode === SEQUENCE_NUMBER_ENTER) divText.blur();
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
        taskArray.forEach(function (elem, index) {
            if (!elem.status) taskArray.splice(index, 1);
        })
    }
    localStorage.setItem("tasks", JSON.stringify(taskArray));
    console.log(taskArray.length)
    outNumberTasks.textContent = `${taskArray.length}`;
});

selectTypeTask.addEventListener("change", () => {
    switch (selectTypeTask.selectedIndex) {
        case 0 :
            for (let i = taskList.children.length - 1; i >= 0; i--) {
                taskList.children[i].style.display = "flex"
            }
            break;
        case 1 :
            for (let i = taskList.children.length - 1; i >= 0; i--) {
                if (taskList.children[i].dataset.status === "active") {
                    taskList.children[i].style.display = "flex"
                } else {
                    taskList.children[i].style.display = "none"
                }
            }
            break;
        case 2 :
            for (let i = taskList.children.length - 1; i >= 0; i--) {
                if (taskList.children[i].dataset.status === "complete") {
                    taskList.children[i].style.display = "flex"
                } else {
                    taskList.children[i].style.display = "none"
                }
            }
            break;
        default:
            for (let i = taskList.children.length - 1; i >= 0; i--) {
                taskList.children[i].style.display = "flex"
            }
    }
});
