const addBtn = document.getElementById("add-btn");
const taskInput = document.getElementById("task-input");
const dueDateInput = document.getElementById("due-date");
const todoList = document.getElementById("todo-list");
const completedList = document.getElementById("completed-list");

// Simpan data ke localStorage
function saveData() {
  const todos = [];
  document.querySelectorAll("#todo-list li").forEach(li => {
    todos.push({
      text: li.querySelector("span").textContent,
      due: li.querySelector(".due").textContent,
      completed: false
    });
  });

  const completed = [];
  document.querySelectorAll("#completed-list li").forEach(li => {
    completed.push({
      text: li.querySelector("span").textContent,
      due: li.querySelector(".due").textContent,
      completed: true
    });
  });

  localStorage.setItem("todos", JSON.stringify({todos, completed}));
}

// Load data dari localStorage
function loadData() {
  const data = JSON.parse(localStorage.getItem("todos"));
  if (!data) return;

  data.todos.forEach(item => createTask(item.text, item.due, false));
  data.completed.forEach(item => createTask(item.text, item.due, true));
}

// Buat task baru
function createTask(taskText, dueDate, isCompleted) {
  const li = document.createElement("li");

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = isCompleted;

  const span = document.createElement("span");
  span.textContent = taskText;

  const dueSpan = document.createElement("span");
  dueSpan.className = "due";
  dueSpan.textContent = dueDate;

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Hapus";
  deleteBtn.className = "delete-btn";

  deleteBtn.addEventListener("click", function() {
    li.remove();
    saveData();
  });

  checkbox.addEventListener("change", function() {
    if (checkbox.checked) {
      completedList.appendChild(li);
    } else {
      todoList.appendChild(li);
    }
    saveData();
  });

  li.appendChild(checkbox);
  li.appendChild(span);
  li.appendChild(dueSpan);
  li.appendChild(deleteBtn);

  if (isCompleted) {
    completedList.appendChild(li);
  } else {
    todoList.appendChild(li);
  }
}

// Event tombol tambah
addBtn.addEventListener("click", function() {
  const taskText = taskInput.value.trim();
  const dueDate = dueDateInput.value ? `Due: ${dueDateInput.value}` : "";

  if (taskText === "") {
    alert("Tugas tidak boleh kosong!");
    return;
  }

  createTask(taskText, dueDate, false);

  taskInput.value = "";
  dueDateInput.value = "";

  saveData();
});

// Jalankan saat halaman dibuka
loadData();
