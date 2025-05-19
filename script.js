document.addEventListener('DOMContentLoaded', () => {
  const audio = document.getElementById('background-music');
  const startButton = document.getElementById('start-button');
  const intro = document.getElementById('intro');
  const enigmasContainer = document.getElementById('enigmas');
  const revealedContainer = document.getElementById('revealed');
  const customAlert = document.getElementById('custom-alert');
  const alertMessage = document.getElementById('alert-message');
  const successSound = new Audio('success.mp3');

  const steps = [
    { answer: '1234', element: document.getElementById('enigma1') },
    { answer: '75', element: document.getElementById('enigma2') },
    { answer: 'stanza delle necessità', element: document.getElementById('enigma3') }
  ];

  let currentStep = 0;

  startButton.addEventListener('click', () => {
    intro.style.display = 'none';
    enigmasContainer.style.display = 'block';
    try {
      audio.play();
    } catch (e) {
      console.warn("Autoplay non consentito");
    }
  });

  function showAlert(message) {
    alertMessage.textContent = message;
    customAlert.classList.remove('hidden');
  }

  document.getElementById('alert-ok-button').addEventListener('click', () => {
    customAlert.classList.add('hidden');
  });

  function checkAnswer() {
    const step = steps[currentStep];
    const input = step.element.querySelector('input');
    const userAnswer = input.value.trim().toLowerCase();

    if (userAnswer === step.answer.toLowerCase()) {
      successSound.play();
      step.element.style.display = 'none';
      currentStep++;

      if (currentStep < steps.length) {
        steps[currentStep].element.style.display = 'block';
      } else {
        enigmasContainer.style.display = 'none';
        revealedContainer.style.display = 'flex';
      }
    } else {
      showAlert('Risposta errata! Riprova.');
    }
  }

  // Setup submit buttons for each enigma
  steps.forEach((step, index) => {
    const button = step.element.querySelector('button');
    button.addEventListener('click', checkAnswer);
  });

  // Mostra/nascondi password su click sull’occhio
  document.querySelectorAll('.eye-button').forEach(button => {
    button.addEventListener('click', () => {
      const input = button.previousElementSibling;
      input.type = input.type === 'password' ? 'text' : 'password';
    });
  });
});
