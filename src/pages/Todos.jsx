import React, { useState, useEffect } from "react";
import DateTime from "../JS/time";
import AddTodoForm from "../components/AddTodoForm";
import TodoList from "../components/TodoList";

import {
  getTodosAPI,
  addTodoAPI,
  updateTodoAPI,
  deleteTodoAPI,
} from "../features/todos/todosAPI";

const THEMES = ["standard", "light", "darker"];

function Todos() {
  const [todos, setTodos] = useState([]);
  const [theme, setTheme] = useState(() => localStorage.getItem("savedTheme") || "standard");
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(true);

  // Load todos from localStorage first, else fetch from API
  useEffect(() => {
    const savedTodos = localStorage.getItem("todos");
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos));
      setLoading(false);
    } else {
      async function fetchTodos() {
        try {
          setLoading(true);
          const data = await getTodosAPI();
          setTodos(data);
          localStorage.setItem("todos", JSON.stringify(data)); // cache to localStorage
        } catch (error) {
          console.error("Failed to fetch todos", error);
        } finally {
          setLoading(false);
        }
      }
      fetchTodos();
    }
  }, []);

  // Save todos to localStorage whenever todos change
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  // Save theme to localStorage and apply to body class
  useEffect(() => {
    localStorage.setItem("savedTheme", theme);
    document.body.className = theme;
  }, [theme]);

  const addTodo = async () => {
    const trimmed = input.trim();
    if (!trimmed) {
      alert("You must write something!");
      return;
    }

    // Create a temporary todo to add immediately (with a fake id)
    const tempId = Date.now(); // unique local id
    const tempTodo = { id: tempId, title: trimmed, completed: false, userId: 1 };

    setTodos((prev) => [...prev, tempTodo]);
    setInput("");

    try {
      // Try to call API, then replace tempTodo with real response
      const newTodo = await addTodoAPI({ title: trimmed });
      setTodos((prev) =>
        prev.map((todo) => (todo.id === tempId ? newTodo : todo))
      );
    } catch (error) {
      console.error("Failed to add todo to API, keeping local todo", error);
      // keep temp todo if API fails
    }
  };

  const toggleComplete = async (index) => {
    const todo = todos[index];
    const updatedTodo = { ...todo, completed: !todo.completed };

    setTodos((prev) =>
      prev.map((t, i) => (i === index ? updatedTodo : t))
    );

    try {
      await updateTodoAPI(updatedTodo);
      // no need to update state here as we already did it optimistically
    } catch (error) {
      console.error("Failed to update todo on API", error);
      alert("Failed to update todo. Please try again.");
    }
  };

  const deleteTodo = async (index) => {
    const todo = todos[index];
    setTodos((prev) => prev.filter((_, i) => i !== index)); // optimistic remove

    try {
      await deleteTodoAPI(todo.id);
    } catch (error) {
      console.error("Failed to delete todo on API", error);
      alert("Failed to delete todo. Please try again.");
    }
  };

  const changeTheme = (color) => {
    if (THEMES.includes(color)) setTheme(color);
  };

  console.log("Todos state:", todos);

  return (
    <>
      <div id="header">
        <div className="flexrow-container">
          {THEMES.map((t) => (
            <div
              key={t}
              className={`${t}-theme theme-selector`}
              onClick={() => changeTheme(t)}
              style={{
                cursor: "pointer",
                border: theme === t ? "2px solid #333" : "2px solid transparent",
              }}
              title={`Switch to ${t} theme`}
            />
          ))}
        </div>
        <h1 id="title" className={theme === "darker" ? "darker-title" : ""}>
          Just do it.
          <div id="border" />
        </h1>
      </div>

      <AddTodoForm theme={theme} input={input} setInput={setInput} onAdd={addTodo} />

      <div className="version">
        {/* Your GitHub corner and DateTime components here */}

        {loading ? (
          <p>Loading todos...</p>
        ) : (
          <TodoList
            todos={todos}
            theme={theme}
            toggleComplete={toggleComplete}
            deleteTodo={deleteTodo}
          />
        )}
      </div>
    </>
  );
}

export default Todos;
