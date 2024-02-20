import { taskList, Task } from './tasks';
import { projectList, Project } from './projects';

const domManipulation = (() => { 
    const modal = document.querySelector('.modal');
    const overlay = document.querySelector('.overlay');
    const projectModal = document.querySelector('.project-modal');
    

    function handleClickEvents() { 
        const addBtn = document.querySelector('.add');
        const closeBtn = document.querySelector('.close');
        const submitBtn = document.querySelector('.submit');
        const cancelBtn = document.querySelector('.cancel');
        const projectBtn = document.querySelector('.add-project');
        const showAllBtn = document.querySelector('.show-all');
        const projectSubmit = document.querySelector('.project-submit');
        const cancelProjectBtn = document.querySelector('.project-cancel');
        const projectCloseBtn = document.querySelector('.project-close');
    
        addBtn.addEventListener('click', () => {
            //clear previous values from the form
            clearForm();
            //showing the modal
            showModal();
        })
        //closing the modal
        closeBtn.addEventListener('click', () => {
            hideModal();
        })

        //creating the new task
        submitBtn.addEventListener('click', () => {
            const selectedProjectIndex = submitBtn.dataset.selectedProjectIndex;
            Task.createNewTodo(selectedProjectIndex);
            hideModal();
            displayTodoCards(selectedProjectIndex);
            updateProjectNameDisplay(selectedProjectIndex);

            //storing in local storage 
            saveToLocalStorage();
        })
        //canceling the task creation  
        cancelBtn.addEventListener('click', () => {
            hideModal();
        })

        //showing project modal when btn clicked
        projectBtn.addEventListener('click', () => {
            //clear previous values from the form
            // clearForm();
            //showing the modal
            showProjectModal();
        })

        //creating new project
        projectSubmit.addEventListener('click', () => {
            Project.createNewProject();
            displayProjects();
            hideProjectModal();
            clearProjectForm();
            //saving
            saveToLocalStorage();
        })
        //canceling project creation
        cancelProjectBtn.addEventListener('click', () => {
            hideProjectModal();
            clearProjectForm();
        })
        //closing the project modal
        projectCloseBtn.addEventListener('click', () => {
            hideProjectModal();
        })

        //showing all tasks
        showAllBtn.addEventListener('click', () => {
            displayTodoCards();
            hideAddButton();
            const projects = document.querySelectorAll('.project');
            projects.forEach(project => project.classList.remove('selected'));

            showAllBtn.classList.add('selected');
            updateProjectNameDisplay();

        })

    }
    function hideModal() {
        modal.classList.add('hidden');
        overlay.classList.add('hidden');
    }
    function showModal() {
        modal.classList.remove('hidden');
        overlay.classList.remove('hidden');
    }
    function hideProjectModal() {
        projectModal.classList.add('hidden');
        overlay.classList.add('hidden');
    }
    function showProjectModal() {
        projectModal.classList.remove('hidden');
        overlay.classList.remove('hidden');
    }
    function clearForm() {
        document.getElementById('title').value = '';
        document.getElementById('description').value = '';
        document.getElementById('dueDate').value = '';
        const radioBtns = document.getElementsByName('priority');
        for (let i = 0; i < radioBtns.length; i++) {
            radioBtns[i].checked = false;
        }
    }
    function clearProjectForm() {
        document.getElementById('project-title').value = '';
    }
    function showAddButton() {
        const addBtn = document.querySelector('.add');
        addBtn.classList.remove('hidden');
    }
    function hideAddButton() {
        const addBtn = document.querySelector('.add');
        addBtn.classList.add('hidden');
    }
    function updateProjectNameDisplay(selectedProjectIndex) {
        const projectName = document.querySelector('.project-name');
        projectName.textContent = '';

        if(selectedProjectIndex !== undefined) {
            const selectedProject = projectList[selectedProjectIndex];
            projectName.textContent = selectedProject.title + " (" + selectedProject.tasks.length + ")";
        }
        else {
            projectName.textContent = "ALL";
        }        
    }

    function createProject(projectData, index) {
        const submitBtn = document.querySelector('.submit');
        const projectsContainer = document.querySelector('.projects-container');
        const projectDiv = document.createElement('div');
        const projectTitle = document.createElement('p');
        const deleteBtn = document.createElement('button');

        projectDiv.classList.add('project');
        projectDiv.setAttribute('data-index', index);
        projectsContainer.appendChild(projectDiv);

        projectTitle.classList.add('project-title');
        projectTitle.textContent = projectData.title;
        projectDiv.appendChild(projectTitle);

        deleteBtn.classList.add('project-delete');
        deleteBtn.innerHTML = '<img src="./images/trash-can-outline.svg" alt="delete">';
        projectDiv.appendChild(deleteBtn);

        //event listener for project you click on to sotre their index
        projectDiv.addEventListener('click', () => {
            const selectedProjectIndex = Project.getSelectedProject(projectDiv);
            console.log('selected project: ', selectedProjectIndex);
            submitBtn.dataset.selectedProjectIndex = selectedProjectIndex;
        
            const projects = document.querySelectorAll('.project');
            projects.forEach(project => project.classList.remove('selected'));

            const showAllBtn = document.querySelector('.show-all');
            showAllBtn.classList.remove('selected');
            
            projectDiv.classList.add('selected');
            displayTodoCards(selectedProjectIndex);
            updateProjectNameDisplay(selectedProjectIndex);
            showAddButton();
        });

         //add delete event listeners to the del buttons
        deleteBtn.addEventListener('click', (event) => {
            event.stopPropagation();
            const dataIndex = parseInt(projectDiv.getAttribute('data-index'));
            projectList.splice(dataIndex, 1);
            hideAddButton();
            displayProjects();
            displayTodoCards();
            saveToLocalStorage();
        });

    } 

    function createTodoCard(todoData, index) {
        const todosContainer = document.querySelector('.todos-container');
        const todoDiv = document.createElement('div');
        const todoTitle = document.createElement('p');
        const todoDesc = document.createElement('p');
        const todoDueDate = document.createElement('p');
        // const todoPrio = document.createElement('p');
        const todoCheck = document.createElement('input');
        const todoDelete = document.createElement('button');

        todoDiv.classList.add('todo');
        todoDiv.setAttribute('data-index', index);
        todosContainer.appendChild(todoDiv);    

        todoCheck.classList.add('check-btn');
        todoCheck.type = 'checkbox';
        todoDiv.appendChild(todoCheck);

        todoTitle.classList.add('todo-title');
        todoTitle.textContent = (todoData.title);
        todoDiv.appendChild(todoTitle);

        todoDesc.classList.add('todo-desc');
        todoDesc.textContent = (todoData.description);
        todoDiv.appendChild(todoDesc);

        todoDueDate.classList.add('todo-due-date');
        todoDueDate.textContent = (todoData.dueDate);
        todoDiv.appendChild(todoDueDate);

        //add different class to the div based on prio
        switch(todoData.priority) {
            case "Urgent": 
                todoCheck.classList.add('prio-urgent');
                break;
            case "Important": 
                todoCheck.classList.add('prio-important');
                break;
            case "Can wait":
                todoCheck.classList.add('prio-canwait');
                break;
        }

        todoDelete.classList.add('todo-delete');
        todoDelete.innerHTML = '<img src="./images/trash-can-outline.svg" alt="delete">';
        todoDiv.appendChild(todoDelete);

        //add delete event listeners to the del buttons
        todoDelete.addEventListener('click', (event) => {
            event.stopPropagation();
            const submitBtn = document.querySelector('.submit');
            const dataIndex = parseInt(todoDiv.getAttribute('data-index'));
            const selectedProjectIndex = parseInt(submitBtn.dataset.selectedProjectIndex);
            const selectedProject = projectList[selectedProjectIndex];
            selectedProject.tasks.splice(dataIndex, 1);
            console.log('should delete this');
            saveToLocalStorage();
            displayProjects(selectedProjectIndex);
            displayTodoCards(selectedProjectIndex);
            updateProjectNameDisplay(selectedProjectIndex);
        });

        //add event listener for checkbox
        todoCheck.addEventListener('change', () => {
            if(todoCheck.checked) {
                todoDiv.classList.add('completed');
            }
            else {
                todoDiv.classList.remove('completed');
            }
        })
    }

    function displayProjects() {
        const projectsContainer = document.querySelector('.projects-container');
        projectsContainer.innerHTML = '';
        projectList.forEach((project, index) => {
            createProject(project, index);
        });
    }  

    function displayTodoCards(selectedProjectIndex = null) {
        const todosContainer = document.querySelector('.todos-container');
        todosContainer.innerHTML = '';
        //show all todos
        if(selectedProjectIndex !== null) { 
            const selectedProject = projectList[selectedProjectIndex];
            selectedProject.tasks.forEach((task, taskIndex) => {
                createTodoCard(task, taskIndex);
            })
        }
        else { 
        projectList.forEach((project, projectIndex) => {
            project.tasks.forEach((task, taskIndex) => {
                createTodoCard(task, taskIndex);
            });     
        });
    }
        
    }   
    //serialization
    function serializeProject(project) {
        return {
            title: project.title,
            tasks: project.tasks.map(task => ({
                title: task.title,
                description: task.description,
                dueDate: task.dueDate,
                priority: task.priority
            }))
        };
    }
    //deserialization 
    function deserializeProject(serializedProject) {
        const project = new Project(serializedProject.title);
        serializedProject.tasks.forEach(task => {
            project.addTask(new Task(task.title, task.description, task.dueDate, task.priority));
        });
        return project;
    }
    //save projects with tasks to local storage
    function saveToLocalStorage() {
        const serializedProject = projectList.map(serializeProject);
        localStorage.setItem('projects', JSON.stringify(serializedProject));
    }
    //getting the projects from the local storage
    function loadFromLocalStorage() {
        const serializedProject = JSON.parse(localStorage.getItem('projects')) || [];
        projectList.length = 0;
        serializedProject.forEach(serializedProject => {
            const project = deserializeProject(serializedProject);
            projectList.push(project);
        })

    }


    
    return {handleClickEvents, createTodoCard, displayTodoCards, createProject, displayProjects, hideModal, showModal, clearForm, 
        showAddButton, hideAddButton, updateProjectNameDisplay, showProjectModal, hideProjectModal, clearProjectForm, saveToLocalStorage, loadFromLocalStorage};
})();


export default domManipulation;