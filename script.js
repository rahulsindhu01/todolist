const InputBox = document.getElementById("input-box");
const ListContainer = document.getElementById("listContainer");

function addTask() {
  if (InputBox.value === '') {
    alert("You must write something");
  } else {
    let li = document.createElement("li");
    li.innerHTML = InputBox.value;
    ListContainer.appendChild(li);
    let span = document.createElement("span");
    span.innerHTML = "\u00d7";
    li.appendChild(span);
  }
  InputBox.value = "";
  saveData();
}

ListContainer.addEventListener("click", function (e) {
  if (e.target.tagName === 'LI') {
    e.target.classList.toggle("checked");
    saveData();
  } else if (e.target.tagName === "SPAN") {
    e.target.parentElement.remove();
    saveData();
  }
}, false);

function saveData() {
  localStorage.setItem("data", ListContainer.innerHTML);
}

function showTask() {
  ListContainer.innerHTML = localStorage.getItem("data");
}
showTask();

let timer;
let focusMinutes = 25;
let restMinutes = 5;
let seconds = 0;
let timerStarted = false;

function startTimer() {
  if (!timerStarted) {
    timerStarted = true;
    // Check if custom durations are set, otherwise use default values
    if (focusMinutes === 0 && restMinutes === 0) {
      focusMinutes = parseInt(document.getElementById('focus-duration').value, 10) || 25;
      restMinutes = parseInt(document.getElementById('rest-duration').value, 10) || 5;
    }
    // Check if the timer has already started; if yes, use the existing durations
    if (minutes === 0 && seconds === 0) {
      minutes = focusMinutes;
      seconds = 0;
    }
    timer = setInterval(updateTimer, 1000);
  }
}

function pauseTimer() {
  clearInterval(timer);
  timerStarted = false;
}

function resetTimer() {
  clearInterval(timer);
  timerStarted = false;
  focusMinutes = parseInt(document.getElementById('focus-duration').value, 10) || 25;
  restMinutes = parseInt(document.getElementById('rest-duration').value, 10) || 5;
  minutes = focusMinutes;
  seconds = 0;
  updateDisplay();
}

function updateTimer() {
  if (minutes === 0 && seconds === 0) {
    clearInterval(timer);
    timerStarted = false;
    alert("Pomodoro completed!");
  } else {
    if (seconds === 0) {
      if (minutes > 0) {
        minutes--;
      } else if (restMinutes > 0) {
        restMinutes--;
      }
      seconds = 59;
    } else {
      seconds--;
    }
    updateDisplay();
  }
}

function updateDisplay() {
  const formattedMinutes = (minutes > 0) ? minutes : restMinutes;
  const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
  document.getElementById('timer').innerText = `${formattedMinutes}:${formattedSeconds}`;
}
