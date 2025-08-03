import {Task, Project, ProjectUI} from "./tasks.js";

const AddTaskBtn = document.querySelector(".AddTask");
const ProjectList = document.querySelector(".ProjectList");

export function AddProject() {
    const AddProjectBtn = document.querySelector(".AddProject");
    const dialog = document.querySelector("#projectDialog");
    const cancel = dialog.querySelector(".cancel");
    const form = dialog.querySelector("#projectForm");

    AddProjectBtn.addEventListener("click", () => {
        dialog.showModal();
    })

    cancel.addEventListener("click", () => {
        dialog.close();
    })

    dialog.addEventListener("submit", (e) => {
        e.preventDefault();
        const formData = new FormData(form)
        const newProject = new Project(formData.get("projectName"))

        const item = document.createElement("div");
        item.textContent = newProject.name;
        ProjectList.appendChild(item);

        form.reset();
        dialog.close();
    })
}


// export function AddTask() {
//     AddTaskBtn.addEventListener("click", () => {
//         const newTask = new Task()
//     })
// }