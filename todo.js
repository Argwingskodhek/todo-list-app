const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

function addTask() {
  if (inputBox.value === "") {
    alert("You MUST write something!");
  } else {
    const taskText = inputBox.value;
    createTaskElement(taskText);
    saveData();
  }
  inputBox.value = "";
}

function createTaskElement(text) {
  const li = document.createElement("li");
  li.innerHTML = text;
  listContainer.appendChild(li);
  const span = document.createElement("span");
  span.innerHTML = "\u00d7"; // Cross icon
  li.appendChild(span);
}

function toggleTaskStatus(element) {
  if (element.tagName === "LI") {
    element.classList.toggle("checked");
  } else if (element.tagName === "SPAN") {
    element.parentElement.remove();
  }
}

listContainer.addEventListener("click", function (e) {
  toggleTaskStatus(e.target);
  saveData();
});

function saveData() {
  try {
    localStorage.setItem("data", listContainer.innerHTML);
  } catch (error) {
    console.error("Error saving data to localStorage:", error.message);
    alert("Error saving data. Please try again.");
  }
}

function displayTasks() {
  try {
    listContainer.innerHTML = localStorage.getItem("data") || "";
  } catch (error) {
    console.error("Error loading data from localStorage:", error.message);
    alert("Error loading data. Please try again.");
  }
}

// Display tasks on page load
displayTasks();

