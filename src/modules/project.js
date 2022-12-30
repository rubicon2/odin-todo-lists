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
}
