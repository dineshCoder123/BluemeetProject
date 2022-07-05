import React from "react";
import "./../index.css";
const DropdownMenu = () => {
  return (
    <NavBar>
      <li>X</li>
    </NavBar>
  );
};

const NavBar = (props) => {
  return (
    <nav className="navbar">
      <ul className="navbar-nav">{props.children}</ul>
    </nav>
  );
};

export default DropdownMenu;
