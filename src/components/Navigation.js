import React from "react";
import { Link } from "react-router-dom";
import { FaTwitter, FaUserEdit } from "react-icons/fa";

function Navigation({ userObject }) {
  return (
    <nav>
      <ul className="navlist">
        <li className="navitem">
          <Link to="/">
            <FaTwitter className="icons" />
          </Link>
        </li>
        <li className="navitem">
          <Link to="/profile">
            <FaUserEdit className="icons" />
            <span>{userObject?.displayName}'s Profile</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
