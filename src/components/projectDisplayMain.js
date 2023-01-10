import { subscribe, unsubscribe, publish } from '../modules/pubsub';
import editIcon from '../img/edit.svg';
import deleteIcon from '../img/bin.svg';
import completedIcon from '../img/tick.svg';

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

  if (toDo.isDue) {
    toDoElement.classList.add('toDoDue');
  }

  createToDoToolbar(toDoElement, toDo);

  if (toDo.description !== '') {
    let toDoDescription = document.createElement('div');
    toDoDescription.classList.add('toDoDescription');
    toDoDescription.innerText = toDo.description;
    toDoElement.appendChild(toDoDescription);
  }
}

function createToDoToolbar(parentElement, toDo) {
  let toolbar = document.createElement('div');
  toolbar.classList.add('toDoToolbar');
  parentElement.appendChild(toolbar);

  let toDoTitle = document.createElement('div');
  toDoTitle.classList.add('toDoTitle');
  toDoTitle.innerText = toDo.title;
  toolbar.appendChild(toDoTitle);

  let done = document.createElement('img');
  done.classList.add('toDoToolbarIcon');
  done.src = completedIcon;
  done.addEventListener('click', function (e) {
    alert(`${toDo.title} is done!`);
  });
  toolbar.appendChild(done);

  let edit = document.createElement('img');
  edit.classList.add('toDoToolbarIcon');
  edit.src = editIcon;
  edit.addEventListener('click', function (e) {
    alert('Fuck off');
  });
  toolbar.appendChild(edit);

  let del = document.createElement('img');
  del.classList.add('toDoToolbarIcon');
  del.src = deleteIcon;
  del.addEventListener('click', function (e) {
    currentProject.removeToDo(toDo);
  });
  toolbar.appendChild(del);
}
