const dateScroller = document.querySelector('#dateScroller');
const planner = document.querySelector('#planner');
const after = document.querySelector('#after');
let selectedDate = null;
let selectedTime = '19:00';

const formatter = new Intl.DateTimeFormat('ru-RU', { weekday: 'short', day: 'numeric', month: 'short' });
const displayFormatter = new Intl.DateTimeFormat('ru-RU', { weekday: 'long', day: 'numeric', month: 'long' });
const start = new Date();
start.setDate(start.getDate() + 1);

for (let i = 0; i < 3; i++) {
  const date = new Date(start);
  date.setDate(start.getDate() + i);
  const parts = formatter.formatToParts(date);
  const get = type => parts.find(p => p.type === type)?.value.replace('.', '') || '';
  const button = document.createElement('button');
  button.className = `date ${i === 1 ? 'selected' : ''}`;
  button.innerHTML = `<span class="dow">${get('weekday')}</span><span class="day">${get('day')}</span><span class="month">${get('month')}</span>`;
  button.dataset.date = date.toISOString();
  button.addEventListener('click', () => selectDate(button));
  dateScroller.append(button);
  if (i === 1) selectedDate = date;
}

function selectDate(button) {
  document.querySelectorAll('.date').forEach(item => item.classList.remove('selected'));
  button.classList.add('selected');
  selectedDate = new Date(button.dataset.date);
}

document.querySelectorAll('#times button').forEach(button => button.addEventListener('click', () => {
  document.querySelectorAll('#times button').forEach(item => item.classList.remove('selected'));
  button.classList.add('selected');
  selectedTime = button.dataset.time;
}));

document.querySelector('#openPlanner').addEventListener('click', () => planner.scrollIntoView({ behavior: 'smooth', block: 'center' }));
document.querySelector('#confirm').addEventListener('click', () => {
  document.querySelector('#chosenDate').textContent = displayFormatter.format(selectedDate);
  document.querySelector('#chosenTime').textContent = selectedTime;
  after.hidden = false;
  after.scrollIntoView({ behavior: 'smooth', block: 'center' });
  celebrate();
});

function celebrate() {
  const colors = ['#ff5d86', '#feae34', '#9c7ae5', '#fffaf7', '#6dc3a5'];
  for (let i = 0; i < 72; i++) {
    const piece = document.createElement('i');
    piece.className = 'piece';
    piece.style.left = `${Math.random() * 100}vw`;
    piece.style.background = colors[Math.floor(Math.random() * colors.length)];
    piece.style.setProperty('--x', `${(Math.random() - .5) * 180}px`);
    piece.style.animationDelay = `${Math.random() * .45}s`;
    document.querySelector('#confetti').append(piece);
    setTimeout(() => piece.remove(), 3400);
  }
}
