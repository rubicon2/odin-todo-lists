import Project from '../modules/project';
import { subscribe, unsubscribe, publish } from '../modules/pubsub';

let container = null;
let currentProject = null;
let projectTitleDisplay = null;

export default function create(parentElement) {
  container = document.createElement('main');
  container.classList.add('projectDisplayContainer');
  parentElement.appendChild(container);

  createMenuBar();

  subscribe('onProjectSelect', displayProject);
}

function createMenuBar() {
  let menuBar = document.createElement('div');
  menuBar.classList.add('projectDisplayMenuBar');
  container.appendChild(menuBar);

  projectTitleDisplay = document.createElement('span');
  projectTitleDisplay.classList.add('projectTitle');
  projectTitleDisplay.innerText = 'Unassigned';
  menuBar.appendChild(projectTitleDisplay);
}

function displayProject(project) {
  if (currentProject !== null) currentProject.remove();
  projectTitleDisplay.innerText = project.name;

  currentProject = document.createElement('div');

  let description = document.createElement('p');
  description.innerText = project.description;
  currentProject.appendChild(description);

  container.appendChild(currentProject);
}
