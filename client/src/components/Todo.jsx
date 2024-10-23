import "./Todo.css";

function Todo({ todos, setTodos }) {
  const addTodo = () => {
    const input = document.getElementById("todoInput");
    const newTodo = input.value.trim();

    if (newTodo === "") return;

    fetch("http://localhost:3000/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: newTodo, isDone: false }),
    })
      .then((res) => res.json())
      .then((data) => {
        setTodos([...todos, data]);
        input.value = "";
      })
      .catch((error) => console.error("Error adding todo:", error));
  };

  const deleteTodo = (id) => {
    fetch(`http://localhost:3000/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        setTodos(todos.filter((todo) => todo._id !== id));
      })
      .catch((error) => console.error("Error deleting todo:", error));
  };

  const toggleTodo = (id) => {
    const todoToToggle = todos.find((todo) => todo._id === id);
    const updatedTodo = { ...todoToToggle, isDone: !todoToToggle.isDone };

    fetch(`http://localhost:3000/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedTodo),
    })
      .then((res) => res.json())
      .then((updatedTodo) => {
        const updatedTodos = todos.map((todo) =>
          todo._id === id ? updatedTodo : todo
        );
        const sortedTodos = updatedTodos.sort((a, b) => a.isDone - b.isDone);

        setTodos(sortedTodos);
      })
      .catch((error) => console.error("Error toggling todo:", error));
  };

  return (
    <div className="container">
      <h1>Todo List</h1>
      <div>
        <input id="todoInput" type="text" placeholder="Add something..." />
        <button onClick={addTodo}>Add</button>
      </div>
      <div className="todo-box">
        {todos.map((todo) => (
          <div
            key={todo._id}
            className={`todo-item ${todo.isDone ? "is-done" : ""}`}
          >
            <p onClick={() => toggleTodo(todo._id)}>{todo.title}</p>
            <button onClick={() => deleteTodo(todo._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Todo;
