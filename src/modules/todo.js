import { publish } from './pubsub';
import { floorTimeToDay } from './dates';

export default class ToDo {
  #isCompleted;

  constructor(
    title = 'New Item',
    dueDateString = new Date(),
    description = '',
    priority = 'normal',
    isCompleted = false
  ) {
    this.title = title;
    this.dueDate = new Date(dueDateString);
    this.priority = priority;
    this.description = description;
    this.#isCompleted = isCompleted;
  }

  get isDue() {
    return this.#isCompleted
      ? false
      : floorTimeToDay(this.dueDate.getTime()) <= floorTimeToDay(Date.now());
  }

  get completed() {
    return this.#isCompleted;
  }

  set completed(value) {
    this.#isCompleted = value;
    publish('onToDoChange', this);
  }
}
