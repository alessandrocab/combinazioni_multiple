document.addEventListener('DOMContentLoaded', () => {
  const audio = document.getElementById('bg-music');
  const startButton = document.getElementById('start-button');
  const intro = document.getElementById('intro');
  const enigmas = document.getElementById('enigmas');
  const revealed = document.getElementById('revealed');

  // Autoplay appena carica la pagina
  window.addEventListener('click', () => {
    audio.play().catch(() => {});
  }, { once: true });

  startButton.addEventListener('click', () => {
    intro.style.display = 'none';
    enigmas.style.display = 'block';
    document.getElementById('enigma1').style.display = 'block';
  });

  startMatrixRain();
});

function togglePassword(inputId) {
  const input = document.getElementById(inputId);
  input.type = input.type === 'password' ? 'text' : 'password';
}

function checkEnigma(num) {
  const answers = {
    1: 'portkeys',
    2: '75',
    3: 'stanza delle necessità'
  };

  const input = document.getElementById(`input${num}`);
  const userAnswer = input.value.trim().toLowerCase();

  if (userAnswer === answers[num]) {
    new Audio('success.mp3').play();
    document.getElementById(`enigma${num}`).style.display = 'none';

    if (num < 3) {
      document.getElementById(`enigma${num + 1}`).style.display = 'block';
    } else {
      document.getElementById('enigmas').style.display = 'none';
      document.getElementById('revealed').style.display = 'flex';
    }
  } else {
    new Audio('fail.mp3').play();
    showCustomAlert();
  }
}

function showCustomAlert() {
  document.getElementById('custom-alert').classList.remove('hidden');
}

function closeCustomAlert() {
  document.getElementById('custom-alert').classList.add('hidden');
}

function goBack() {
  location.reload();
}

function startMatrixRain() {
  const canvas = document.getElementById('matrixRain');
  const ctx = canvas.getContext('2d');

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const letters = 'アァイイウエカサタナハマヤラワABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const fontSize = 16;
  const columns = canvas.width / fontSize;
  const drops = Array(Math.floor(columns)).fill(1);

  function draw() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#0F0';
    ctx.font = `${fontSize}px monospace`;

    for (let i = 0; i < drops.length; i++) {
      const text = letters[Math.floor(Math.random() * letters.length)];
      ctx.fillText(text, i * fontSize, drops[i] * fontSize);
      if (drops[i] * fontSize > canvas.height || Math.random() > 0.975) {
        drops[i] = 0;
      }
      drops[i]++;
    }
  }

  setInterval(draw, 33);
}
