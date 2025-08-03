// 1. Class for Task
 export class Task {
    constructor(title, description, dueDate, priority) {
        this.id = crypto.randomUUID();
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.completed = false;
    }

    toggle() {
        this.completed = !this.completed;
    }
}

// 2. Class for Project (contains tasks)
export class Project {
    constructor(name) {
        this.id = crypto.randomUUID();
        this.name = name;
        this.tasks = [];
    }

    addTask(task) {
        this.tasks.push(task);
    }

    removeTask(index) {
        this.tasks.splice(index, 1);
    }

    toggleTask(index) {
        if (this.tasks[index]) {
            this.tasks[index].toggle();
        }
    }

    listTasks() {
        return this.tasks;
    }
}

// 3. Project Manager
export class ProjectManager {
    constructor() {
        this.projects = [];
    }

    addProject(project) {
        this.projects.push(project);
        this.saveToLocalStorage();
    }

    removeProject(id) {
        this.projects = this.projects.filter((project) => project.id !== id)
        this.saveToLocalStorage();
    }

    saveToLocalStorage() {
        const serialized = JSON.stringify(this.projects);
        localStorage.setItem("projects", serialized);
    }

    loadFromLocalStorage() {
        const data = localStorage.getItem("projects");
        if (data) {
            const parsed = JSON.parse(data);
            this.projects = parsed.map(proj => {
                const project = new Project(proj.name);
                project.id = proj.id;
                project.tasks = proj.tasks.map(t => new Task(t.title, t.description, t.dueDate, t.priority));
                return project;
            })
        }
    }
}



