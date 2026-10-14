import { useState } from "react";
import "./App.css";
import Filter from "./enums";

function TodoForm({ onAdd }) {
  const [text, setText] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    const newText = text.trim();
    if (!newText) return;

    onAdd(newText);
    setText("");
  }

  return (
    <form className="todoForm" onSubmit={handleSubmit}>
      <input
        onChange={(event) => setText(event.target.value)}
        placeholder="Add a task..."
        value={text}
      />
      <button type="submit">Add task</button>
    </form>
  );
}

function TodoItem({ todo, onToggle, onDelete, onEdit, currentFilter }) {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(todo.text);

  function saveEdit(event) {
    event.preventDefault();
    const updatedText = text.trim();
    if (!updatedText) return;

    onEdit(todo.id, updatedText);
    setIsEditing(false);
  }

  return (
    <li className="todoItem">
      <input
        checked={todo.isComplete}
        onChange={() => onToggle(todo.id)}
        type="checkbox"
      />
      {isEditing ? (
        <form className="editForm" onSubmit={saveEdit}>
          <input
            onChange={(event) => setText(event.target.value)}
            value={text}
          />
          <button type="submit">Save</button>
          <button type="button" onClick={() => setIsEditing(false)}>
            Cancel
          </button>
        </form>
      ) : (
        <>
          <span
            className={todo.isComplete ? "todoText isComplete" : "todoText"}
          >
            {todo.text}
          </span>
          <div className="todoActions">
            {currentFilter === Filter.ALL ? (
              <>
                <button
                  onClick={() => {
                    setText(todo.text);
                    setIsEditing(true);
                  }}
                >
                  Edit
                </button>
                <button onClick={() => onDelete(todo)} className="deleteButton">
                  Delete
                </button>
              </>
            ) : null}
          </div>
        </>
      )}
    </li>
  );
}

function TodoList({ todos, onToggle, onDelete, onEdit, currentFilter }) {
  if (todos.length === 0) {
    return <p className="emptyState">No todo is available</p>;
  }

  return (
    <ul className="todoList">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          onDelete={onDelete}
          onEdit={onEdit}
          onToggle={onToggle}
          todo={todo}
          currentFilter={currentFilter}
        />
      ))}
    </ul>
  );
}

export default function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState([]);
  const [currentFilter, setCurrentFilter] = useState(Filter.ALL);

  function addTodo(text) {
    const newTodo = { id: Date.now(), text, isComplete: false };
    setTodos((currentTodos) => [...currentTodos, newTodo]);
    setFilter((currentTodos) => [...currentTodos, newTodo]);
  }

  function toggleTodo(id) {
    const updatedTodos = todos
      .map((todo) =>
        todo.id === id ? { ...todo, isComplete: !todo.isComplete } : todo,
      )
      .sort((a, b) => b.isComplete - a.isComplete);

    setTodos(updatedTodos);
    setFilter(updatedTodos);
  }

  function deleteTodo(todo) {
    const updatedTodos = todos.filter(
      (t) => !(t.id == todo.id && todo.isComplete),
    );
    setTodos(updatedTodos);
    setFilter(updatedTodos);
  }

  function editTodo(id, text) {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, text } : todo,
    );
    setTodos(updatedTodos);
    setFilter(updatedTodos);
  }

  function fetchAllTodos() {
    setFilter(todos);
    setCurrentFilter(Filter.ALL);
  }

  function fetchCompletedTodos() {
    const filter = todos.filter((todo) => todo.isComplete);
    setFilter(filter);
    setCurrentFilter(Filter.COMPLETED);
  }

  function fetchPendingTodos() {
    const filter = todos.filter((todo) => !todo.isComplete);
    setFilter(filter);
    setCurrentFilter(Filter.PENDING);
  }

  const remainingCount = todos.filter((todo) => !todo.isComplete).length;

  return (
    <main className="appShell">
      <header className="appHeader">
        <h1>Your TODO list</h1>
      </header>
      <TodoForm onAdd={addTodo} />
      {todos.length > 0 ? (
        <div className="filterButtons">
          <button
            style={{ opacity: currentFilter === Filter.ALL ? 1 : 0.6 }}
            value={Filter.ALL}
            onClick={fetchAllTodos}
          >
            All
          </button>
          <button
            style={{ opacity: currentFilter === Filter.COMPLETED ? 1 : 0.6 }}
            value={Filter.COMPLETED}
            onClick={fetchCompletedTodos}
          >
            Done
          </button>
          <button
            style={{ opacity: currentFilter === Filter.PENDING ? 1 : 0.6 }}
            value={Filter.PENDING}
            onClick={fetchPendingTodos}
          >
            Todo
          </button>
        </div>
      ) : null}
      <section className="tasksSection">
        <div className="listHeading">
          <h2>Things to do</h2>
          <span>{remainingCount} left</span>
        </div>
        <TodoList
          todos={filter}
          onToggle={toggleTodo}
          onDelete={deleteTodo}
          onEdit={editTodo}
          currentFilter={currentFilter}
        />
      </section>
    </main>
  );
}
