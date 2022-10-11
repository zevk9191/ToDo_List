const form = document.body.querySelector('form');
const taskList = document.querySelector('#taskList');
const textInput = document.querySelector('.inputText');
const btnClearList = document.querySelector('#btnClearList');
const btnClearCompleted = document.querySelector('#btnClearCompleted');
const selectTypeTask = document.querySelector('#selectTypeTask');
const outNumberTasks = document.querySelector('#outNumberTasks');
const SEQUENCENUMBERENTER = 13;

form.addEventListener("submit", createTask);

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
    li.setAttribute("data-status", "active")
    if (textInput.value === '') {
        return
    }
    divText.textContent = textInput.value
    textInput.value = '';
    li.append(divText);
    li.append(buttonEdit);
    li.append(buttonDelete);
    taskList.append(li);
    taskList.style.visibility = "visible";
    buttonDelete.addEventListener("click", () => {
        li.remove()
    });
    buttonEdit.addEventListener("click", () => {
        divText.setAttribute("contenteditable", "true");
        divText.setAttribute("tabindex", "-1");
        divText.focus();
    });

    divText.addEventListener("blur", () => {
        divText.setAttribute("contenteditable", 'false')
    });

    divText.addEventListener("click", () => {
        divText.classList.toggle("active");
        // outNumberTasks.textContent = document.getElementsByClassName("active").length;
        // li.classList.toggle("active");
        if (li.dataset.status === "active") {
            li.dataset.status = "complete";
            // outNumberTasks.textContent += "1";
        } else {
            li.dataset.status = "active";
        }
    });

    divText.addEventListener("keydown", function (event) {
        if (event.keyCode === SEQUENCENUMBERENTER) {
            divText.blur();
        }
    });
    divText.addEventListener("click", () => {
        for (let i = taskList.children.length - 1; i >= 0; i--) {
            if (taskList.children[i].dataset.status === "active") {
                outNumberTasks.textContent = taskList.children.length;
            }
        }
    });
}

btnClearList.addEventListener("click", () => {
    taskList.innerHTML = '';
});

btnClearCompleted.addEventListener("click", () => {
    for (let i = taskList.children.length - 1; i >= 0; i--) {
        if (taskList.children[i].dataset.status === "complete") {
            taskList.children[i].remove()
        }
    }
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
