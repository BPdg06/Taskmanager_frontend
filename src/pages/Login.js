import React from "react";

const Login = (props) => {

    const username = React.useRef(null)
    const password = React.useRef(null)

    const handleLogin = (event) => {
        const loginUsername = username.current.value
        const loginPassword = password.current.value

        props.getToken(loginUsername, loginPassword)

        username.current.value = ""
        password.current.value = ""
    }
    return <div>
        <input type="text" name="username" ref={username}/>
        <input type="password" name="password" ref={password}/>
        <button onClick={handleLogin}>Login</button>
    </div>
}

export default Login;
