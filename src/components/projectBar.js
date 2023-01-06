import { subscribe, unsubscribe, publish } from '../modules/pubsub';
import createNewToDoForm from './newToDoForm';
import projectOptionsIconSrc from '../img/cog.svg';

let projectTitleElement = null;

let currentProject = null;

export default function createProjectBar(parentElement) {
  let projectsListBackground = document.createElement('div');
  projectsListBackground.classList.add('projectsListTitleBackground');
  parentElement.appendChild(projectsListBackground);

  let projectsListTitle = document.createElement('span');
  projectsListTitle.classList.add('projectsListTitle');
  projectsListTitle.innerText = 'Projects';
  projectsListBackground.appendChild(projectsListTitle);

  let menuBar = document.createElement('div');
  menuBar.classList.add('projectDisplayMenuBar');
  parentElement.appendChild(menuBar);

  projectTitleElement = document.createElement('span');
  projectTitleElement.classList.add('projectTitle');
  projectTitleElement.innerText = 'Unassigned';
  menuBar.appendChild(projectTitleElement);

  let newToDoIcon = document.createElement('span');
  newToDoIcon.classList.add('newToDoButton');
  newToDoIcon.innerText = '+';
  newToDoIcon.addEventListener('click', function () {
    createNewToDoForm(document.querySelector('body'), currentProject);
  });
  menuBar.appendChild(newToDoIcon);

  let projectOptionsIcon = document.createElement('img');
  projectOptionsIcon.classList.add('projectOptionsIcon');
  projectOptionsIcon.src = projectOptionsIconSrc;
  projectOptionsIcon.addEventListener('click', function () {
    alert(`${this} was clicked!`);
  });
  menuBar.appendChild(projectOptionsIcon);

  subscribe('onProjectSelect', updateProjectName);
}

function updateProjectName(project) {
  currentProject = project;
  projectTitleElement.innerText = project.name;
}
