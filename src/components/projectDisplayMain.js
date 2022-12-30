import { subscribe, unsubscribe, publish } from '../modules/pubsub';

let container = null;
let currentProject = null;

export default function create(parentElement) {
  container = document.createElement('main');
  container.classList.add('projectDisplayContainer');
  parentElement.appendChild(container);

  subscribe('onProjectSelect', displayProject);
}

function displayProject(project) {
  if (currentProject !== null) currentProject.remove();
  currentProject = document.createElement('div');

  let title = document.createElement('span');
  title.innerText = project.name;

  let description = document.createElement('p');
  description.innerText = project.description;

  currentProject.appendChild(title);
  currentProject.appendChild(description);

  container.appendChild(currentProject);
}
