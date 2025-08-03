// import "./styles.css";
import {AddProject} from "./modules/dom.js";
import {Task, Project, ProjectUI} from "./modules/tasks.js";

window.Task = Task;
window.Project = Project;

AddProject();

const task1 = new Task("Hello", "testing description", "15", "high");
const task2 = new Task("Hi", "testing description", "30", "low");

const project1 = new Project();
project1.addTask(task1);
project1.addTask(task2);
console.log(project1.tasks)