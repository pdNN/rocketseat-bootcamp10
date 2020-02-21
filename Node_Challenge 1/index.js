const express = require("express");

const server = express();

server.use(express.json());

// Middlewares

// Verify if id requested exists
// server.use((req, res, next) => {
//   console.log()
// });

const projects = [{ "id": "1", "title": "Initial Project", "tasks": ["Do"] }];
let reqNumber = 0;

// Check if project id exists
function verifyId(req,res,next) {
  const { id } = req.params;
  project = projects.find(project => project.id == id)
  
  if (!project) {
    return res.status(400).json("Project with this id doesn't exist");
  }
  return next();
}

// Log number of requisitions
server.use((req, res, next) => {
  next();

  reqNumber++; 
  console.log(`Number of requistions: ${reqNumber}`)
});

// List all projects
server.get("/projects", (req, res) => {
  return res.json(projects);
});

// Add a project (id, title, tasks)
server.post("/projects", (req, res) => {
  const { id, title } = req.body;
  idS = id.toString();
  titleS = title.toString();

  project = projects.find(p => p.id == id);

  if (project) {
    return res.json("Already exists a project with this id")
  }

  projects.push(
    { 
      id: idS, 
      title: titleS, 
      tasks: [] 
    }
  );

  return res.json(projects);
});

// Add a task into a project (id, tasks)
server.post("/projects/:id/tasks", verifyId, (req, res) => {
  const { id } = req.params;
  const project = projects.find(project => project.id == id);
  
  const { task } = req.body;
  taskS = task.toString();
  project.tasks.push(taskS);

  return res.json(project);
});

// Update project title (id)
server.put("/projects/:id", verifyId, (req, res) => {
  const { id } = req.params;
  const project = projects.find(project => project.id == id);

  const { title } = req.body;
  project.title = title;
  
  return res.json(project);
});

// Delete project (id)
server.delete("/projects/:id", verifyId, (req, res) => {
  const { id } = req.params;
  const project = projects.findIndex(project => project.id == id);
  projects.splice(project, 1);

  return res.json(projects).send();
});


server.listen(3000);