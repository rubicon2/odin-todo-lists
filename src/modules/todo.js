import { publish } from './pubsub';

export default class ToDo {
  #isCompleted;

  constructor(
    title = 'New Item',
    dueDate = new Date(),
    description = '',
    priority = 'normal',
    isCompleted = false
  ) {
    this.title = title;
    this.dueDate = this.extractDateFromDateInputString(dueDate);
    this.priority = priority;
    this.description = description;
    this.#isCompleted = isCompleted;
  }

  extractDateFromDateInputString(string) {
    // HTML date input format: yyyy-mm-dd
    let split = string.split('-');
    return new Date(split[0], split[1], split[2]);
  }

  get isDue() {
    return this.dueDate.getTime() <= Date.now();
  }

  get completed() {
    return this.#isCompleted;
  }

  set completed(value) {
    this.#isCompleted = value;
    publish('onToDoChange', this);
  }
}
