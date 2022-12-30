export default class ToDo {
  constructor(
    parentProject = 'Unassigned',
    title = 'New Item',
    dueDate = new Date(),
    description = '',
    priority = 'normal'
  ) {
    this.parentProject = parentProject;
    this.title = title;
    this.dueDate = dueDate;
    this.priority = priority;
    this.description = description;
  }
}
