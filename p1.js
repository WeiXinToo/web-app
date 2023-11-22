// Make these variable accessible globally

const data = JSON.parse(localStorage.getItem('time-data')) || {
  startTime: undefined,
  stopTime: undefined,
  pauseTime:0,
  timerStatus:false,
  hr:0,
  min:0,
  sec:0,
  intervalID:undefined
}


//save data to local storage
function saveData() {
  localStorage.setItem('time-data', JSON.stringify(data));
}


//get button element
const startButtonElement = document.querySelector('.js-start-button');
const stopButtonElement = document.querySelector('.js-stop-button');
const resetButtonElement = document.querySelector('.js-reset-button');

function handleButtonClick(action) {
  action();
  saveData();
}

//add click event listener to buttons
startButtonElement.addEventListener('click', () => {
  handleButtonClick(startTimer);
  
});

stopButtonElement.addEventListener('click', () => {
  handleButtonClick(stopTimer);
  
});

resetButtonElement.addEventListener('click', () => {
  handleButtonClick(resetTimer);
  
})

//start timer function
function startTimer(){
  if (!data.timerStatus){
    data.timerStatus = true;
    data.startTime = new Date() - data.pauseTime;
    
    updateTimerDisplay();
    data.pauseTime = 0;

  }
  else{
    alert('The timer has started!');
  }
}

//stop timer function
function stopTimer() {
  if (data.timerStatus) {
    data.stopTime = new Date();
    data.timerStatus = false;
    data.pauseTime = data.stopTime - data.startTime;
    clearInterval(data.intervalID);
  }
  else {
    alert("This timer hasn't started or stopped yet.");
  }
}

//reset the timer
function resetTimer() {
  data.timerStatus = false;
  clearInterval(data.intervalID);
  data.startTime = undefined;
  data.stopTime = undefined;
  data.pauseTime = 0;
  data.hr = 0;
  data.min= 0;
  data.sec= 0;
  data.count= 0;
  divElement.textContent = '00:00:00';
  alert('Your timer is reset!');
}


//get paragraph element
const divElement = document.querySelector('.js-timer-count');

//format time
function formatTime() {
  data.pauseTime = Date.now() - data.startTime;
  data.hr = String(Math.floor(data.pauseTime/(3600*1000))).padStart(2, '0'); 
  data.min = String(Math.floor((data.pauseTime % (3600*1000))/ (60*1000))).padStart(2, '0');
  data.sec = String(Math.floor(((data.pauseTime) % (60*1000)) / 1000)).padStart(2, '0');
  //data.count = String(Math.floor(data.pauseTime % 1000)).padStart(2, '0');
  divElement.textContent = `
  ${data.hr}:${data.min}:${data.sec}`;
}

function updateTimerDisplay(){
  
  data.intervalID = setInterval(()=> formatTime(), 75);
}
