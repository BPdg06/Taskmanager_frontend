import React from "react";

const Display = (props) => {
    // destruct the todos from props
    const { todos, selectTodo, history } = props
  
    // Returns the JSX for when you have todos
    const loaded = () => (
      <div style={{textAlign: "center"}}>
        {todos.map((todo) => (
          <article key={todo._id}>
            <h3>{todo.item}</h3>
            <button onClick={() => {
              selectTodo(todo)
              history.push("/edit")
            }}>
              Edit
            </button>
            <button onClick={() => {
              props.deleteTodo(todo)
            }}>
              Delete
            </button>
          </article>
        ))}
      </div>
    )
  
    const loading = () => <h1>Loading</h1>
  
    return todos.length > 0 ? loaded() : loading()
  };
  
  export default Display;