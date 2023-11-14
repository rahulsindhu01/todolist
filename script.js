const InputBox = document.getElementById("input-box");

const ListContainer = document.getElementById("listContainer");


function addTask(){
    if(InputBox.value === ''){
        alert("You must write something");
    }
    else{
        let li = document.createElement("li")
        li.innerHTML = InputBox.value;
        ListContainer.appendChild(li);
        let span = document.createElement("span");
        span.innerHTML = "\u00d7"
        li.appendChild(span)
    }
    InputBox.value = "";
    saveData();
}

ListContainer.addEventListener("click", function(e){
    if(e.target.tagName === 'LI'){
        e.target.classList.toggle("checked");
        saveData();
    }
    else if(e.target.tagName === "SPAN"){
        e.target.parentElement.remove();
        saveData();
    }
}, false);



function saveData(){
    localStorage.setItem("data", ListContainer.innerHTML)

}

function showTask(){
    ListContainer.innerHTML = localStorage.getItem("data");
}
showTask();






let timer;
let minutes = 50;
let seconds = 0;
let timerStarted = false;

function startTimer() {
  if (!timerStarted) {
    timerStarted = true;
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
  minutes = 50;
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
      minutes--;
      seconds = 59;
    } else {
      seconds--;
    }
    updateDisplay();
  }
}

function updateDisplay() {
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
  document.getElementById('timer').innerText = `${formattedMinutes}:${formattedSeconds}`;
}
