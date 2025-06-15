function addTask() {
  const input = document.getElementById('taskInput');
  const text = input.value.trim();
  if (text === '') return;

  const ul = document.getElementById('taskList');
  const li = document.createElement('li');
  li.className = 'list-group-item d-flex align-items-center';

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.className = 'form-check-input me-2';

  const span = document.createElement('span');
  span.textContent = text;

  checkbox.addEventListener('change', () => {
    span.style.textDecoration = checkbox.checked ? 'line-through' : 'none';
  });

  li.appendChild(checkbox);
  li.appendChild(span);
  ul.appendChild(li);

  input.value = '';
}

let timer;
let timeLeft = 1500; // 25 minutes
let isRunning = false;

function startTimer() {
  if (isRunning) return;
  isRunning = true;
  timer = setInterval(() => {
    if (timeLeft <= 0) {
      clearInterval(timer);
      isRunning = false;
      alert("Time's up!");
    } else {
      timeLeft--;
      updateTimerDisplay();
    }
  }, 1000);
}

function pauseTimer() {
  clearInterval(timer);
  isRunning = false;
}

function resetTimer() {
  clearInterval(timer);
  isRunning = false;
  timeLeft = 1500;
  updateTimerDisplay();
}

function updateTimerDisplay() {
  const minutes = Math.floor(timeLeft / 60).toString().padStart(2, '0');
  const seconds = (timeLeft % 60).toString().padStart(2, '0');
  document.getElementById('timer').textContent = `${minutes}:${seconds}`;
}

updateTimerDisplay();

let distractions = [0, 0, 0, 0, 0, 0, 0]; // Sunday to Saturday

function logDistraction() {
  const day = new Date().getDay();
  distractions[day]++;
  distractionChart.data.datasets[0].data = distractions;
  distractionChart.update();
}

const ctx = document.getElementById('distractionChart').getContext('2d');
const distractionChart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    datasets: [{
      label: 'Distractions',
      data: distractions,
      backgroundColor: 'rgba(220, 53, 69, 0.7)'
    }]
  },
  options: {
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          precision: 0
        }
      }
    },
    plugins: {
      legend: {
        display: false
      }
    }
  }
});
