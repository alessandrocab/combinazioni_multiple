document.addEventListener('DOMContentLoaded', () => {
  const audio = document.getElementById('bg-music');
  const startButton = document.getElementById('start-button');
  const intro = document.getElementById('intro');
  const enigmas = document.getElementById('enigmas');
  const revealed = document.getElementById('revealed');

  startButton.addEventListener('click', () => {
    intro.style.display = 'none';
    enigmas.style.display = 'block';
    document.getElementById('enigma1').style.display = 'block';
    audio.play().catch(err => console.log("Audio non riproducibile finché l'utente non interagisce"));
  });
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
