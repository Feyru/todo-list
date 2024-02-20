
const projectList = [
    // {
    //     title: "Chores",
    //     tasks: [],
    // },
    // {
    //     title: "Study",
    //     tasks: [],
    // }
];

class Project {
    constructor(title) {
        this.title = title;
        this.tasks = [];
    }

    addTask(task) {
        this.tasks.push(task);
    }

    static createNewProject() {
        const title = document.getElementById('project-title').value;
        const newProject = new Project(title);
        projectList.push(newProject);
    
        // return newProject;
        console.log(projectList);
    }

    static getSelectedProject(projectDiv) {
        const selectedProjectIndex = parseInt(projectDiv.getAttribute('data-index'));
        console.log(selectedProjectIndex);
        return selectedProjectIndex;
    }
}

export  { projectList, Project };