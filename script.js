"use strict";

const inputTask = document.querySelector(".task-input");
const btnAdd = document.querySelector(".btn-add");
const taskList = document.querySelector(".tasks-list");
const tasks = document.querySelectorAll(".tasks-list-item");
const taskContainer = document.querySelector(".task-container");

const getItemLocalStorage = function () {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  console.log(tasks);
  //   tasks.forEach((task) => {
  //     let markup = `
  //       <div class='task-container'>
  //       <li class="tasks-list-item">${task}</li>
  //       <ion-icon class='icon' name="close-outline"></ion-icon>
  //       </div>
  //         `;
  //     taskList.insertAdjacentHTML("beforeend", markup);
  //   });
};
getItemLocalStorage();
const addTask = function () {
  const taskName = inputTask.value;

  if (!taskName) alert("Okno nie może być puste!");
  else {
    let markup = `
    <div class='task-container'>
    <li class="tasks-list-item">${taskName}</li>
    <ion-icon class='icon' name="close-outline"></ion-icon>
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
