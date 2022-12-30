import './style.css';

import { default as createProjectListAside } from './components/projectListAside';
import { default as createProjectDisplayMain } from './components/projectDisplayMain';
import Project from './modules/project';

const body = document.querySelector('body');

new Project('Mega Project', "Wow it's a description!!");
new Project('Mega Project 2');
new Project('Mega Project 3');

createProjectListAside(body);
createProjectDisplayMain(body);
