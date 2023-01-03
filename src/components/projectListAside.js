import Project from '../modules/project';
import { subscribe, unsubscribe, publish } from '../modules/pubsub';
import { default as createNewProjectForm } from './newProjectForm';

let container = null;
let projectList = null;

export default function create(parentElement) {
  container = document.createElement('aside');
  container.classList.add('projectListContainer');
  parentElement.appendChild(container);

  createProjectList(Project.list);
  createNewProjectLink();

  subscribe('onNewProject', createProjectList);
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
  link.addEventListener('click', () =>
    createNewProjectForm(document.querySelector('body'))
  );
  container.appendChild(link);
}
