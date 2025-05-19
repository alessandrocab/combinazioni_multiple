document.addEventListener("DOMContentLoaded", () => {
  const music = document.getElementById("bg-music");
  const startButton = document.getElementById("start-button");

  const enigmas = [
    { inputId: "input1", answer: "magia", nextId: "enigma2" },
    { inputId: "input2", answer: "75", nextId: "enigma3" },
    { inputId: "input3", answer: "stanza delle necessità", nextId: "revealed" },
  ];

  const alertBox = document.getElementById("custom-alert");

  startButton.addEventListener("click", () => {
    document.getElementById("intro").style.display = "none";
    document.getElementById("enigma1").style.display = "block";
    music.play().catch(() => {}); // Try autoplay, silently fail
  });

  window.togglePassword = function (inputId) {
    const input = document.getElementById(inputId);
    input.type = input.type === "password" ? "text" : "password";
  };

  window.checkEnigma = function (num) {
    const enigma = enigmas[num - 1];
    const input = document.getElementById(enigma.inputId);
    const answer = input.value.trim().toLowerCase();

    if (answer === enigma.answer.toLowerCase()) {
      document.getElementById(`enigma${num}`).style.display = "none";

      if (enigma.nextId === "revealed") {
        document.getElementById("revealed").style.display = "flex";
        new Audio("success.mp3").play().catch(() => {});
      } else {
        document.getElementById(enigma.nextId).style.display = "block";
        new Audio("success.mp3").play().catch(() => {});
      }
    } else {
      showCustomAlert();
      new Audio("fail.mp3").play().catch(() => {});
    }
  };

  window.goBack = function () {
    document.getElementById("revealed").style.display = "none";
    document.getElementById("intro").style.display = "block";
    document.getElementById("input1").value = "";
    document.getElementById("input2").value = "";
    document.getElementById("input3").value = "";
  };

  function showCustomAlert() {
    alertBox.classList.remove("hidden");
  }

  window.closeCustomAlert = function () {
    alertBox.classList.add("hidden");
  };

  // MATRIX RAIN EFFECT
  const canvas = document.getElementById("matrixRain");
  const ctx = canvas.getContext("2d");
  canvas.height = window.innerHeight;
  canvas.width = window.innerWidth;

  const letters = "アァイィウヴエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン".split("");
  const fontSize = 14;
  const columns = canvas.width / fontSize;
  const drops = new Array(Math.floor(columns)).fill(1);

  function drawMatrix() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#0F0";
    ctx.font = fontSize + "px monospace";

    for (let i = 0; i < drops.length; i++) {
      const text = letters[Math.floor(Math.random() * letters.length)];
      ctx.fillText(text, i * fontSize, drops[i] * fontSize);

      if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
        drops[i] = 0;
      }
      drops[i]++;
    }
  }
  setInterval(drawMatrix, 50);
});
