import { subscribe, unsubscribe, publish } from '../modules/pubsub';

let container = null;
let currentProjectDisplay = null;

let currentProject = null;

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
  document
    .querySelectorAll('.projectDisplayContainer .toDo')
    .forEach((e) => e.remove());

  project.toDoList.forEach((e) => {
    createToDo(e);
  });
}

function createToDo(toDo) {
  let toDoElement = document.createElement('div');
  toDoElement.classList.add('toDo');
  currentProjectDisplay.appendChild(toDoElement);

  let toDoTitle = document.createElement('div');
  toDoTitle.classList.add('toDoTitle');
  toDoTitle.innerText = toDo.title;
  toDoElement.appendChild(toDoTitle);

  let toDoDescription = document.createElement('div');
  toDoDescription.classList.add('toDoDescription');
  toDoDescription.innerText = toDo.description;
  toDoElement.appendChild(toDoDescription);
}
