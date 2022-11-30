import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import { NavLink } from "react-router-dom";
import { useHistory } from "react-router-dom";

const NavBar = ({ user, setUser }) => {
  const history = useHistory();

  function logOut() {
    fetch("/logout", {
      method: "DELETE",
    });
    history.push(`/`);
    setUser("");
  }

  return (
    <Navbar className="navbarDiv">
      <NavLink className="underline-style" exact to="/">
        Home
      </NavLink>
      <NavLink className="underline-style" to="/artists">
        Artists
      </NavLink>
      <NavLink className="underline-style" to="/artwork">
        Artwork
      </NavLink>
      {user ? (
        <NavLink className="underline-style" to="/profile">
          Profile
        </NavLink>
      ) : null}
      {user ? null : (
        <NavLink className="underline-style" to="/login">
          Login
        </NavLink>
      )}
      {user ? null : (
        <NavLink className="underline-style" to="/signup">
          SignUp
        </NavLink>
      )}
      {user ? (
        <div className="navigation">
          <button className="logoutButton" onClick={logOut}>
            <img className="logoutPic" src={user.profile_img} alt={user.username}/>
            <div class="logout">LOGOUT</div>
          </button>
        </div>
      ) : null}
    </Navbar>
  );
};

export default NavBar;
