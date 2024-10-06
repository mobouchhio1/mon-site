var taskList = document.getElementById("taskList");
var currentTask = null;

function addTask() {
    var taskInput = document.getElementById("taskInput");
    var taskText = taskInput.value;

    if (taskText === "") {
        return; // Ne rien faire si le champ est vide
    }

    var li = document.createElement("li");
    li.className = "list-group-item";
    li.innerHTML = taskText;

    var editButton = document.createElement("button");
    editButton.className = "btn btn-warning btn-sm mx-2";
    editButton.innerHTML = '<ion-icon name="pencil-outline" class="modify"></ion-icon>';
    editButton.onclick = function() {
        editTask(li);
    };

    var deleteButton = document.createElement("button");
    deleteButton.className = "btn btn-danger btn-sm";
    deleteButton.innerHTML = '<ion-icon name="trash-outline" class="delete"></ion-icon>';
    deleteButton.onclick = function() {
        deleteTask(li);
    };

    li.appendChild(editButton);
    li.appendChild(deleteButton);
    taskList.appendChild(li);

    taskInput.value = "";

    showAlert("Tâche ajoutée avec succès!", "success");
    updateProgressBar();
}

function editTask(task) {
    currentTask = task;
    var taskText = task.firstChild.textContent;
    document.getElementById("editTaskInput").value = taskText;
    var editModal = new bootstrap.Modal(document.getElementById('editModal'));
    editModal.show();
}

function saveTaskEdit() {
    var newTaskText = document.getElementById("editTaskInput").value;
    if (newTaskText !== "") {
        currentTask.firstChild.textContent = newTaskText;
    }
    updateProgressBar();
    var editModal = bootstrap.Modal.getInstance(document.getElementById('editModal'));
    editModal.hide();
}

function deleteTask(task) {
    taskList.removeChild(task);
    showAlert("Tâche supprimée!", "danger");
    updateProgressBar();
}

function showAlert(message, type) {
    var alertContainer = document.getElementById("alert-container");
    var alert = document.createElement("div");
    alert.className = `alert alert-${type}`;
    alert.innerText = message;

    alertContainer.appendChild(alert);

    // Faire disparaître l'alerte après 3 secondes
    setTimeout(function() {
        alert.remove();
    }, 3000);
}

function updateProgressBar() {
    var tasks = document.querySelectorAll("#taskList li");
    var completedTasks = document.querySelectorAll("#taskList li.completed");

    var progress = tasks.length ? (completedTasks.length / tasks.length) * 100 : 0;
    var progressBar = document.getElementById("progress-bar");

    progressBar.style.width = progress + "%";
    progressBar.setAttribute("aria-valuenow", progress);
    progressBar.innerText = Math.round(progress) + "%";
}
