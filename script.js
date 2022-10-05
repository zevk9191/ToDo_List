let taskList = document.getElementById('taskList')

function createTask (taskText) {
    let div = document.createElement("div");
    taskList.prepend(div);
    div.className = 'tasks'
    div.innerHTML = '<p>' + taskText + '</p>' + '<button class="taskButton"> Edit </button>' + '<button class="taskButton"> Delete </button>';
    taskList.style.visibility = 'visible'
}

// createTask('lorem100');

