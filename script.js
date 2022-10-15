const form = document.body.querySelector('form');
const taskList = document.querySelector('#taskList');
const textInput = document.querySelector('.inputText');
const btnClearList = document.querySelector('#btnClearList');
const btnClearCompleted = document.querySelector('#btnClearCompleted');
const selectTypeTask = document.querySelector('#selectTypeTask');
const outNumberTasks = document.querySelector('#outNumberTasks');
const SEQUENCE_NUMBER_ENTER = 13;
let taskArray = [];

form.addEventListener("submit", createTask);

function randomToken() {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

function createTask(event) {
    event.preventDefault();
    const li = document.createElement("li");
    const divText = document.createElement("div");
    const buttonDelete = document.createElement("button");
    const buttonEdit = document.createElement("button");
    buttonEdit.className = 'taskButton btnEdit';
    buttonDelete.className = 'taskButton btnDelete';
    divText.className = 'taskText';
    buttonEdit.textContent = 'Edit';
    buttonDelete.textContent = 'Delete';
    li.className = 'tasks';
    li.setAttribute("data-status", "active");
    li.setAttribute("data-id", randomToken());
    if (!textInput.value) return;
    divText.textContent = textInput.value
    textInput.value = '';
    li.append(divText);
    li.append(buttonEdit);
    li.append(buttonDelete);
    taskList.append(li);
    taskList.style.visibility = "visible";
    taskArray.push({id: li.dataset.id, status: li.dataset.status === "active", value: divText.textContent})
    localStorage.setItem("tasks", JSON.stringify(taskArray));

    buttonDelete.addEventListener("click", () => {
        li.remove();
        taskArray.forEach(function (elem) {
            if (elem.id === li.dataset.id) taskArray.splice(elem.length, 1);
        });
        localStorage.setItem("tasks", JSON.stringify(taskArray));
    });

    buttonEdit.addEventListener("click", () => {
        divText.setAttribute("contenteditable", "true");
        divText.setAttribute("tabindex", "-1");
        divText.focus();
    });

    divText.addEventListener("blur", () => {
        divText.setAttribute("contenteditable", 'false')
        taskArray.forEach(function (elem) {
            if (elem.id === li.dataset.id) return elem.value = divText.textContent;
        })
        localStorage.setItem("tasks", JSON.stringify(taskArray));
    });

    divText.addEventListener("click", () => {
        divText.classList.toggle("active");
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

    divText.addEventListener("keydown", function (event) {
        if (event.keyCode === SEQUENCE_NUMBER_ENTER) divText.blur();
    });

    divText.addEventListener("click", () => {
        for (let i = taskList.children.length - 1; i >= 0; i--) {
            if (taskList.children[i].dataset.status === "active") outNumberTasks.textContent = taskList.children.length;
        }
    });
}

btnClearList.addEventListener("click", () => {
    taskList.innerHTML = '';
    taskArray = [];
    localStorage.setItem("tasks", JSON.stringify(taskArray));
});

btnClearCompleted.addEventListener("click", () => {
    for (let i = taskList.children.length - 1; i >= 0; i--) {
        if (taskList.children[i].dataset.status === "complete") taskList.children[i].remove();
    }
    taskArray.forEach(function (elem) {
        if (elem.status) taskArray.splice(elem.length, 1);
    })
    localStorage.setItem("tasks", JSON.stringify(taskArray));
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
let newArr = JSON.parse(localStorage.getItem("tasks"));
// newArr.forEach(() => {
//     alert(newArr.length);
//     // alert(newArr[0].value);
// })