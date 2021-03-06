let TIME_LIMIT = 30;
let timePassed = 0;
let timeLeft = TIME_LIMIT;
let timerInterval = null;

const FULL_DASH_ARRAY = 283;
const WARNING_THRESHOLD = Math.max(Number(TIME_LIMIT / 10), 10);
const ALERT_THRESHOLD = Math.max(Number(TIME_LIMIT / 20), 5);
console.log(WARNING_THRESHOLD);
console.log(ALERT_THRESHOLD);
const COLOR_CODES = {
info: {
    color: "green"
},
warning: {
    color: "orange",
    threshold: WARNING_THRESHOLD
},
alert: {
    color: "red",
    threshold: ALERT_THRESHOLD
}
};
let remainingPathColor = COLOR_CODES.info.color;

document.getElementById("start_timer").addEventListener("click", function(){
    console.log("Timer Starting");
    TIME_LIMIT = Number(document.getElementById("duration").value);
    timePassed = 0;
    remainingPathColor = COLOR_CODES.info.color;
    timeLeft = TIME_LIMIT;
    clearInterval(timerInterval);
    timerInterval = null;
    document.getElementById("app").innerHTML = `
        <div class="base-timer">
            <svg class="base-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <g class="base-timer__circle">
                    <circle class="base-timer__path-elapsed" cx="50" cy="50" r="45"></circle>
                    <path id="base-timer-path-remaining" stroke-dasharray="283" class="base-timer__path-remaining ${remainingPathColor}" d="
                        M 50, 50
                        m -45, 0
                        a 45,45 0 1,0 90,0
                        a 45,45 0 1,0 -90,0
                        ">
                    </path>
                </g>
            </svg>
            <span id="base-timer-label" class="base-timer__label">
                ${formatTime(timeLeft)}
            </span>
        </div>
        `;
    startTimer();
});


function onTimesUp() {
    clearInterval(timerInterval);
    document.getElementById("start_timer").innerHTML = "Start";
    remainingPathColor = COLOR_CODES.info.color;
    document.getElementById("app").innerHTML = `
    <div class="base-timer">
        <svg class="base-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <g class="base-timer__circle">
                <circle class="base-timer__path-elapsed" cx="50" cy="50" r="45"></circle>
                <path id="base-timer-path-remaining" stroke-dasharray="283" class="base-timer__path-remaining ${remainingPathColor}" d="
                    M 50, 50
                    m -45, 0
                    a 45,45 0 1,0 90,0
                    a 45,45 0 1,0 -90,0
                    ">
                </path>
            </g>
        </svg>
        <span id="base-timer-label" class="base-timer__label">
            ${formatTime(timeLeft)}
        </span>
    </div>
    `;
    var audio = new Audio('/audio/211869__wikbeats__110-loop.wav');
    audio.play();
}

function startTimer() {
    document.getElementById("start_timer").innerHTML = "Reset";
  timerInterval = setInterval(() => {
    timePassed = timePassed += 1;
    timeLeft = TIME_LIMIT - timePassed;
    document.getElementById("base-timer-label").innerHTML = formatTime(
      timeLeft
    );
    setCircleDasharray();
    setRemainingPathColor(timeLeft);

    if (timeLeft === 0) {
      onTimesUp();
    }
  }, 1000);

}

function formatTime(time) {
  const minutes = Math.floor(time / 60);
  let seconds = time % 60;

  if (seconds < 10) {
    seconds = `0${seconds}`;
  }

  return `${minutes}:${seconds}`;
}

function setRemainingPathColor(timeLeft) {
  const { alert, warning, info } = COLOR_CODES;
  if (timeLeft <= alert.threshold) {
    document
      .getElementById("base-timer-path-remaining")
      .classList.remove(warning.color);
    document
      .getElementById("base-timer-path-remaining")
      .classList.add(alert.color);
  } else if (timeLeft <= warning.threshold) {
    document
      .getElementById("base-timer-path-remaining")
      .classList.remove(info.color);
    document
      .getElementById("base-timer-path-remaining")
      .classList.add(warning.color);
  }
}

function calculateTimeFraction() {
  const rawTimeFraction = timeLeft / TIME_LIMIT;
  return rawTimeFraction - (1 / TIME_LIMIT) * (1 - rawTimeFraction);
}

function setCircleDasharray() {
  const circleDasharray = `${(
    calculateTimeFraction() * FULL_DASH_ARRAY
  ).toFixed(0)} 283`;
  document
    .getElementById("base-timer-path-remaining")
    .setAttribute("stroke-dasharray", circleDasharray);
}