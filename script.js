function togglePassword() {
  const input = document.getElementById("passwordInput");
  input.type = input.type === "password" ? "text" : "password";
}

function showCustomAlert() {
  document.getElementById("custom-alert").classList.remove("hidden");
}

function closeCustomAlert() {
  document.getElementById("custom-alert").classList.add("hidden");
}

function checkPassword() {
  const input = document.getElementById("passwordInput").value.trim();
  const bgMusic = document.getElementById("bg-music");

  if (input === "segreto123") {
    document.getElementById("main").style.display = "none";
    document.getElementById("revealed").style.display = "flex";
    bgMusic.pause();
    bgMusic.currentTime = 0;
    new Audio("success.mp3").play();
  } else {
    showCustomAlert();
    bgMusic.pause();

    const failAudio = new Audio("fail.mp3");
    failAudio.play().catch(() => {
      console.log("Errore nella riproduzione dell'audio.");
    });

    failAudio.addEventListener("ended", () => {
      bgMusic.currentTime = 0;
      bgMusic.play().catch(() => {
        console.log("Autoplay bloccato");
      });
    });
  }
}

function goBack() {
  const bgMusic = document.getElementById("bg-music");

  document.getElementById("revealed").style.display = "none";
  document.getElementById("main").style.display = "block";
  document.getElementById("passwordInput").value = "";

  if (bgMusic) {
    bgMusic.currentTime = 0;
    bgMusic.play().catch(() => {
      console.log("Audio bloccato, attendi un'interazione.");
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const bgMusic = document.getElementById('bg-music');

  function enableAudio() {
    bgMusic.play().catch(() => {
      console.log("Autoplay bloccato");
    });
    document.removeEventListener('click', enableAudio);
  }

  document.addEventListener('click', enableAudio);
});

// MATRIX RAIN
const canvas = document.getElementById("matrixRain");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const letters = "アァイィウヴエカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワン0123456789".split("");
const fontSize = 14;
const columns = canvas.width / fontSize;
const drops = Array.from({ length: columns }, () => 1);

function draw() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#00ff88";
  ctx.shadowColor = "#00ff88";
  ctx.shadowBlur = 5;
  ctx.font = bold ${fontSize}px monospace;

  for (let i = 0; i < drops.length; i++) {
    const text = letters[Math.floor(Math.random() * letters.length)];
    ctx.fillText(text, i * fontSize, drops[i] * fontSize);

    if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
      drops[i] = 0;
    }

    drops[i]++;
  }
}

setInterval(draw, 40);

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
