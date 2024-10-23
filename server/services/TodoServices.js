class TodoServices {
  constructor(models) {
    this.models = models;
  }

  async getTodos() {
    const todos = await this.models.todos.find();
    return todos;
  }
  async addTodo(data) {
    const newTodo = await this.models.todos.create(data);
    return newTodo;
  }
  async toggleTodo(id) {
    const todo = await this.models.todos.findById(id);
    todo.isDone = !todo.isDone;
    const updatedTodo = await todo.save();

    return updatedTodo;
  }

  async editTodo(id, body) {
    const todo = await this.models.todos.findById(id);
    todo.title = body.title;
    const updatedTodo = await todo.save();

    return updatedTodo;
  }

  async deleteTodo(id) {
    await this.models.todos.deleteOne({ _id: id });
  }
}

module.exports = TodoServices;
