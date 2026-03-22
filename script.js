const addBtn = document.getElementById("add-btn");
const taskInput = document.getElementById("task-input");
const dueDateInput = document.getElementById("due-date");
const todoList = document.getElementById("todo-list");
const completedList = document.getElementById("completed-list");

addBtn.addEventListener("click", function() {
  const taskText = taskInput.value.trim();
  const dueDate = dueDateInput.value;

  if (taskText === "") {
    alert("Tugas tidak boleh kosong!");
    return;
  }

  const li = document.createElement("li");

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";

  const span = document.createElement("span");
  span.textContent = taskText;

  const dueSpan = document.createElement("span");
  dueSpan.className = "due";
  dueSpan.textContent = dueDate ? `Due: ${dueDate}` : "";

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Hapus";
  deleteBtn.className = "delete-btn";

  deleteBtn.addEventListener("click", function() {
    li.remove();
  });

  checkbox.addEventListener("change", function() {
    if (checkbox.checked) {
      completedList.appendChild(li);
    } else {
      todoList.appendChild(li);
    }
  });

  li.appendChild(checkbox);
  li.appendChild(span);
  li.appendChild(dueSpan);
  li.appendChild(deleteBtn);

  todoList.appendChild(li);

  taskInput.value = "";
  dueDateInput.value = "";
});
