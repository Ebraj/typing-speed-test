/**
 * -----------------------All the required objects--------------
 */
const allTimeClasses = [
  ".time-hrs",
  ".time-minutes",
  ".time-seconds",
  ".time-milliseconds",
];
const randomParas = [
  "Hopes and dreams were dashed that day. It should have been expected, but it still came as a shock. The warning signs had been ignored in favor of the possibility, however remote, that it could actually happen. That possibility had grown from hope to an undeniable belief it must be destiny. That was until it wasn't and the hopes and dreams came crashing down.",
  "I recollect that my first exploit in squirrel-shooting was in a grove of tall walnut-trees that shades one side of the valley. I had wandered into it at noontime, when all nature is peculiarly quiet, and was startled by the roar of my own gun, as it broke the Sabbath stillness around and was prolonged and reverberated by the angry echoes.",
  "Dave found joy in the daily routine of life. He awoke at the same time, ate the same breakfast and drove the same commute. He worked at a job that never seemed to change and he got home at 6 pm sharp every night. It was who he had been for the last ten years and he had no idea that was all about to change.",
  "I'm heading back to Colorado tomorrow after being down in Santa Barbara over the weekend for the festival there. I will be making October plans once there and will try to arrange so I'm back here for the birthday if possible. I'll let you know as soon as I know the doctor's appointment schedule and my flight plans.",
  "He had three simple rules by which he lived. The first was to never eat blue food. There was nothing in nature that was edible that was blue. People often asked about blueberries, but everyone knows those are actually purple. He understood it was one of the stranger rules to live by, but it had served him well thus far in the 50+ years of his life.",
];

/**
 * --------------------All the DOM Elements-------------------
 */
const timeHrs = document.querySelector(allTimeClasses[0]);
const timeMinutes = document.querySelector(allTimeClasses[1]);
const timeSeconds = document.querySelector(allTimeClasses[2]);
const timeMilliseconds = document.querySelector(allTimeClasses[3]);
const paraContentHolder = document.querySelector(".random-para");
const typedText = document.querySelector(".typed-text");
const wpmHolder = document.querySelector(".wpm-holder");
const restartBtn = document.querySelector(".typing__section--btn");
const accuracyHolder = document.querySelector(".accuracy-holder");
let currentPara,
  currentContent,
  addedSpans,
  addedSpansChar = [];
let keyPressCount = 0;
let errorCount = 0;
let accurateCount = 0;

/**
 * --------------All related to the timer---------------------------
 */
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
}
function pauseFun() {
  clearInterval(interval);
}
/**
 * -------------------All the functions other than timer------------------
 */
//Function that checks if array are equal
function arrayEquals(a, b) {
  return (
    Array.isArray(a) &&
    Array.isArray(b) &&
    a.length === b.length &&
    a.every((val, index) => val === b[index])
  );
}

//Function that splits the function
function splitterFun() {
  let randomNum = Math.floor(Math.random() * 5);
  currentPara = randomParas[randomNum];
  // currentPara = randomParas[0];
  currentPara.split("").forEach((char) => {
    //Creating the span and appending it to the main file...
    const charSpan = document.createElement("span");
    charSpan.innerHTML = char;
    charSpan.classList.add("added-span");
    paraContentHolder.appendChild(charSpan);
  });
  addedSpans = document.querySelectorAll(".added-span");
  addedSpansChar = [];
  addedSpans.forEach((addedSpan) => {
    addedSpansChar.push(addedSpan.innerText);
  });
}

//Function that restarts everything
function restartFun() {
  paraContentHolder.innerHTML = "";
  if (!paraContentHolder.innerHTML) {
    splitterFun();
  }
  clearInterval(interval);
  totalSecs = 0;
  timeHrs.innerText = "00";
  timeMinutes.innerText = "00";
  timeSeconds.innerText = "00";
  wpmHolder.innerText = "100";
  hrs = 0;
  minutes = 0;
  seconds = 0;
  keyPressCount = 0;
  errorCount = 0;
  // timerFun();
  typedText.value = "";
  // typedText.onfocus();
  //Removing the border colors too
  typedText.classList.remove("border-green");
  typedText.classList.remove("border-red");
  accurateCount = 0;
  accuracyHolder.innerText = `100%`;
  typedText.disabled = false;
}

// Another function handler
function funHandler2(e) {
  let { key } = e;
  //Counting the key press
  if (
    key !== "Backspace" &&
    key !== "Shift" &&
    key !== "Enter" &&
    key !== "Control"
  ) {
    keyPressCount++;
  }
  let currentVal = e.target.value;
  let currentValArray = currentVal.split("");
  currentValArray.forEach((currentChar, i) => {
    if (currentChar === null) {
    }
    if (currentChar === addedSpans[i].innerText) {
      accurateCount = i + 1;
      addedSpans[i].classList.add("written-text");
      typedText.classList.remove("border-red");
      typedText.classList.add("border-green");
    } else {
      errorCount++;
      typedText.classList.remove("border-green");
      typedText.classList.add("border-red");
    }
  });
  if (totalSecs !== 0) {
    wpmCounter();
  }

  console.log(addedSpansChar, currentValArray);
  let result = arrayEquals(addedSpansChar, currentValArray);
  if (result) {
    clearInterval(interval);
    typedText.classList.remove("border-green");
    typedText.classList.remove("border-red");
    typedText.value = "";
    typedText.disabled = true;
  }
}

function _tempFun() {
  timerFun();
}
typedText.addEventListener("click", _tempFun);

// Backspace Check Function
function checkBackspace(e) {
  if (e.key === "Backspace") {
    let currentVal = e.target.value;
    if (e.target.value === "") {
      typedText.classList.remove("border-green");
      typedText.classList.remove("border-red");
      addedSpans.forEach((addedSpan) => {
        addedSpan.classList.remove("written-text");
      });
    } else {
      addedSpans[currentVal.length].classList.remove("written-text");
    }
  }
}

let grossWpm;
let accuracy;
function wpmCounter() {
  let _temp = (keyPressCount - errorCount) / 5;
  netWpm = Math.abs(Math.floor((_temp * 60) / totalSecs));
  accuracy = Math.floor((accurateCount / keyPressCount) * 100);
  if (accuracy > 100) {
    accuracyHolder.innerHTML = `${100}%`;
  } else {
    accuracyHolder.innerHTML = `${accuracy}%`;
  }
  wpmHolder.innerHTML = Math.floor(netWpm);
}

/**
 * ---------------------All the other activities-----------------
 */
splitterFun();

//Getting the inputs
typedText.addEventListener("keyup", funHandler2);
typedText.addEventListener("keyup", checkBackspace);
restartBtn.addEventListener("click", restartFun);
