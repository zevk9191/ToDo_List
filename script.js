let form = document.body.querySelector('form')
let taskList = document.getElementById('taskList')
let textInput = document.querySelector('.inputText')

form.addEventListener("click", createTask)

function createTask(event) {
    event.preventDefault()
    let div = document.createElement("div");
    let divText = document.createElement("div");
    let input = document.createElement("input");
    let buttonDelete = document.createElement("button");
    let buttonEdit = document.createElement("button");
    input.setAttribute('type', 'checkbox');
    buttonEdit.className = 'taskButton btnEdit';
    buttonDelete.className = 'taskButton btnDelete';
    divText.className = 'taskText'
    buttonEdit.textContent = 'Edit';
    buttonDelete.textContent = 'Delete';
    if (textInput.value == '' || null || undefined) {
        return
    } else {
        divText.textContent = textInput.value
        textInput.value = '';
    }
    div.className = 'tasks';
    div.append(input);
    div.append(divText);
    div.append(buttonEdit);
    div.append(buttonDelete);
    taskList.append(div);
    taskList.style.visibility = 'visible'
    buttonDelete.addEventListener("click", () => {
        div.remove()
    })
    buttonEdit.addEventListener("click", () => {
        divText.setAttribute('contenteditable', 'true')
        divText.setAttribute('tabindex', '-1')
        divText.focus();
        divText.onblur = function () {
            divText.setAttribute('contenteditable', 'false')
        }
    })
    divText.addEventListener('keydown', function (event) {
        if (event.keyCode === 13) {
            divText.blur()
        }
    })
    input.addEventListener("click", function () {
        divText.classList.toggle('active');
    })
}

