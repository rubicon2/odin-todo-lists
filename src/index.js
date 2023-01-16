import './style.css';

import { default as createProjectListAside } from './components/projectListAside';
import { default as createProjectDisplayMain } from './components/projectDisplayMain';
import createProjectBar from './components/projectBar';
import { initialise as initialiseData } from './modules/saveLoadData';

const body = document.querySelector('body');

createProjectListAside(body);
createProjectBar(body);
createProjectDisplayMain(body);

initialiseData();
