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
  createNewProjectLink();

  subscribe('onNewProject', createProjectList);
}

function createProjectListTitle() {
  let div = document.createElement('span');
  div.classList.add('projectListTitle');
  div.innerText = 'Projects';
  container.appendChild(div);
}

function createProjectList(projects) {
  // Clear out any existing projectList element before we create the new one
  if (projectList !== null) projectList.remove();

  let ul = document.createElement('ul');
  ul.classList.add('projectList');
  projectList = ul;

  projects.forEach(function (project) {
    createProjectListItem(ul, project);
  });

  // Gets added to bottom (past NEW PROJECT +++) again once list is refreshed. Maybe a diff method for updating list etc?
  // Or take care of init in create()???
  container.appendChild(ul);
}

function createProjectListItem(parentElement, project) {
  let li = document.createElement('li');
  li.classList.add('projectListLink');
  li.innerText = project.name;
  li.addEventListener('click', function () {
    // Reset selected project
    document
      .querySelectorAll('.projectListLink')
      .forEach((e) => e.classList.remove('projectListLinkSelected'));
    // Set to currently selected project
    li.classList.add('projectListLinkSelected');
    publish('onProjectSelect', project);
  });
  parentElement.appendChild(li);
}

function createNewProjectLink() {
  let link = document.createElement('div');
  link.classList.add('newProjectButton');
  link.innerText = '+';
  link.addEventListener('click', () => createNewProjectDialog());
  container.appendChild(link);
}

function createNewProjectDialog() {
  let name = prompt('Project name:');
  let description = prompt('Project description:');
  new Project(name, description);
}
