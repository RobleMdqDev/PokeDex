import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { trainers } from "../../data/trainers";

import { userSelector, userTeamSelector } from "../../store/reducers/userReducer";
import "./style.css";

const Footer = () => {
  const userData = useSelector(userSelector);
  const teamUser = useSelector(userTeamSelector).split('-');  
  const [avatar, setAvatar] = useState(trainers[0].avatar);
  const [team, setTeam] = useState('');
  
  
  useEffect(() => {
      if(userData && team){
        setAvatar(trainers[userData.avatar].avatar);
        setTeam(teamUser);
      }       
       
  }, [userData, team]);
  
  return (
    <footer>
      {team && userData ? <div>
        <img src={avatar} alt="pokemon icon" />
        {team.map((poke) => {
          return (
            <img
              key={poke}
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${poke}.png`}
              alt="pokemon icon"
            />
          );
        })}
      </div>
      : ''}
      <p>Alberto Nicolas Robledo</p>
    </footer>
  );
};

export default Footer;
