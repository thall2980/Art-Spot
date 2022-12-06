import React from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";

const Login = ({ handleLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const history = useHistory();

  function handleSubmit(e) {
    e.preventDefault();
    const newLogin = {
      username: username,
      password: password,
    };

    fetch("/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newLogin),
    }).then((res) => {
      if (res.ok) {
        res.json().then((user) => {
          history.push(`/profile`);
          handleLogin(user);
        });
      } else {
        res.json().then((json) => setErrors(Object.entries(json.errors)));
      }
    });
  }

  return (
    <div className="singlePageImgBackground">
      <div className="signupCard">
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Login</h2>
        <img className= "login-img" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSeXJZ699js6Q4moAfAlzMb6XAqr9_3AB2KTA&usqp=CAU" alt="login"></img>
        <div className="login-form">
          <div>
            <label>Username: </label>
            <input
              value={username}
              type="text"
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
            ></input>
          </div>
          <br></br>
          <label>Password: </label>
          <input
            placeholder="Password"
            value={password}
            label="Password"
            type="password"
            autoComplete="on"
            onChange={(e) => setPassword(e.target.value)}
          ></input>
          <br></br>
          <br></br>
          <button type="submit">Login</button>
        </div>
      </form>
      {errors ? errors.map((e) => <div>{e[1]}</div>) : null}
    </div>
    </div>
  );
};

export default Login;
