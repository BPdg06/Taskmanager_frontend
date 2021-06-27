import React from "react";
import "./App.css";
import { Route, Link, Switch } from "react-router-dom";
import Display from "./pages/Display";
import Form from "./pages/Form";

function App() {
  // URL in a variable
  const url = "https://taskmanagerdjangobackendbp.herokuapp.com";

  // State to hold the list of todos
  const [todos, setTodos] = React.useState([]);

  // Empty Todo - For the Create Form
  const emptyTodo = {
    item: "",
  };

  const [selectedTodo, setSelectedTodo] = React.useState(emptyTodo);

  // Function to get list of todos
  const getTodos = () => {
    // make a get a request to this url
    fetch(url + "/todo/")
      // use .then to take action when the response comes in
      // convert data into js object
      .then((response) => response.json())
      // use the data from the response
      .then((data) => {
        setTodos(data);
      });
  };

  // useEffect, to get the data right away
  React.useEffect(() => {
    getTodos();
  }, []);

  //handleCreate - function for when the create form is submitted
  const handleCreate = (newTodo) => {
    fetch(url + "/todo/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTodo),
    }).then(() => getTodos());
  };

  // handleUpdate - function for when the edit form is submitted
  const handleUpdate = (todo) => {
    fetch(url + "/todo/" + todo._id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todo),
    }).then(() => getTodos());
  };

  // function to specify which dog we are updated
  const selectTodo = (todo) => {
    setSelectedTodo(todo);
  };

  // deleteTodo to delete inidividual todos
  const deleteTodo = (todo) => {
    fetch(url + "/todo/" + todo._id, {
      method: "delete"
    })
    .then(() => {
      getTodos()
    })
  }

  return (
    <div className="App">
      <h1>To-Do List</h1>
      <hr />
      <Link to="/create">
        <button>Add Task</button>
      </Link>
      <main>
        <Switch>
          <Route
            exact
            path="/"
            render={(rp) => (
              <Display 
              {...rp} 
              todos={todos} 
              selectTodo={selectTodo}
              deleteTodo={deleteTodo} 
              />
            )}
          />
          <Route
            exact
            path="/create"
            render={(rp) => (
              <Form
                {...rp}
                label="create"
                todo={emptyTodo}
                handleSubmit={handleCreate}
              />
            )}
          />
          <Route
            exact
            path="/edit"
            render={(rp) => (
              <Form 
              {...rp} 
              label="update" 
              todo={selectedTodo} 
              handleSubmit={handleUpdate} />
            )}
          />
        </Switch>
      </main>
    </div>
  );
}

export default App;