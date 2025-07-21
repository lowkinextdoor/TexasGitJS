import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Todo.css";

export default function Todo() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("https://dummyjson.com/todos")
      .then((res) => {
        setTodos(res.data.todos);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to fetch todos");
        setLoading(false);
      });
  }, []);

  const toggleTodo = (id) => {
    const updated = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updated);
  };

  const addTodo = async () => {
  if (newTodo.trim() === "") return;

  try {
    const res = await axios.post("https://dummyjson.com/todos/add", {
      todo: newTodo,
      completed: false,
      userId: 1,
    });

    setTodos([res.data, ...todos]);
    setNewTodo("");
  } catch (error) {
    console.error("Failed to add todo", error);
    alert("Failed to add todo");
  }
};

  const deleteTodo = (id) => {
    const filtered = todos.filter((todo) => todo.id !== id);
    setTodos(filtered);
  };

  if (loading) return <p>Loading todos...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="todo-container">
      <h2 className="todo-heading">Todo List</h2>

      <div className="add-todo">
        <input
          type="text"
          placeholder="Add a new task"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <button onClick={addTodo}>Add</button>
      </div>

      <ul className="todo-list">
        {todos.map((item) => (
          <li key={item.id} className="todo-item">
            <input
              type="checkbox"
              checked={item.completed}
              onChange={() => toggleTodo(item.id)}
            />
            <span className={item.completed ? "todo-text completed" : "todo-text"}>
              {item.todo}
            </span>
            <button className="delete-btn" onClick={() => deleteTodo(item.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
 