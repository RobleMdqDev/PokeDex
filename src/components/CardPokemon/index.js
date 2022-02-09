import React, { useEffect, useState } from "react";
import VanillaTilt from "vanilla-tilt";
import { Link } from "react-router-dom";

import "./style.css";
import starIcon from "../../img/star-icon.svg";
import { getUser, updateMyTeam } from "../../store/actions";
import { useDispatch, useSelector } from "react-redux";
import {
  userSelector,
  userTeamSelector,
} from "../../store/reducers/userReducer";

const CardPokemon = ({ element }) => {
  const dispatch = useDispatch();
  const user = useSelector(userSelector);
  const pokeID = element.url.slice(42).replace("/", "");
  const urlPokemon = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokeID}.png`;
  const userTeam = useSelector(userTeamSelector);
  const [isTeam, setIsTeam] = useState(false);

  useEffect(() => {
    if(userTeam)setIsTeam(userTeam.split("-").includes(pokeID));
  }, [userTeam, pokeID]);

  const handleTeam = () => {
    dispatch(updateMyTeam(pokeID, user));
    dispatch(getUser(user));
  };

  useEffect(() => {
    VanillaTilt.init(document.querySelectorAll(".img-area"), {
      max: 25,
      speed: 300,
      glare: false,
      "max-glare": 2.5,
    });
  }, []);

  return (
    <div className="wrapper">
      <span className="span-icon">{pokeID}</span>
      <img src={starIcon} className="star-icon" alt="star-icon" />
      <div className="img-area" name="vanillaTilt">
        <div className="inner-area">
          <img src={urlPokemon} alt="pokemon" />
        </div>
      </div>
      <div className="description-area">
        <h3 className="name">{element.name}</h3>

        <p className="about">{element.description}</p>
      </div>
      <div className="buttons">
        <Link to={`/pokemon/${pokeID}`}>View!</Link>
        <a
          href="#/"
          onClick={() => {
            handleTeam();
          }}
        >
          {isTeam ? "Release!" : "Catch!"}
        </a>
      </div>
    </div>
  );
};

export default CardPokemon;
