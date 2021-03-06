import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { IMG_POKEMON } from "../../constants";
import { trainers } from "../../data/trainers";

import {
  userSelector  
} from "../../store/reducers/userReducer";
import "./style.css";

const Footer = () => {
  const userData = useSelector(userSelector);
  const [avatar, setAvatar] = useState(trainers[0].avatar);
  const [team, setTeam] = useState([]);

  useEffect(() => {
    if (userData.avatar) {
      setAvatar(trainers[userData.avatar].avatar);
      setTeam(userData.team.split("-"));
    }
  }, [userData]);

  return (
    <footer>
      {team && avatar ? (
        <div>
          <img src={avatar} alt="pokemon icon" />
          {team.map((poke) => {
            return poke ? (
              <img
                key={poke}
                src={IMG_POKEMON(poke)}
                alt="pokemon icon"
              />
            ) : (
              ""
            );
          })}
        </div>
      ) : (
        ""
      )}
      <p>Alberto Nicolas Robledo</p>
    </footer>
  );
};

export default Footer;
