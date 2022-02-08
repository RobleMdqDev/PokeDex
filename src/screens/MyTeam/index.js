import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CardPokemon from "../../components/CardPokemon/index.js";
import ProfileComponent from "../../components/ProfileComponent.js";
import { pokemonsSelector } from "../../store/reducers/pokemonReducer.js";
import { userSelector, userTeamSelector } from "../../store/reducers/userReducer.js";

import './style.css';

const MyTeam = () => {
  const userData = useSelector(userSelector);
  const pokemonData = useSelector(pokemonsSelector);
  const userTeam = useSelector(userTeamSelector); 

  const [dataFilter, setDataFilter] = useState();

  const getTeam = () => {
    const team = userTeam.split("-");
    const aux = pokemonData.filter((d) => {
      const pokeID = d.pokemon_species.url.slice(42).replace("/", "");
      return team.includes(pokeID);
    });    
    setDataFilter(aux);
  };

  useEffect(() => {
    getTeam();    
  }, [userTeam]);

  return (
    <div className="MT-wrap">
      <ProfileComponent />
      <h1>My Team</h1>
      <div className="MT-list">          
        {!dataFilter ? (
          <span>Loading...</span>
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
