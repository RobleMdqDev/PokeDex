import React from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { logoutUser } from "../../store/actions";

import "./style.css";
import icon from "../../img/poke_ball_icon.png";
import { scrollFunction } from "./functions";

const MenuNavLink = () => {
  
  const dispatch = useDispatch();
  
  window.onscroll = function () {
    scrollFunction();
  };

  const handleOnClick = (e) => {
    window.scroll({
      top: e.view.innerHeight,
      behavior: "smooth",
    });
  };

  return (
    <nav name="navbar" id="navbar" aria-roledescription="Navigation bar">
      <ul
        name="navList"
        id="navList"
        className="nav-list"
        onClick={(e) => {
          handleOnClick(e);
        }}
      >
        <li
          onClick={(e) => {
            handleOnClick(e);
          }}
        >
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/myteam">MyTeam</NavLink>
        </li>
      </ul>
      <NavLink to="/">
      <button
        className="nav-button"
        onClick={() => {
          dispatch(logoutUser());
        }}
      >
        <img src={icon} alt="icon pokeball" />
        Logout
      </button>
      </NavLink>
    </nav>
  );
};

export default MenuNavLink;
