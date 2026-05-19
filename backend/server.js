const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

let tasks = [
  { id: 1, title: 'Complete Docker assignment', subject: 'DevOps', done: false },
  { id: 2, title: 'Push code to GitHub', subject: 'Git', done: false },
  { id: 3, title: 'Set up Jenkins pipeline', subject: 'CI/CD', done: true }
];
let nextId = 4;

// Get all tasks
app.get('/tasks', (req, res) => {
  res.json(tasks);
});

// Add a task
app.post('/tasks', (req, res) => {
  const { title, subject } = req.body;
  if (!title || !subject) {
    return res.status(400).json({ error: 'Title and subject are required' });
  }
  const task = { id: nextId++, title, subject, done: false };
  tasks.push(task);
  res.status(201).json(task);
});

// Toggle done
app.patch('/tasks/:id', (req, res) => {
  const task = tasks.find(t => t.id === parseInt(req.params.id));
  if (!task) return res.status(404).json({ error: 'Task not found' });
  task.done = !task.done;
  res.json(task);
});

// Delete a task
app.delete('/tasks/:id', (req, res) => {
  tasks = tasks.filter(t => t.id !== parseInt(req.params.id));
  res.json({ message: 'Deleted' });
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
