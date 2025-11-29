import React from "react";

function TodoItem({ todo, theme, onToggleComplete, onDelete }) {
  return (
    <li className={`todo ${theme}-todo ${todo.completed ? "completed" : ""}`}>
      <span className="todo-item">{todo.text}</span>
      <button
        className={`check-btn ${theme}-button`}
        onClick={onToggleComplete}
        aria-label="Toggle complete"
        type="button"
      >
        <i className="fas fa-check"></i>
      </button>
      <button
        className={`delete-btn ${theme}-button`}
        onClick={onDelete}
        aria-label="Delete todo"
        type="button"
      >
        <i className="fas fa-trash"></i>
      </button>
    </li>
  );
}

export default TodoItem;
