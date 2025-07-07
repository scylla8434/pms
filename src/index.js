const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const projectsRouter = require('./routes/projects');
const tasksRouter = require('./routes/tasks');
const teamsRouter = require('./routes/teams');

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Welcome to the Project Management System!');
});

app.use('/api/projects', projectsRouter);
app.use('/api/tasks', tasksRouter);
app.use('/api/teams', teamsRouter);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
}); 