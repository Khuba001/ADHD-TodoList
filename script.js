"use strict";

const inputTask = document.querySelector(".task-input");
const btnAdd = document.querySelector(".btn-add");
const taskList = document.querySelector(".tasks-list");
const tasks = document.querySelectorAll(".tasks-list-item");
const taskContainer = document.querySelector(".task-container");

const dateCurrent = document.querySelector(".welcome-span");
const timeCurrent = document.querySelector(".time-now");

const leftSide = document.querySelector(".nav");
const rightSide = document.querySelector(".calendar");

const calendarYear = document.querySelector(".calendar-date");
const calendarMonth = document.querySelector(".calendar-month");
const datesElement = document.querySelector(".dates");
const prevBtn = document.querySelector(".icon-left");
const nextBtn = document.querySelector(".icon-right");

let now;

const addTask = function () {
  const taskName = inputTask.value;

  if (!taskName) alert("Okno nie może być puste!");
  else {
    let markup = `
    <div class='task-container'>
    <li class="tasks-list-item" draggable='true'>${taskName}<span class='task-after'></span></li>
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
  if (e.target.classList.contains("task-after")) {
    console.log(e.target);
    const el = e.target.closest(".tasks-list-item");
    el.classList.toggle("tasks-list-item-finished");
    e.target.classList.toggle("task-after-finished");
  }
});

const currentDateDisplay = function () {
  now = new Date();
  const day = String(now.getDate()).padStart(2, "0");
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const year = now.getFullYear();
  const hour = String(now.getHours()).padStart(2, "0");
  const minute = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");

  dateCurrent.textContent = `${day}/${month}/${year}`;
  timeCurrent.textContent = `${hour}:${minute}:${seconds}`;
};
let beignDragged;

taskList.addEventListener("dragstart", (e) => {
  if (e.target.classList.contains("tasks-list-item")) {
    beignDragged = e.target;
    console.log(beignDragged);
  }
});

leftSide.addEventListener("dragover", (e) => {
  e.preventDefault();
});

leftSide.addEventListener("drop", (e) => {
  e.preventDefault();
  if (beignDragged) {
    beignDragged.remove();
    beignDragged;
  }
});

rightSide.addEventListener("dragover", (e) => e.preventDefault());

rightSide.addEventListener("drop", function () {
  e.preventDefault();
  if (beignDragged) {
    beignDragged.remove();
    beignDragged;
  }
});

currentDateDisplay();

setInterval(currentDateDisplay, 1000);

// CALENDAR FUNCTIONS

const updateCalendar = function () {
  now = new Date();
  const month = now.getMonth() + 1;
  const year = now.getFullYear();

  const firstDay = new Date(year, month, 0);
  const lastDay = new Date(year, month + 1, 0);
  const totalDays = lastDay.getDate();
  const firstDayIndex = firstDay.getDay();
  const lastDayIndex = lastDay.getDay();

  const monthString = now.toLocaleDateString("default", {
    month: "long",
  });

  const yearString = now.toLocaleDateString("default", {
    year: "numeric",
  });

  calendarMonth.textContent = monthString;
  calendarYear.textContent = yearString;

  let datesHTML = "";
  for (let i = firstDayIndex; i > 0; i--) {
    const prevDate = new Date(year, month, 0 - i + 1);
    datesHTML += `<div class="date inactive">${prevDate.getDate()}</div>`;
  }
  for (let i = 1; i <= totalDays; i++) {
    const date = new Date(year, month, i);
    const activeClass =
      date.toDateString() === new Date().toDateString ? "active" : "";
    datesHTML += `<div class="date ${activeClass}">${i}</div>`;
  }
  for (let i = 1; i <= 7 - lastDayIndex; i++) {
    const nextDate = new Date(year, month + 1, i);
    datesHTML += `<div class='date inactive'>${nextDate.getDate()}</div>`;
  }
  datesElement.innerHTML = datesHTML;
};

prevBtn.addEventListener("click", () => {
  now.setMonth(now.getMonth() - 1);
  updateCalendar();
});

nextBtn.addEventListener("click", () => {
  now.setMonth(now.getMonth() + 1);
  updateCalendar();
});

updateCalendar();
