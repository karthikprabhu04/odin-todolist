import {Task, Project, ProjectManager} from "./tasks.js";

const ProjectList = document.querySelector(".ProjectList");
const TaskList = document.querySelector(".TaskList");

const projectManager = new ProjectManager();
const project1 = new Project("Welcome!");
projectManager.addProject(project1)

let currentProject = project1;
window.currentProject = currentProject;
renderTasks(currentProject);

export function AddProject() {
    const AddProjectBtn = document.querySelector(".AddProject");
    const dialog = document.querySelector("#projectDialog");
    const cancel = dialog.querySelector(".cancel");
    const form = dialog.querySelector("#projectForm");

    AddProjectBtn.addEventListener("click", () => dialog.showModal());

    cancel.addEventListener("click", () => dialog.close());

    renderProjects();

    dialog.addEventListener("submit", (e) => {
        e.preventDefault();
        // Get form data and create project
        const formData = new FormData(form)
        const newProject = new Project(formData.get("projectName"))

        // Add project to list of projects
        projectManager.addProject(newProject);

        // Display project
        currentProject = newProject;
        console.log("Added project", currentProject.name);
        renderProjects();

        form.reset();
        dialog.close();
    })
}

function renderProjects() {
    ProjectList.innerHTML = "";
    if (projectManager.projects.length === 0)  {
        ProjectList.textContent = "No projects";
    } else {
        projectManager.projects.forEach((project) => {
            const item = document.createElement("div");
            item.textContent = project.name;
            ProjectList.appendChild(item);
        
            // Add interaction with projects so each displays tasks
            item.addEventListener("click", () => {
                currentProject = project;
                renderTasks(currentProject);
                console.log("Changed projects");
            })

            // Add delete button
            const deleteBtn = document.createElement("button");
            deleteBtn.textContent = "Delete";
            deleteBtn.addEventListener("click", (e) => {
                e.stopPropagation();
                project.tasks = []
                renderTasks(currentProject);
                projectManager.removeProject(project.id);
                renderProjects();
                console.log("Deleted");
            })
            item.appendChild(deleteBtn);
        })
    }
}

// Render the tasks within a project
function renderTasks(project) {
    TaskList.innerHTML = "";

    if (project.tasks.length === 0) {
        TaskList.textContent = "No tasks in this project";
    } else {
        project.tasks.forEach((task, index) => {
            const taskItem = document.createElement("div");
            taskItem.classList.add("task");

            const summary = document.createElement("span");
            summary.textContent = `${task.title} - Due: ${task.dueDate} - Priority: ${task.priority}`
            taskItem.appendChild(summary);

            // Description (hidden initially)
            const description = document.createElement("div");
            description.textContent = task.description;
            description.classList.add("task-description", "hidden");
            taskItem.appendChild(description);

            taskItem.addEventListener("click", () => {
                description.classList.toggle("hidden");
            })

            // Delete button
            const deleteBtn = document.createElement("button");
            deleteBtn.textContent = "Delete";
            deleteBtn.classList.add("deleteBtn");

            deleteBtn.addEventListener("click", (e) => {
                e.stopPropagation();
                project.tasks.splice(index, 1);
                renderTasks(currentProject);
            })
            taskItem.appendChild(deleteBtn);

            TaskList.appendChild(taskItem);
        })
    }
}

// Create Task
export function AddTask() {
    const AddTaskBtn = document.querySelector(".AddTask");
    const dialog = document.querySelector("#taskDialog");
    const cancel = dialog.querySelector(".cancel");
    const form = dialog.querySelector("#taskForm");
    
    AddTaskBtn.addEventListener("click", () => {
        if (projectManager.projects.length === 0) {
            alert("Must choose a project folder for tasks")
            return;
        }
        dialog.showModal()
    });
        

    cancel.addEventListener("click", () => dialog.close());

    dialog.addEventListener("submit", () => {
        // Get form data and create task
        const formdata = new FormData(form);
        const newTask = new Task(formdata.get("title"), formdata.get("description"), formdata.get("dueDate"), formdata.get("priority"));

        // Add task to current project list
        currentProject.addTask(newTask);
        renderTasks(currentProject);

        form.reset();
        dialog.close();
    })
}