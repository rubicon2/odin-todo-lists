import { publish } from './pubsub';

export default class Project {
  static list = [];

  constructor(name = 'New Project', description = '', toDoList = []) {
    this.name = name;
    this.description = description;
    this.toDoList = toDoList;
    Project.list.push(this);
    publish('onNewProject', Project.list);
  }

  addToDo(newToDo) {
    this.toDoList.push(newToDo);
    publish('onToDoAdded', this);
  }

  removeToDo(toDoToRemove) {
    this.toDoList = this.toDoList.filter((toDo) => toDo !== toDoToRemove);
    publish('onToDoRemoved', this);
  }
}
