class Task {
    constructor(name, description) {
      this.id = Date.now().toString(); 
      this.name = name;
      this.description = description;
      this.status = "pending"; 
    }
  }
  
  let tasks = [];
  
  const taskNameInput = document.getElementById("task-name");
  const taskDescriptionInput = document.getElementById("task-description");
  const addTaskBtn = document.getElementById("add-task-btn");
  const taskList = document.getElementById("tasks");
  const filterAllBtn = document.getElementById("filter-all");
  const filterCompletedBtn = document.getElementById("filter-completed");
  const filterPendingBtn = document.getElementById("filter-pending");
  
  document.addEventListener("DOMContentLoaded", () => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks = savedTasks;
    renderTasks(tasks);
  });
  
  addTaskBtn.addEventListener("click", () => {
    const taskName = taskNameInput.value.trim();
    const taskDescription = taskDescriptionInput.value.trim();
  
    if (!taskName) {
      alert("Task name cannot be empty!");
      return;
    }
  
    const newTask = new Task(taskName, taskDescription);
    tasks.push(newTask);
    saveTasksToLocalStorage();
    renderTasks(tasks);
    clearInputs();
  });
  
  function renderTasks(taskArray = tasks) {
    taskList.innerHTML = "";
  
    taskArray.forEach((task) => {
      const taskItem = document.createElement("li");
      taskItem.innerHTML = `
        <div class="task-header">
          <span class="task-name">${task.name}</span>
          <span class="task-status">${task.status}</span>
        </div>
        <div class="task-description">${task.description}</div>
        <div class="task-buttons">
          <button class="edit-btn" onclick="editTask('${task.id}')">Edit</button>
          <button class="delete-btn" onclick="deleteTask('${task.id}')">Delete</button>
          <button class="toggle-btn" onclick="toggleStatus('${task.id}')">
            ${task.status === "pending" ? "Mark Completed" : "Mark Pending"}
          </button>
        </div>
      `;
      taskList.appendChild(taskItem);
    });
  }
  
  function editTask(taskId) {
    const task = tasks.find((task) => task.id === taskId);
    if (!task) return;
  
    const newName = prompt("Enter new task name:", task.name);
    const newDescription = prompt("Enter new task description:", task.description);
  
    if (newName !== null && newName.trim() !== "") {
      task.name = newName.trim();
    }
    if (newDescription !== null) {
      task.description = newDescription.trim();
    }
  
    saveTasksToLocalStorage();
    renderTasks(tasks);
  }
  
  function deleteTask(taskId) {
    tasks = tasks.filter((task) => task.id !== taskId);
    saveTasksToLocalStorage();
    renderTasks(tasks);
  }
  
  function toggleStatus(taskId) {
    const task = tasks.find((task) => task.id === taskId);
    if (!task) return;
  
    task.status = task.status === "pending" ? "completed" : "pending";
    saveTasksToLocalStorage();
    renderTasks(tasks);
  }
  
  filterAllBtn.addEventListener("click", () => renderTasks(tasks));
  filterCompletedBtn.addEventListener("click", () => {
    const completedTasks = tasks.filter((task) => task.status === "completed");
    renderTasks(completedTasks);
  });
  filterPendingBtn.addEventListener("click", () => {
    const pendingTasks = tasks.filter((task) => task.status === "pending");
    renderTasks(pendingTasks);
  });
  
  function saveTasksToLocalStorage() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
  
  function clearInputs() {
    taskNameInput.value = "";
    taskDescriptionInput.value = "";
  }