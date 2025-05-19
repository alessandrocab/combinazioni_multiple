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
    1: "9",
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
