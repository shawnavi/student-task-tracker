const API = 'http://localhost:5001';

async function loadTasks() {
  const res = await fetch(`${API}/tasks`);
  const tasks = await res.json();
  renderTasks(tasks);
  renderStats(tasks);
}

function renderStats(tasks) {
  const total = tasks.length;
  const done  = tasks.filter(t => t.done).length;
  const pending = total - done;

  document.getElementById('stats').innerHTML = `
    <div class="stat-card"><div class="number">${total}</div><div class="label">Total Tasks</div></div>
    <div class="stat-card"><div class="number">${done}</div><div class="label">Completed</div></div>
    <div class="stat-card"><div class="number">${pending}</div><div class="label">Pending</div></div>
  `;
}

function renderTasks(tasks) {
  const list = document.getElementById('taskList');
  if (tasks.length === 0) {
    list.innerHTML = '<div class="empty">No tasks yet. Add one above!</div>';
    return;
  }
  list.innerHTML = tasks.map(t => `
    <div class="task-card ${t.done ? 'done' : ''}">
      <div class="check" onclick="toggleTask(${t.id})">${t.done ? '✓' : ''}</div>
      <div class="task-info">
        <div class="task-title">${t.title}</div>
        <div class="task-subject"><span class="subject-badge">${t.subject}</span></div>
      </div>
      <button class="delete-btn" onclick="deleteTask(${t.id})">🗑</button>
    </div>
  `).join('');
}

async function addTask() {
  const title   = document.getElementById('taskTitle').value.trim();
  const subject = document.getElementById('taskSubject').value.trim();
  if (!title || !subject) return alert('Please fill in both fields');

  await fetch(`${API}/tasks`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, subject })
  });

  document.getElementById('taskTitle').value   = '';
  document.getElementById('taskSubject').value = '';
  loadTasks();
}

async function toggleTask(id) {
  await fetch(`${API}/tasks/${id}`, { method: 'PATCH' });
  loadTasks();
}

async function deleteTask(id) {
  await fetch(`${API}/tasks/${id}`, { method: 'DELETE' });
  loadTasks();
}

loadTasks();
