import {Task, Project, ProjectManager} from "./tasks.js";

const ProjectList = document.querySelector(".ProjectList");
const TaskList = document.querySelector(".TaskList");

const projectManager = new ProjectManager();

let currentProject = null;

export function AddProject() {
    const AddProjectBtn = document.querySelector(".AddProject");
    const dialog = document.querySelector("#projectDialog");
    const cancel = dialog.querySelector(".cancel");
    const form = dialog.querySelector("#projectForm");

    AddProjectBtn.addEventListener("click", () => dialog.showModal());

    cancel.addEventListener("click", () => dialog.close());

    dialog.addEventListener("submit", (e) => {
        e.preventDefault();
        // Get form data and create project
        const formData = new FormData(form)
        const newProject = new Project(formData.get("projectName"))

        // Add project to list of projects
        projectManager.addProject(newProject);

        // Display project
        const item = document.createElement("div");
        item.textContent = newProject.name;
        ProjectList.appendChild(item);

        // Add interaction with projects so each displays tasks
        item.addEventListener("click", () => {
            currentProject = newProject;
            renderTasks(newProject);
        })
        currentProject = newProject

        form.reset();
        dialog.close();
    })
}

// Render the tasks within each project
function renderTasks(project) {
    TaskList.innerHTML = "";

    if (project.tasks.length === 0) {
        TaskList.textContent = "No tasks in this project";
    } else {
        project.tasks.forEach(task => {
            const taskItem = document.createElement("div");
            taskItem.classList.add("task");

            const summary = document.createElement("span");
            summary.textContent = `${task.title} - Due: ${task.dueDate} - Priority: ${task.priority}`
            taskItem.appendChild(summary);

            const description = document.createElement("div");
            description.textContent = task.description;
            description.classList.add("task-description", "hidden");
            taskItem.appendChild(description);

            taskItem.addEventListener("click", () => {
                description.classList.toggle("hidden");
            })

            TaskList.appendChild(taskItem);
        })
    }
}

// Add Task
export function AddTask() {
    const AddTaskBtn = document.querySelector(".AddTask");
    const dialog = document.querySelector("#taskDialog");
    const cancel = dialog.querySelector(".cancel");
    const form = dialog.querySelector("#taskForm");
    
    AddTaskBtn.addEventListener("click", () => {
        if (currentProject === null) {
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