import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CardPokemon from "../../components/CardPokemon/index.js";
import ProfileComponent from "../../components/ProfileComponent.js";
import { MYTEAM_TITLE, NO_POKEMONS } from "../../constants/index.js";
import { pokemonsSelector } from "../../store/reducers/pokemonReducer.js";
import {
  userSelector  
} from "../../store/reducers/userReducer.js";

import "./style.css";

const MyTeam = () => {
  const pokemonData = useSelector(pokemonsSelector);
  const userData = useSelector(userSelector);

  const [dataFilter, setDataFilter] = useState([]);

  

  useEffect(() => {
    if (userData.team) {
      (function getTeam () {
        const team = userData.team.split("-");
        const aux = pokemonData.filter((d) => {
          const pokeID = d.pokemon_species.url.slice(42).replace("/", "");
          return team.includes(pokeID);
        });        
        setDataFilter(aux);        
      }());
    } else {
      setDataFilter([]);
    }  }, [userData, pokemonData]);


  return (
    <div className="MT-wrap">
      <ProfileComponent />
      <h1>{MYTEAM_TITLE}</h1>
      <div className="MT-list">
        {!dataFilter || dataFilter.length === 0 ? (
          <span>{NO_POKEMONS}</span>
        ) : (
          dataFilter.map((element) => (
            <CardPokemon key={element.pokemon_species.name} element={element.pokemon_species} />
          ))
        )}
      </div>
    </div>
  );
};

export default MyTeam;
