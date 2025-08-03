import "./styles.css";
import {AddProject, AddTask} from "./modules/dom.js";
import {Task, Project, ProjectManager} from "./modules/tasks.js";

window.Task = Task;
window.Project = Project;
window.ProjectManager = ProjectManager;

AddProject();
AddTask();


