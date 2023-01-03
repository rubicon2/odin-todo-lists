export default class ToDo {
  constructor(
    title = 'New Item',
    dueDate = new Date(),
    description = '',
    priority = 'normal'
  ) {
    this.title = title;
    this.dueDate = dueDate;
    this.priority = priority;
    this.description = description;
  }
}
