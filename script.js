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

let now = new Date();

const addTask = function (date) {
  const task = {
    name: inputTask.value,
    isFinished: false,
  };

  if (!task.name) alert("Okno nie może być puste!");
  else {
    let markup = `
    <div class='task-container'>
    <li class="tasks-list-item" draggable='true'>${task.name}<span class='task-after'></span></li>
    </div>
      `;

    localStorage.setItem("tasks", JSON.stringify(task.name));
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
    const el = e.target.closest(".tasks-list-item");
    el.classList.toggle("tasks-list-item-finished");
    e.target.classList.toggle("task-after-finished");
  }
});

const currentDateDisplay = function (date) {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  const hour = String(date.getHours()).padStart(2, "0");
  const minute = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  dateCurrent.textContent = `${day}/${month}/${year}`;
  timeCurrent.textContent = `${hour}:${minute}:${seconds}`;
};

let beignDragged;

taskList.addEventListener("dragstart", (e) => {
  if (e.target.classList.contains("tasks-list-item")) {
    beignDragged = e.target;
  }
});

leftSide.addEventListener("dragover", (e) => {
  e.preventDefault();
});

leftSide.addEventListener("drop", (e) => {
  e.preventDefault();
  if (beignDragged) {
    beignDragged.remove();
  }
});

rightSide.addEventListener("dragover", (e) => e.preventDefault());

rightSide.addEventListener("drop", function (e) {
  e.preventDefault();
  if (beignDragged) {
    beignDragged.remove();
  }
});

currentDateDisplay(now);
setInterval(() => currentDateDisplay(new Date()), 1000);

// CALENDAR FUNCTIONS

const updateCalendar = function (date) {
  const month = date.getMonth();
  const year = date.getFullYear();
  const day = new Date();
  const monthString = date.toLocaleDateString("default", {
    month: "long",
  });

  const yearString = date.toLocaleDateString("default", {
    year: "numeric",
  });

  // CURRENT MONTH
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const totalDays = lastDay.getDate();
  const firstDayIndex = firstDay.getDay();
  const lastDayIndex = lastDay.getDay();

  calendarYear.textContent = yearString;
  calendarMonth.textContent = monthString;
  datesElement.innerHTML = "";

  // Days from previous month to fill the first week
  const prevMonthLastDay = new Date(year, month, 0).getDate();
  for (let i = firstDayIndex - 1; i >= 0; i--) {
    datesElement.innerHTML += `<div class="date inactive">${
      prevMonthLastDay - i
    }</div>`;
  }

  // Days in current month
  for (let i = 1; i <= totalDays; i++) {
    if (
      i === day.getDate() &&
      year === day.getFullYear() &&
      month == day.getMonth()
    ) {
      datesElement.innerHTML += `<div class='date active'>${i}</div>`;
    } else {
      datesElement.innerHTML += `<div class='date'>${i}</div>`;
    }
  }

  // Days from next month to fill the last week
  for (let i = 1; i < 7 - lastDayIndex; i++) {
    datesElement.innerHTML += `<div class='date inactive'>${i}</div>`;
  }
};

prevBtn.addEventListener("click", function () {
  now.setMonth(now.getMonth() - 1);
  updateCalendar(now);
});

nextBtn.addEventListener("click", function () {
  now.setMonth(now.getMonth() + 1);
  updateCalendar(now);
});

updateCalendar(now);

// DATES AND OTHER LISTS

datesElement.addEventListener("click", (e) => {
  if (e.target.classList.contains("date")) {
    const selectedDate = e.target.dataset.date;
  }
});
