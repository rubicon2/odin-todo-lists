import Project from '../modules/project';
import ToDo from '../modules/todo';
import { subscribe, unsubscribe, publish } from '../modules/pubsub';
import { default as createNewToDoForm } from './newToDoForm';

let currentProject = null;

let container = null;
let currentProjectDisplay = null;
let projectTitleDisplay = null;
let projectDescriptionDisplay = null;

export default function create(parentElement) {
  container = document.createElement('main');
  container.classList.add('projectDisplayContainer');
  parentElement.appendChild(container);

  subscribe('onProjectSelect', displayProject);
  subscribe('onToDoAdded', displayToDos);
  subscribe('onToDoRemoved', displayToDos);
}

function displayProject(project) {
  if (currentProjectDisplay !== null) currentProjectDisplay.remove();
  currentProject = project;

  currentProjectDisplay = document.createElement('div');
  currentProjectDisplay.classList.add('projectDisplay');
  container.appendChild(currentProjectDisplay);

  displayToDos(project);
}

function displayToDos(project) {
  project.toDoList.forEach((e) => {
    let toDoElement = document.createElement('div');
    toDoElement.innerText = e.title;
    currentProjectDisplay.appendChild(toDoElement);
  });
}
