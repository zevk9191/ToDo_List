const form = document.body.querySelector('form');
const taskList = document.getElementById('taskList');
const textInput = document.querySelector('.inputText');
const SEQUENCENUMBERENTER = 13;

form.addEventListener("submit", createTask);

function createTask(event) {
    event.preventDefault();
    const div = document.createElement("div");
    const divText = document.createElement("div");
    const input = document.createElement("input");
    const buttonDelete = document.createElement("button");
    const buttonEdit = document.createElement("button");
    input.setAttribute('type', 'checkbox');
    buttonEdit.className = 'taskButton btnEdit';
    buttonDelete.className = 'taskButton btnDelete';
    divText.className = 'taskText';
    buttonEdit.textContent = 'Edit';
    buttonDelete.textContent = 'Delete';
    div.className = 'tasks';
    if (textInput.value === '') {
        return
    }
    divText.textContent = textInput.value
    textInput.value = '';
    div.append(input);
    div.append(divText);
    div.append(buttonEdit);
    div.append(buttonDelete);
    taskList.append(div);
    taskList.style.visibility = 'visible'
    buttonDelete.addEventListener("click", () => {
        div.remove()
    });
    buttonEdit.addEventListener("click", () => {
        divText.setAttribute('contenteditable', 'true');
        divText.setAttribute('tabindex', '-1');
        divText.focus();
    });

    divText.addEventListener("blur", () => {
        divText.setAttribute('contenteditable', 'false');
    });

    divText.addEventListener('keydown', function (event) {
        if (event.keyCode === SEQUENCENUMBERENTER) {
            divText.blur();
        }
    });
    input.addEventListener("click", function () {
        divText.classList.toggle('active');
    });
}