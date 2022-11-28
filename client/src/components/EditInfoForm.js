import React from "react";
import { useState } from "react";

const EditInfoForm = ({ user, handleUpdateUser, handleStopEdit }) => {
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [firstName, setFirstName] = useState(user.first_name);
  const [lastName, setLastName] = useState(user.last_name);
  const [profileImg, setProfileImg] = useState(user.profile_img);
  const [bio, setBio] = useState(user.bio);

  const [errors, setErrors] = useState([]);

  function handleSubmit(e) {
    e.preventDefault();
    const update = {
      username: username,
      email: email,
      first_name: firstName,
      last_name: lastName,
      profile_img: profileImg,
      bio: bio,
    };

    fetch(`/users/${user.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(update),
    }).then((res) => {
      if (res.ok) {
        res.json().then((user) => {
          handleUpdateUser(user);
          handleStopEdit()
        });
      } else {
        res.json().then((json) => setErrors(Object.entries(json.errors)));
      }
    });
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="input">
          <label className="input-label">Username</label>
          <br />
          <input
            value={username}
            type="text"
            placeholder="Username..."
            onChange={(e) => setUsername(e.target.value)}
            className="input-field"
          ></input>
        </div>
        <div className="input">
          <label className="input-label">Email</label>
          <br />
          <input
            value={email}
            type="text"
            placeholder="Email..."
            onChange={(e) => setEmail(e.target.value)}
            className="input-field"
          ></input>
        </div>
        <div className="input">
          <label className="input-label">First Name</label>
          <br />
          <input
            value={firstName}
            type="text"
            placeholder="First Name..."
            onChange={(e) => setFirstName(e.target.value)}
            className="input-field"
          ></input>
        </div>
        <div className="input">
          <label className="input-label">Last Name</label>
          <br />
          <input
            value={lastName}
            type="text"
            placeholder="Last Name..."
            onChange={(e) => setLastName(e.target.value)}
            className="input-field"
          ></input>
        </div>
        <div className="input">
          <label className="input-label">Profile Image</label>
          <br />
          <input
            value={profileImg}
            type="text"
            placeholder="Profile Image..."
            onChange={(e) => setProfileImg(e.target.value)}
            className="input-field"
          ></input>
        </div>
        <div className="input">
          <label className="input-label">Bio</label>
          <br />
          <textarea
            value={bio}
            type="textarea"
            placeholder="Bio..."
            onChange={(e) => setBio(e.target.value)}
            className="input-field"
          ></textarea>
        </div>
        <button type="submit">Submit Edit</button>
      </form>
      <button onClick={() => handleStopEdit()}>Cancel</button>
      {errors ? errors.map((e) => <div key={e}>{e[1]}</div>) : null}
    </>
  );
};

export default EditInfoForm;
