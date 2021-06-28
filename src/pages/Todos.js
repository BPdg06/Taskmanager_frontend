import React from "react";
import Login from "./Login";

const Todos = (props) => {

    const [todos, setTodos] = React.useState(null)

    const emptyTodo = {
        todo: ""
    }

    const [selectedTodo, setSelectedTodo] = React.useState(emptyTodo);

    const getTodos = async () => {
        const response = await fetch(props.URL + "todo/", {
            method: "get",
            headers: {
                Authorization: `Bearer ${props.tokens.access}`
            }
        })
        const data = await response.json()
        console.log(data)
        setTodos(data)
    }

    React.useEffect(() => getTodos(), [])

    const newTodo = React.useRef(null)

    const handleNew = async(event) => {
        const response = await fetch(props.URL + "todo/", {
            method: "post",
            headers: {
                Authorization: `Bearer ${props.tokens.access}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({item: newTodo.current.value})
        })

        getTodos()
        newTodo.current.value = ""
    }

    //

    const handleUpdate = async(item) => {
        const response = await fetch(props.URL + "todo/" + item.id, {
            method: "put",
            headers: {
                Authorization: `Bearer ${props.tokens.access}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({item: newTodo.current.value})
        })

        getTodos()
        newTodo.current.value = ""
    }

    const selectTodo = (item) => {
        setSelectedTodo(item);
    }

    const handleDelete = async(item) => {
      console.log(item, "this is the handleDelete")
      
        const response = await fetch(props.URL + "todo/" + item.id, {
            method: "delete",
            headers: {
                Authorization: `Bearer ${props.tokens.access}`
            },
        })

        getTodos()
        newTodo.current.value = ""
    }

    return <>
    <h1>Todos</h1>
    <input type="text" name="newtodo" ref={newTodo}/>
    <button onClick={handleNew}>New Todo</button>
    
    <ul>
        {todos && todos.length > 0 ? todos.map(todo => {
          return ( 
          <li>
            <h1>{todo.item}</h1>
            <button onClick={() => handleUpdate(todo)}>Edit</button>
            <button onClick={() => handleDelete(todo)}>Delete</button>
          </li>
          )
        }) : null}
    </ul>
    </>
}

export default Todos;
