import Project from './project';
import { subscribe, unsubscribe, publish } from './pubsub';

export function initialise() {
  subscribe('onToDoListChange', saveData);
  subscribe('onProjectListChange', saveData);
  if (localStorage.projects != null) loadData();
}

function saveData() {
  unsubscribe('onToDoListChange', saveData);
  unsubscribe('onProjectListChange', saveData);

  localStorage.projects = JSON.stringify(Project.list);

  subscribe('onToDoListChange', saveData);
  subscribe('onProjectListChange', saveData);
}

function loadData() {
  unsubscribe('onToDoListChange', saveData);
  unsubscribe('onProjectListChange', saveData);

  Project.loadList(localStorage.projects);
  
  subscribe('onToDoListChange', saveData);
  subscribe('onProjectListChange', saveData);
}
