import React from "react";
import Navbar from "react-bootstrap/Navbar"
import { NavLink } from "react-router-dom";

const NavBar = ({ user}) => {
  return (
    <Navbar>
      <NavLink exact to="/">
        Home
      </NavLink>
      <NavLink to="/artists">Artists</NavLink>
      <NavLink to="/artwork">Artwork</NavLink>
      {user ? <NavLink to="/profile">Profile</NavLink> : null}
      {user ? null : <NavLink to="/login">Login</NavLink>}
      {user ? null : <NavLink to="/signup">SignUp</NavLink>}
    </Navbar>
  );
};

export default NavBar;
