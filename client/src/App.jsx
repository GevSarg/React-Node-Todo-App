import { useState, useEffect } from "react";
import "./App.css";
import Todo from "./components/Todo";

function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/")
      .then((res) => res.json())
      .then((data) => setTodos(data))
      .catch((error) => console.error("Error fetching todos:", error));
  }, []);

  return <Todo todos={todos} setTodos={setTodos} />;
}

export default App;
