import React from "react";

function AddTodoForm({ theme, input, setInput, onAdd }) {
  return (
    <div id="form">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onAdd();
        }}
      >
        <input
          className={`${theme}-input todo-input`}
          type="text"
          placeholder="Add a task."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button className={`todo-btn ${theme}-button`} type="submit">
          I Got This!
        </button>
      </form>
    </div>
  );
}

export default AddTodoForm;
