class TodoControllers {
  async getTodos(req, res) {
    try {
      const todos = await req.app.locals.services.todos.getTodos();
      res.status(200).json(todos);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch todos" });
    }
  }
  async addTodo(req, res) {
    try {
      const newTodo = await req.app.locals.services.todos.addTodo(req.body);
      res.status(201).json(newTodo);
    } catch (error) {
      res.status(500).json({ message: "Failed to add todo" });
    }
  }
  async toggleTodo(req, res) {
    try {
      const { id } = req.params;
      const updatedTodo = await req.app.locals.services.todos.toggleTodo(id);
      res.status(200).json(updatedTodo);
    } catch (error) {
      res.status(500).json({ message: "Failed to toggle todo" });
    }
  }
  async editTodo(req, res) {
    try {
      const { id } = req.params;
      const updatedTodo = await req.app.locals.services.todos.toggleTodo(
        id,
        req.body
      );
      res.status(200).json(updatedTodo);
    } catch (error) {}
  }

  async deleteTodo(req, res) {
    try {
      const { id } = req.params;
      await req.app.locals.services.todos.deleteTodo(id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Failed to delete todo" });
    }
  }
  async;
}

module.exports = TodoControllers;
