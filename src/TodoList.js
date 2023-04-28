import React, { useState } from "react";
//functional component
function TodoList() {

  // setting up 3 state variable using  useState hook
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [completedTodos, setCompletedTodos] = useState([]);
   //handling form submition
  const handleSubmit = (event) => {
    event.preventDefault();
    if (!inputValue) return;
    setTodos([...todos, { title: inputValue, completed: false }]);
    setInputValue("");
  };
    //handling completed todo's
  const handleComplete = (index) => {
    const newTodos = [...todos];
    newTodos[index].completed = true;
    setCompletedTodos([...completedTodos, newTodos[index]]);
    setTodos(newTodos.filter((todo) => !todo.completed));
  };
    // handling todo's deletion
  const handleDelete = (index) => {
    setTodos(todos.filter((todo, i) => i !== index));
    setCompletedTodos(completedTodos.filter((todo, i) => i !== index));
  };
   // returning jsx markup for the component
  return (
    <div>
      <h1 >Todo List</h1>
      <form  onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputValue}
          onChange={(event) => setInputValue(event.target.value)}
        />
        <button type="submit">Add</button>
      </form>
      <ul >
        {todos.map((todo, index) => (
          <li key={index}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => handleComplete(index)}
            />
            <span
              style={{
                textDecoration: todo.completed ? "line-through" : "none",
              }}
            >
              {todo.title}
            </span>
            <button onClick={() => handleDelete(index)}>Delete</button>
          </li>
        ))}
      </ul>
      {completedTodos.length > 0 && (
        <div>
          <h2>Completed Todos:</h2>
          <ul>
            {completedTodos.map((todo, index) => (
              <li key={index}>{todo.title}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
//expoting the application as default
export default TodoList;
