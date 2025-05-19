const bgMusic = document.getElementById("bg-music");
const successSound = new Audio("success.mp3");
const failSound = new Audio("fail.mp3");

document.getElementById("start-button").addEventListener("click", () => {
  document.getElementById("intro").style.display = "none";
  document.getElementById("enigma1").style.display = "block";
  bgMusic.play();
});

function togglePassword(id) {
  const input = document.getElementById(id);
  input.type = input.type === "password" ? "text" : "password";
}

function closeCustomAlert() {
  document.getElementById("custom-alert").classList.add("hidden");
}

function goBack() {
  location.reload();
}

// Funzione per rimuovere spazi, accenti e rendere lowercase
function normalizeAnswer(str) {
  return str
    .normalize("NFD")                       // Decompone accenti
    .replace(/[\u0300-\u036f]/g, "")       // Rimuove segni diacritici
    .replace(/\s+/g, "")                   // Rimuove spazi
    .toLowerCase();
}

function checkEnigma(number) {
  const answers = {
    1: "8",
    2: "75",
    3: "stanzadellenecessita"
  };

  const input = document.getElementById(`input${number}`);
  const userAnswer = normalizeAnswer(input.value);
  const correctAnswer = normalizeAnswer(answers[number]);

  if (userAnswer === correctAnswer) {
    document.getElementById(`enigma${number}`).style.display = "none";

    if (number < 3) {
      document.getElementById(`enigma${number + 1}`).style.display = "block";
    } else {
      bgMusic.pause();
      successSound.play();
      document.getElementById("revealed").style.display = "flex";
    }
  } else {
    failSound.currentTime = 0;
    failSound.play();
    document.getElementById("custom-alert").classList.remove("hidden");
  }
}
<script>
// MATRIX RAIN EFFECT
const canvas = document.getElementById("matrixRain");
const ctx = canvas.getContext("2d");

canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

const letters = "アァイィウヴエカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモラリルレロワヲンABCDEFGHIJKLMNOPQRSTUVWXYZ";
const fontSize = 14;
const columns = canvas.width / fontSize;

const drops = Array.from({ length: columns }).fill(1);

function drawMatrix() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#0F0"; // Verde Matrix
  ctx.font = fontSize + "px monospace";

  drops.forEach((y, index) => {
    const text = letters.charAt(Math.floor(Math.random() * letters.length));
    const x = index * fontSize;
    ctx.fillText(text, x, y * fontSize);

    if (y * fontSize > canvas.height && Math.random() > 0.975) {
      drops[index] = 0;
    }
    drops[index]++;
  });
}

setInterval(drawMatrix, 50);

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
</script>
