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
const taskByDay = JSON.parse(localStorage.getItem("taskByDay")) || {};
let selectedDate = now.toISOString().split("T")[0];

const addTask = function () {
  const task = {
    name: inputTask.value,
    isFinished: false,
  };

  if (!task.name) alert("Okno nie może być puste!");
  else {
    if (!taskByDay[selectedDate]) {
      taskByDay[selectedDate] = [];
    }
    taskByDay[selectedDate].push(task);
    localStorage.setItem("taskByDay", JSON.stringify(taskByDay));
    renderTasks(selectedDate);
    inputTask.value = "";
  }
};

btnAdd.addEventListener("click", (e) => {
  e.preventDefault();
  addTask();
});

const checkFinished = function (date) {
  if (taskByDay[date]) return taskByDay[date].every((task) => task.isFinished);
  else {
    return false;
  }
};

const updateFinishedCalendar = function () {
  if (checkFinished(selectedDate)) {
    document.querySelectorAll(".date").forEach((date) => {
      if (date.getAttribute("date-data") === selectedDate) {
        date.classList.add("all-tasks-finished");
      }
    });
  } else {
    document.querySelectorAll(".date").forEach((date) => {
      if (date.getAttribute("date-data") === selectedDate) {
        date.classList.remove("all-tasks-finished");
      }
    });
  }
};

const renderTasks = function (date) {
  taskList.innerHTML = "";
  if (taskByDay[date]) {
    taskByDay[date].forEach((task) => {
      if (task.isFinished === true) {
        let markup = `
      <div class='task-container'>
      <li class="tasks-list-item tasks-list-item-finished" draggable='true'>${task.name}<span class='task-after task-after-finished'></span></li>
      </div>
        `;
        taskList.insertAdjacentHTML("beforeend", markup);
      } else {
        let markup = `
        <div class='task-container'>
        <li class="tasks-list-item" draggable='true'>${task.name}<span class='task-after'></span></li>
        </div>
        `;
        taskList.insertAdjacentHTML("beforeend", markup);
      }
      updateFinishedCalendar();
    });
  }
};

taskList.addEventListener("click", (e) => {
  if (e.target.classList.contains("task-after")) {
    const el = e.target.closest(".tasks-list-item");
    el.classList.toggle("tasks-list-item-finished");
    e.target.classList.toggle("task-after-finished");

    const taskName = el.textContent.trim();
    taskByDay[selectedDate].forEach((task) => {
      if (task.name === taskName) task.isFinished = !task.isFinished;
    });
    localStorage.setItem("taskByDay", JSON.stringify(taskByDay));
    updateFinishedCalendar();
  }
});

const currentDateDisplay = function (date) {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  dateCurrent.textContent = `${day}/${month}/${year}`;
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
    const taskName = beignDragged.textContent;
    taskByDay[selectedDate] = taskByDay[selectedDate].filter(
      (task) => task.name !== taskName
    );
    beignDragged.remove();
    localStorage.setItem("taskByDay", JSON.stringify(taskByDay));
    updateFinishedCalendar();
  }
});

rightSide.addEventListener("dragover", (e) => e.preventDefault());

rightSide.addEventListener("drop", function (e) {
  e.preventDefault();
  if (beignDragged) {
    const taskName = beignDragged.textContent;
    taskByDay[selectedDate] = taskByDay[selectedDate].filter(
      (task) => task.name !== taskName
    );
    beignDragged.remove();
    localStorage.setItem("taskByDay", JSON.stringify(taskByDay));
    updateFinishedCalendar();
  }
});

currentDateDisplay(now);

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
      datesElement.innerHTML += `<div class='date active' date-data='${year}-${String(
        month + 1
      ).padStart(2, "0")}-${String(i).padStart(2, "0")}'>${i}</div>`;
    } else {
      if (
        checkFinished(
          `${year}-${String(month + 1).padStart(2, "0")}-${String(i).padStart(
            2,
            "0"
          )}`
        )
      ) {
        datesElement.innerHTML += `<div class='date  all-tasks-finished' date-data='${year}-${String(
          month + 1
        ).padStart(2, "0")}-${String(i).padStart(2, "0")}'>${i}</div>`;
      } else {
        datesElement.innerHTML += `<div class='date' date-data='${year}-${String(
          month + 1
        ).padStart(2, "0")}-${String(i).padStart(2, "0")}'>${i}</div>`;
      }
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
renderTasks(selectedDate);
// DATES AND OTHER LISTS

datesElement.addEventListener("click", (e) => {
  if (e.target.classList.contains("date")) {
    selectedDate = e.target.getAttribute("date-data");

    renderTasks(selectedDate);

    document
      .querySelectorAll(".date")
      .forEach((date) => date.classList.remove("active"));
    e.target.classList.add("active");
  }
});

// fix kiedy sie wypelni wszystkie taski i usunie zadania to nadal jest zaznaczone jako ukonczone , prev i next month days tez zanazoncze
