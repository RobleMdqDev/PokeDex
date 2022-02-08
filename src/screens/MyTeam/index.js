import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CardPokemon from "../../components/CardPokemon/index.js";
import ProfileComponent from "../../components/ProfileComponent.js";
import { pokemonsSelector } from "../../store/reducers/pokemonReducer.js";
import {
  userSelector,
  userTeamSelector,
} from "../../store/reducers/userReducer.js";

import "./style.css";

const MyTeam = () => {
  const pokemonData = useSelector(pokemonsSelector);
  const userData = useSelector(userSelector);

  const [dataFilter, setDataFilter] = useState();

  const getTeam = () => {
    const team = userData.team.split("-");
    const aux = pokemonData.filter((d) => {
      const pokeID = d.pokemon_species.url.slice(42).replace("/", "");
      return team.includes(pokeID);
    });
    setDataFilter(aux);
  };

  useEffect(() => {
    if (userData.team) {
      getTeam();
    } else {
      setDataFilter([]);
    }
  }, [userData]);

  return (
    <div className="MT-wrap">
      <ProfileComponent />
      <h1>My Team</h1>
      <div className="MT-list">
        {!dataFilter || dataFilter.length === 0 ? (
          <span>You don't have pokemons, catch them all!</span>
        ) : (
          dataFilter.map((element, index) => (
            <CardPokemon key={index + ""} element={element.pokemon_species} />
          ))
        )}
      </div>
    </div>
  );
};

export default MyTeam;
