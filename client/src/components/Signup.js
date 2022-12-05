import React from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";

const Signup = ({ handleLogin, handleAddUser }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [profileImg, setProfileImg] = useState("");

  const [errors, setErrors] = useState([]);
  const history = useHistory();

  function handleSubmit(e) {
    e.preventDefault();
    const newUser = {
      username: username,
      email: email,
      password: password,
      first_name: firstName,
      last_name: lastName,
      profile_img: profileImg,
    };

    fetch("/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newUser),
    }).then((res) => {
      if (res.ok) {
        res.json().then((user) => {
          handleLogin(user);
          handleAddUser(user);
          history.push(`/profile`);
        });
      } else {
        res.json().then((json) => setErrors(Object.entries(json.errors)));
      }
    });
  }
  return (
    <div className="singlePageImgBackground">
      <div className="signupCard">
        <h2 className="form-card-heading">
          Get started
          <br></br>
          <small>Create your account</small>
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="input">
            <label className="input-label"></label>
            <input
              value={username}
              type="text"
              placeholder="Username..."
              onChange={(e) => setUsername(e.target.value)}
              className="input-field"
            ></input>
          </div>
          <div className="input">
            <label className="input-label"></label>
            <input
              value={email}
              type="text"
              placeholder="Email..."
              onChange={(e) => setEmail(e.target.value)}
              className="input-field"
            ></input>
          </div>
          <div className="input">
            <label className="input-label"></label>
            <input
              value={password}
              type="password"
              placeholder="Password..."
              onChange={(e) => setPassword(e.target.value)}
              className="input-field"
            ></input>
          </div>
          <div className="input">
            <label className="input-label"></label>
            <input
              value={firstName}
              type="text"
              placeholder="First Name..."
              onChange={(e) => setFirstName(e.target.value)}
              className="input-field"
            ></input>
          </div>
          <div className="input">
            <label className="input-label"></label>
            <input
              value={lastName}
              type="text"
              placeholder="Last Name..."
              onChange={(e) => setLastName(e.target.value)}
              className="input-field"
            ></input>
          </div>
          <div className="input">
            <label className="input-label"></label>
            <input
              value={profileImg}
              type="text"
              placeholder="Profile Image..."
              onChange={(e) => setProfileImg(e.target.value)}
              className="input-field"
            ></input>
          </div>
          <button type="submit">Create Account</button>
        </form>
        {errors ? errors.map((e) => <div key={e}>{e[1]}</div>) : null}
      </div>
    </div>
  );
};

export default Signup;
