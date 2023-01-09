export default class ToDo {
  constructor(
    title = 'New Item',
    dueDate = new Date(),
    description = '',
    priority = 'normal'
  ) {
    this.title = title;
    this.dueDate = this.extractDateFromDateInputString(dueDate);
    this.priority = priority;
    this.description = description;
  }

  extractDateFromDateInputString(string) {
    // HTML date input format: yyyy-mm-dd
    let split = string.split('-');
    return new Date(split[0], split[1], split[2]);
  }

  get isDue() {
    return this.dueDate.getTime() <= Date.now();
  }
}
