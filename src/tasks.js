import { Project, projectList } from "./projects";
//store todo objects in an array
const taskList = [];
//tasks
class Task {
    constructor(title, description, dueDate, priority, project) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
    }

    //create new todos based on users input
    static createNewTodo(selectedProjectIndex) {     
        const title = document.getElementById('title').value;
        const description = document.getElementById('description').value;
        const dueDate = document.getElementById('dueDate').value;
        let priority;
        const radioButtons = document.getElementsByName('priority');
        for (let i = 0; i < radioButtons.length; i++) {
        if(radioButtons[i].checked) {
            priority = radioButtons[i].value;
            break;
        }       
        }
        
            const selectedProject = projectList[selectedProjectIndex];
            const newTask = new Task(title, description, dueDate, priority);
            selectedProject.tasks.push(newTask);
            console.log('new task created: ' , newTask);
            console.log(selectedProject);
            return newTask;
        
        
}
}




export { taskList, Task};