import { publish } from './pubsub';
import ToDo from './todo';

export default class Project {
  static list = [];

  static loadList(jsonString) {
    let projects = JSON.parse(jsonString);
    for (let p of projects) {
      let toDoList = [];
      for (let toDo of p.toDoList) {
        toDoList.push(
          new ToDo(
            toDo.title,
            toDo.dueDate,
            toDo.description,
            toDo.priority,
            toDo.isCompleted
          )
        );
      }
      new Project(p.name, p.description, toDoList);
    }
  }

  static sortListByName() {
    return Project.list.sort(function (a, b) {
      return a.name < b.name ? -1 : 1;
    });
  }

  constructor(name = 'New Project', description = '', toDoList = []) {
    this.name = name;
    this.description = description;
    this.toDoList = toDoList;
    Project.list.push(this);
    publish('onNewProject', this);
    publish('onProjectListChange', Project.list);
  }

  delete() {
    list = list.filter(function (e) {
      return e != this;
    });
    publish('onProjectDelete', this);
    publish('onProjectListChange', Project.list);
    delete this;
  }

  addToDo(newToDo) {
    this.toDoList.push(newToDo);
    publish('onToDoAdded', newToDo);
    publish('onToDoListChange', this);
  }

  removeToDo(toDoToRemove) {
    this.toDoList = this.toDoList.filter((toDo) => toDo !== toDoToRemove);
    publish('onToDoRemoved', toDoToRemove);
    publish('onToDoListChange', this);
  }

  get openItems() {
    return this.toDoList.filter((e) => !e.completed);
  }

  get closedItems() {
    return this.toDoList.filter((e) => e.completed);
  }

  get dueItems() {
    return this.toDoList.filter((e) => e.isDue);
  }

  get notDueItems() {
    return this.toDoList.filter((e) => !e.isDue && !e.completed);
  }

  get dueCount() {
    let dueCount = 0;
    return this.toDoList.reduce(
      (accumulator, currentToDo) => accumulator + currentToDo.isDue,
      dueCount
    );
  }
}
