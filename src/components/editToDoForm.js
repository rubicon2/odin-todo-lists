import { publish } from '../modules/pubsub';
import ToDo from '../modules/todo';
import { default as createCenteredOverlay } from './centeredOverlay';

export default function createEditToDoForm(parentElement, project, toDo) {
  let background = createCenteredOverlay(parentElement);

  let form = document.createElement('form');
  form.classList.add('newToDoForm');
  background.appendChild(form);

  let formHeading = document.createElement('div');
  formHeading.classList.add('formHeading');
  formHeading.innerText = 'Edit To Do';
  form.appendChild(formHeading);

  let title = createInput(form, 'title', 'text', 'Title:');
  title.required = true;
  title.value = toDo.title;

  let description = createInput(form, 'description', 'text', 'Description:');
  description.value = toDo.description;

  let dueDate = createInput(form, 'due-date', 'date', 'Due date:');
  dueDate.required = true;
  dueDate.value = toDo.dueDateInHTMLInputFormat;

  let priority = createSelect(form, 'priorty', 'Priority:', [
    { displayText: 'Low', value: 'low' },
    { displayText: 'Mid', value: 'mid' },
    { displayText: 'High', value: 'high' },
  ]);
  priority.required = true;
  priority.value = toDo.priority;

  let buttons = document.createElement('div');
  buttons.classList.add('formItem');

  let cancelButton = document.createElement('button');
  cancelButton.type = 'button';
  cancelButton.innerText = 'Cancel';
  cancelButton.addEventListener('click', function () {
    background.remove();
  });
  buttons.appendChild(cancelButton);

  let submitButton = document.createElement('button');
  submitButton.type = 'button';
  submitButton.innerText = 'Save';
  submitButton.addEventListener('click', function () {
    if (form.reportValidity()) {
      toDo.title = title.value;
      toDo.description = description.value;
      toDo.dueDate = new Date(dueDate.value);
      toDo.priority = priority.value;
      background.remove();
      publish('onToDoChange', toDo);
      publish('onToDoListChange', project);
    }
  });
  buttons.appendChild(submitButton);

  form.appendChild(buttons);
}

function createSelect(parentForm, inputName, labelText, options) {
  let formItem = document.createElement('div');
  formItem.classList.add('formItem');
  parentForm.appendChild(formItem);

  let formLabel = document.createElement('label');
  formLabel.innerText = labelText;
  formLabel.for = inputName;
  formItem.appendChild(formLabel);

  let selectInput = document.createElement('select');
  selectInput.name = inputName;
  selectInput.id = inputName;
  formItem.appendChild(selectInput);

  options.forEach((element) => {
    let option = document.createElement('option');
    option.value = element.value;
    option.innerText = element.displayText;
    selectInput.appendChild(option);
  });

  return selectInput;
}

function createInput(parentForm, inputName, inputType, labelText) {
  let formItem = document.createElement('div');
  formItem.classList.add('formItem');
  parentForm.appendChild(formItem);

  let formLabel = document.createElement('label');
  formLabel.innerText = labelText;
  formLabel.for = inputName;
  formItem.appendChild(formLabel);

  let formInput = document.createElement('input');
  formInput.type = inputType;
  formInput.name = inputName;
  formInput.id = inputName;
  formItem.appendChild(formInput);

  return formInput;
}
