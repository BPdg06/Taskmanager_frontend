import './App.css';
import {Route} from "react-router-dom";
import React from "react";
import Login from "./pages/Login";
import Todos from "./pages/Todos";

function App(props) {

  const [token, setToken] = React.useState({})

  const URL = "https://taskmanagerdjangobackendbp.herokuapp.com/"

  const getToken = async (loginUsername, loginPassword) => {
    const response = await fetch(URL + "api/token/", {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({username: loginUsername, password: loginPassword})
    })
    const data = await response.json()
    console.log(data)
    setToken(data)
    localStorage.setItem("token", JSON.stringify(data))
  }

  React.useEffect(() => {
    const possibleToken = JSON.parse(localStorage.getItem("token"))
    if (possibleToken){
      setToken(possibleToken)
    }
  }, [])

  React.useEffect(() => {

    if(token.access){
      props.history.push("/todos")
    } else {
      props.history.push("/")
    }
  }, [token.access])

  return (
    <div className="App">
      <h1>My To-Do List</h1>

      <Route exact path="/" render={(rp) => <Login getToken={getToken} {...rp}/>}/>

      <Route path="/todos" render={(rp) => <Todos tokens={token} URL={URL} {...rp}/>}/>
    </div>
  );
}

export default App;
