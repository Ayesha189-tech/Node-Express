const express = require('express');
const app = express();
const PORT = 4000;
const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());

// Simple array to store tasks
let tasks = [
  { id: 1, taskName: "Learn Express.js" },
  { id: 2, taskName: "Study API Testing" }
];

// POST /addTask → Add new task
app.post('/addTask', (req, res) => {
  const newTask = {
    id: tasks.length + 1,
    taskName: req.body.taskName
  };
  tasks.push(newTask);
  res.status(201).json({ msg: 'Task added', task: newTask });
});

// GET /tasks → Get all tasks
app.get('/tasks', (req, res) => {
  res.json(tasks);
});

// DELETE /task/:id → Delete a task by ID
app.delete('/task/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const taskIndex = tasks.findIndex(task => task.id === id);

  if (taskIndex === -1) {
    return res.status(404).json({ msg: 'Task not found' });
  }

  const deletedTask = tasks.splice(taskIndex, 1);
  res.json({ msg: 'Task deleted', deleted: deletedTask[0] });
});

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
