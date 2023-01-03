import ToDo from '../modules/todo';
import { default as createCenteredOverlay } from './centeredOverlay';

export default function createNewToDoForm(parentElement, project) {
  let background = createCenteredOverlay(parentElement);

  let form = document.createElement('form');
  form.classList.add('newToDoForm');
  background.appendChild(form);

  let formHeading = document.createElement('div');
  formHeading.classList.add('formHeading');
  formHeading.innerText = 'New To Do';
  form.appendChild(formHeading);

  let title = createInput(form, 'title', 'text', 'Title:');
  title.required = true;
  let description = createInput(form, 'description', 'text', 'Description:');
  let dueDate = createInput(form, 'due-date', 'date', 'Due date:');
  dueDate.required = true;
  let priority = createInput(form, 'priority', 'text', 'Priority:');
  priority.required = true;

  let buttons = document.createElement('div');
  buttons.classList.add('formItem');

  let cancelButton = document.createElement('button');
  cancelButton.type = 'button';
  cancelButton.innerText = 'Cancel';
  cancelButton.addEventListener('click', function (e) {
    background.remove();
  });
  buttons.appendChild(cancelButton);

  let submitButton = document.createElement('button');
  submitButton.type = 'button';
  submitButton.innerText = 'Add';
  submitButton.addEventListener('click', function (e) {
    if (form.reportValidity()) {
      project.addToDo(
        new ToDo(title.value, dueDate.value, description.value, priority.value)
      );
      background.remove();
    }
  });
  buttons.appendChild(submitButton);

  form.appendChild(buttons);
}

function createInput(parentForm, inputName, inputType, labelText) {
  let formItem = document.createElement('div');
  formItem.classList.add('formItem');

  let formLabel = document.createElement('label');
  formLabel.innerText = labelText;
  formLabel.for = inputName;
  formItem.appendChild(formLabel);

  let formInput = document.createElement('input');
  formInput.type = inputType;
  formInput.name = inputName;
  formInput.id = inputName;
  formItem.appendChild(formInput);

  parentForm.appendChild(formItem);
  return formInput;
}
