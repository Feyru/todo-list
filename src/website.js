

function loadWebsite() {
    const body = document.querySelector('body');

    const header = document.createElement('header');
    body.appendChild(header);
    const checkIcon = document.createElement('img');
    checkIcon.src = './images/check-all.svg';
    checkIcon.classList.add('logo');
    header.appendChild(checkIcon);
    const headerOne = document.createElement('h1');
    headerOne.textContent = "ToDo";
    header.appendChild(headerOne);

    const containerDiv = document.createElement('div');
    containerDiv.classList.add('container');
    body.appendChild(containerDiv);

    const sidebarDiv = document.createElement('div');
    sidebarDiv.classList.add('sidebar');
    containerDiv.appendChild(sidebarDiv);

    const allBtn = document.createElement('button');
    allBtn.classList.add('show-all');
    allBtn.classList.add('selected');
    allBtn.innerText = "All";
    sidebarDiv.appendChild(allBtn);

    const projectHeader = document.createElement('div');
    projectHeader.classList.add('projects-header');
    sidebarDiv.appendChild(projectHeader);

    const headerTwo = document.createElement('h2');
    headerTwo.textContent = "Projects";
    projectHeader.appendChild(headerTwo);

    const projectBtn = document.createElement('button');
    projectBtn.classList.add('add-project');
    projectBtn.innerText = "+";
    projectHeader.appendChild(projectBtn);

    const projectsContainer = document.createElement('div');
    projectsContainer.classList.add('projects-container');
    sidebarDiv.appendChild(projectsContainer);

    const contentDiv = document.createElement('div');
    contentDiv.classList.add('content');
    containerDiv.appendChild(contentDiv);

    const projectName = document.createElement('p');
    projectName.classList.add('project-name');
    projectName.innerText = "ALL";
    contentDiv.appendChild(projectName);

    const todoBtn = document.createElement('button');
    todoBtn.classList.add('add');
    todoBtn.classList.add('hidden');
    todoBtn.innerText = "+";
    contentDiv.appendChild(todoBtn);

    const todoCards = document.createElement('div');
    todoCards.classList.add('todos-container');
    contentDiv.appendChild(todoCards);   
}

export default loadWebsite;