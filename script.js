const correctAnswers = {
  1: "934",
  2: "75",
  3: "Stanza delle Necessità"
};

let currentEnigma = 0;

document.getElementById("start-button").addEventListener("click", () => {
  document.getElementById("intro").style.display = "none";
  document.getElementById("enigma1").style.display = "block";
  currentEnigma = 1;
  document.getElementById("bg-music").play();
});

function checkEnigma(num) {
  const input = document.getElementById(`input${num}`).value.trim();
  if (input.toLowerCase() === correctAnswers[num].toLowerCase()) {
    if (num === 3) {
      document.getElementById(`enigma${num}`).style.display = "none";
      document.getElementById("revealed").style.display = "block";
      playSound("success.mp3");
    } else {
      document.getElementById(`enigma${num}`).style.display = "none";
      document.getElementById(`enigma${num + 1}`).style.display = "block";
      currentEnigma++;
    }
  } else {
    showCustomAlert();
    playSound("fail.mp3");
  }
}

function togglePassword(id) {
  const input = document.getElementById(id);
  input.type = input.type === "password" ? "text" : "password";
}

function goBack() {
  document.getElementById("revealed").style.display = "none";
  document.getElementById("intro").style.display = "block";
  currentEnigma = 0;
}

function showCustomAlert() {
  const alertBox = document.getElementById("custom-alert");
  alertBox.classList.remove("hidden");
  alertBox.style.display = "block";
}

function closeCustomAlert() {
  const alertBox = document.getElementById("custom-alert");
  alertBox.classList.add("hidden");
  alertBox.style.display = "none";
}

function playSound(file) {
  const audio = new Audio(file);
  audio.play();
}

// Matrix Rain
const canvas = document.getElementById("matrixRain");
const ctx = canvas.getContext("2d");
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

const letters = "アァイィウヴエェオカガキギクグケゲコゴサザシジスズセゼソゾタダチッヂヅテデトドナニヌネノハバパヒビピフブプヘベペホボポマミムメモヤユヨラリルレロワン";
const matrix = letters.split("");

let fontSize = 16;
let columns = canvas.width / fontSize;
let drops = Array(Math.floor(columns)).fill(1);

function drawMatrix() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#0F0";
  ctx.font = fontSize + "px monospace";

  for (let i = 0; i < drops.length; i++) {
    const text = matrix[Math.floor(Math.random() * matrix.length)];
    ctx.fillText(text, i * fontSize, drops[i] * fontSize);

    if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
      drops[i] = 0;
    }

    drops[i]++;
  }
}

setInterval(drawMatrix, 50);
