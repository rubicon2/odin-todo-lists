import Project from '../modules/project';
import { subscribe, unsubscribe, publish } from '../modules/pubsub';
import { default as createNewProjectForm } from './newProjectForm';

// DOM elements
let container = null;
let projectList = null;
// Used to associate each list element with a project in Project.list
let projectListItems = [];

export default function create(parentElement) {
  container = document.createElement('aside');
  container.classList.add('projectListContainer');
  parentElement.appendChild(container);

  createProjectList(Project.sortListByName());

  createNewProjectLink();

  subscribe('onProjectListChange', updateProjectList);
  subscribe('onToDoListChange', updateProjectSummary);
}

function updateProjectSummary(project) {
  let listItemToUpdate = projectListItems.filter(
    (e) => e.project === project
  )[0];
  listItemToUpdate.titleElement.innerText = project.name;
  listItemToUpdate.toDoCountElement.innerText = project.toDoList.length;
  listItemToUpdate.dueCountElement.innerText = project.dueCount;
}

function updateProjectList() {
  document.querySelector('.projectList')?.remove();
  projectListItems = [];
  createProjectList(Project.sortListByName());
}

function createProjectList(projects) {
  projectList = document.createElement('ul');
  projectList.classList.add('projectList');

  projects.forEach(function (project) {
    createProjectListItem(project);
  });

  container.appendChild(projectList);
}

function createProjectListItem(project) {
  let li = document.createElement('li');
  li.classList.add('projectListItem');

  li.addEventListener('click', function () {
    // Reset the previously selected project to unselected
    document
      .querySelectorAll('.projectListItem')
      .forEach((e) => e.classList.remove('projectListItemSelected'));
    // Set to currently selected project
    li.classList.add('projectListItemSelected');
    publish('onProjectSelect', project);
  });

  projectList.appendChild(li);

  let projectTitle = document.createElement('div');
  projectTitle.classList.add('projectListItemTitle');
  projectTitle.innerText = project.name;
  li.appendChild(projectTitle);

  let toDoCount = document.createElement('div');
  toDoCount.classList.add('projectListToDoCount');
  toDoCount.innerText = project.toDoList.length;
  li.appendChild(toDoCount);

  let dueCount = document.createElement('div');
  dueCount.classList.add('projectListItemDueCount');
  dueCount.innerText = project.dueCount;
  li.appendChild(dueCount);

  projectListItems.push({
    project: project,
    titleElement: projectTitle,
    toDoCountElement: toDoCount,
    dueCountElement: dueCount,
  });
}

function removeProjectListItem(project) {
  let listItemsToRemove = projectListItems.filter((e) => e.project === project);
  listItemsToRemove.forEach((e) => e.remove());
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
