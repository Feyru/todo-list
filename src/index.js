import loadWebsite from './website';
import domManipulation from './dom';


document.addEventListener('DOMContentLoaded', () => {
    loadWebsite();
    domManipulation.loadFromLocalStorage();
    domManipulation.handleClickEvents();
    domManipulation.displayTodoCards();
    domManipulation.displayProjects();
    
})

