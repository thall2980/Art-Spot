import React from 'react'
import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <nav>
        <NavLink exact to="/">
          Home
        </NavLink>
        <br />
        <NavLink to="/profile">
          Profile
        </NavLink>
        <br />
        <NavLink to="/artists">
          Artists
        </NavLink>
        <br />
        <NavLink to="/artwork">
          Artwork
        </NavLink>
        <br/>
        <NavLink to="/login">
          Login
        </NavLink>
        <br />
        <NavLink to="/signup">
          SignUp
        </NavLink>
        <br/>
      </nav>
  )
}

export default NavBar