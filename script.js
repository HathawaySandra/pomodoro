let timer;
let timeLeft = 25 * 60; // 25 minutes
let isRunning = false;

const timerDisplay = document.getElementById("timer");
const startBtn = document.getElementById("start");
const pauseBtn = document.getElementById("pause");
const resetBtn = document.getElementById("reset");
const themeToggleBtn = document.getElementById("theme-toggle");

// Load sound effects
const buttonSound = new Audio('sounds/button-click.wav'); // Button click sound
const sessionEndSound = new Audio('sounds/session-end.wav'); // Session end sound

function updateDisplay() {
  const minutes = String(Math.floor(timeLeft / 60)).padStart(2, '0');
  const seconds = String(timeLeft % 60).padStart(2, '0');
  timerDisplay.textContent = `${minutes}:${seconds}`;
}

function startTimer() {
  playSound(buttonSound);
  if (!isRunning) {
    isRunning = true;
    timer = setInterval(() => {
      if (timeLeft > 0) {
        timeLeft--;
        updateDisplay();
      } else {
        clearInterval(timer);
        isRunning = false;
        playSound(sessionEndSound);
        alert("Time's up!");
      }
    }, 1000);
  }
}

function pauseTimer() {
  playSound(buttonSound);
  clearInterval(timer);
  isRunning = false;
}

function resetTimer() {
  playSound(buttonSound);
  clearInterval(timer);
  isRunning = false;
  timeLeft = 25 * 60;
  updateDisplay();
}

function playSound(sound) {
  sound.currentTime = 0; // Reset sound
  sound.play().catch((error) => {
    console.error('Error playing sound:', error);
  });
}

themeToggleBtn.addEventListener('click', () => {
  playSound(buttonSound);
  document.body.classList.toggle('dark-mode');
  themeToggleBtn.textContent = document.body.classList.contains('dark-mode') 
    ? '☀️ Light Mode' 
    : '🌙 Dark Mode';
});

startBtn.addEventListener("click", startTimer);
pauseBtn.addEventListener("click", pauseTimer);
resetBtn.addEventListener("click", resetTimer);

updateDisplay();
