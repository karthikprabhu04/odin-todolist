import "./styles.css";
import {AddProject, AddTask} from "./modules/dom.js";
import {Task, Project, ProjectManager} from "./modules/tasks.js";

window.Task = Task;
window.Project = Project;
window.ProjectManager = ProjectManager;

AddProject();
AddTask();

const task1 = new Task("Hello", "testing description", "15", "high");
const task2 = new Task("Hi", "testing description", "30", "low");

const project1 = new Project();
project1.addTask(task1);
project1.addTask(task2);
console.log(project1.tasks)