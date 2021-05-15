/**
 * Trying to create the Timer XD!
 */
const allTimeClasses = [
  ".time-hrs",
  ".time-minutes",
  ".time-seconds",
  ".time-milliseconds",
];
const timeHrs = document.querySelector(allTimeClasses[0]);
const timeMinutes = document.querySelector(allTimeClasses[1]);
const timeSeconds = document.querySelector(allTimeClasses[2]);
let hrs, minutes, seconds;
let interval;
let startTimer;
let totalSecs = 0;
function timerFun() {
  startTimer = new Date();
  interval = setInterval(() => {
    secondsFun();
    timeHrs.innerText = hrs < 10 ? `0${hrs}` : hrs;
    timeMinutes.innerText = minutes < 10 ? `0${minutes}` : minutes;
    timeSeconds.innerText = seconds < 10 ? `0${seconds}` : seconds;
  }, 500);
}
function secondsFun() {
  totalSecs = Math.floor((new Date() - startTimer) / 1000);
  hrs = Math.floor(totalSecs / 3600);
  minutes = Math.floor((totalSecs % 3600) / 60);
  seconds = totalSecs % 60;
  console.log(hrs, minutes, seconds);
}
