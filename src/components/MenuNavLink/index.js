import React from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { logoutUser } from "../../store/actions";
import "./style.css";

const MenuNavLink = () => {
  window.onscroll = function () {
    scrollFunction();
  };

  const dispatch = useDispatch();

  const scrollFunction = () => {
    const navbar = document.getElementById("navbar");
    const sticky = 0;
    if(document.getElementById("navbar")){
    if (
      document.body.scrollTop > 80 ||
      document.documentElement.scrollTop > 80
    ) {
      navbar.classList.add("glass");
      document.getElementById("navbar").style.padding = "15px 10px";
      document.getElementById("navList").style.fontSize = "20px";
    } else {
     
        document.getElementById("navbar").style.padding = "45px 10px";
        navbar.classList.remove("glass");
     
      document.getElementById("navList").style.fontSize = "25px";      
    }
    if (window.pageYOffset >= sticky) {
      navbar.classList.add("sticky");
    } else {
      navbar.classList.remove("sticky");
    }
  }
  };

  const handleOnClick = (e) => {
    window.scroll({
      top: e.view.innerHeight,
      behavior: "smooth",
    });
  };

  return (
    <nav name="navbar" id="navbar" aria-roledescription="Navigation bar">
      <ul name="navList" id="navList" className="nav-list">
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
        <li>
          <button
            onClick={() => {
              dispatch(logoutUser());
            }}
          >
            Logout
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default MenuNavLink;
