import Project from '../modules/project';
import { subscribe, unsubscribe, publish } from '../modules/pubsub';

let container = null;
let projectList = null;

export default function create(parentElement) {
  container = document.createElement('aside');
  container.classList.add('projectListContainer');
  parentElement.appendChild(container);

  createProjectListTitle();
  createProjectList(Project.list);

  subscribe('onNewProject', createProjectList);
}

function createProjectListTitle() {
  let span = document.createElement('span');
  span.classList.add('projectListTitle');
  span.innerText = 'Projects';
  container.appendChild(span);
}

function createProjectList(projects) {
  if (projectList !== null) projectList.remove();
  let ul = document.createElement('ul');
  ul.classList.add('projectList');
  projects.forEach(function (project) {
    createProjectListItem(ul, project);
  });
  projectList = ul;
  container.appendChild(ul);
}

function createProjectListItem(parentElement, project) {
  let li = document.createElement('li');
  li.classList.add('projectListLink');
  li.innerText = project.name;
  li.addEventListener('click', function () {
    publish('onProjectSelect', project);
  });
  parentElement.appendChild(li);
}
