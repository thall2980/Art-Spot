import React from "react";
import { NavLink } from "react-router-dom";

const NavBar = ({ user }) => {
  return (
    <nav>
      <NavLink exact to="/">
        Home
      </NavLink>
      <br />
      <NavLink to="/artists">Artists</NavLink>
      <br />
      <NavLink to="/artwork">Artwork</NavLink>
      <br />
      {user ? <NavLink to="/profile">Profile</NavLink> : null}
      {user ? null : <NavLink to="/login">Login</NavLink>}
      <br />
      {user ? null : <NavLink to="/signup">SignUp</NavLink>}
      <br />
    </nav>
  );
};

export default NavBar;
