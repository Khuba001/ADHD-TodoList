"use strict";

const inputTask = document.querySelector(".task-input");
const btnAdd = document.querySelector(".btn-add");
const taskList = document.querySelector(".tasks-list");
const tasks = document.querySelectorAll(".tasks-list-item");
const taskContainer = document.querySelector(".task-container");

const dateCurrent = document.querySelector(".welcome-span");

const addTask = function () {
  const taskName = inputTask.value;

  if (!taskName) alert("Okno nie może być puste!");
  else {
    let markup = `
    <div class='task-container'>
    <li class="tasks-list-item">${taskName}</li>
    </div>
      `;

    localStorage.setItem("tasks", JSON.stringify(taskName));
    taskList.insertAdjacentHTML("beforeend", markup);
  }
};

btnAdd.addEventListener("click", (e) => {
  e.preventDefault();
  addTask();
  inputTask.value = "";
});

taskList.addEventListener("click", (e) => {
  if (e.target.classList.contains("tasks-list-item")) {
    e.target.classList.toggle("tasks-list-item-finished");
    // e.target.style.backgroundColor = "blue";
  }
  if (e.target.classList.contains("icon")) {
    const clickedContainer = e.target.closest(".task-container");
    if (clickedContainer) {
      clickedContainer.remove();
    }
  }
});

const currentDateDisplay = function () {
  const now = new Date();
  const day = String(now.getDate()).padStart(2, "0");
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const year = now.getFullYear();
  const hour = String(now.getHours()).padStart(2, "0");
  const minute = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");

  dateCurrent.textContent = `${day}/${month}/${year}`;
};

currentDateDisplay();

setInterval(currentDateDisplay, 1000);
