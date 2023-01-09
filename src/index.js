import './style.css';

import { default as createProjectListAside } from './components/projectListAside';
import { default as createProjectDisplayMain } from './components/projectDisplayMain';
import Project from './modules/project';
import createProjectBar from './components/projectBar';

const body = document.querySelector('body');

new Project(
  'Mega Project: Return of The Plumbuses',
  "Wow it's a description!!"
);
new Project('Mega Project 2');
new Project('Mega Project 3');

createProjectListAside(body);
createProjectBar(body);
createProjectDisplayMain(body);
