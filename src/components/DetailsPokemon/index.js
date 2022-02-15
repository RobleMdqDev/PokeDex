import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import VanillaTilt from "vanilla-tilt";
import starIcon from "../../img/star-icon.svg";
import BadgeComponent from "../BadgeComponent.js";
import "./style.css";
import { fillData } from "./functions";
import { useDispatch, useSelector } from "react-redux";
import {
  userSelector,
  userTeamSelector,
} from "../../store/reducers/userReducer";
import { getUser, updateMyTeam } from "../../store/actions";
import { IMG_POKEMON, LOADING } from "../../constants";

const DetailsPokemon = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [pokemonData, setPokemonData] = useState();
  const [pokemonSpeciesData, setPokemonSpeciesData] = useState();
  const [pokemonChainEvolution, setPokemonChainEvolution] = useState();
  const [isTeam, setIsTeam] = useState(false)
  const user = useSelector(userSelector);
  const userTeam = useSelector(userTeamSelector); 
  const history = useNavigate() 

  const getData = async () => {
    dispatch({ type: LOADING, payload: true });
    const resp = await fillData(id);
    dispatch({ type: LOADING, payload: false });
    if(!resp) return history('/*')
    const { pokemonSpeciesData, pokemonData, pokemonEvolutions } = resp    
    setPokemonData(pokemonData);
    setPokemonSpeciesData(pokemonSpeciesData);
    setPokemonChainEvolution(pokemonEvolutions); 
       
  };

  useEffect(() => {      
        getData();           
  }, [user, id]);
 
  useEffect(()=>{
    if(!userTeam) return setIsTeam(false)
    setIsTeam(userTeam.split("-").includes(id));    
  },[userTeam, id]);

  const handleTeam = () => {
    dispatch(updateMyTeam(id, user));
    dispatch(getUser(user));
  };

  useEffect(() => {
    VanillaTilt.init(document.querySelector(".DP-img"), {
      max: 30,
      speed: 300,
      glare: false,
      "max-glare": 2.5,
    });
    VanillaTilt.init(document.querySelector(".DP-inner-area"), {
      max: 25,
      speed: 300,
      glare: false,
      "max-glare": 2.5,
    });
  }, [pokemonChainEvolution]);

  return (
    <div className="DP-wrapper">
      {!pokemonData || !pokemonSpeciesData || !pokemonChainEvolution ? (
        <div className="area">Loading...</div>
      ) : (
        <>
          <div className="DP-img-area">
            <div className="DP-inner-area">
              <span className="DP-span-icon">{id}</span>
              <img src={starIcon} className="DP-star-icon" alt="star-icon" />
              <img
                className="DP-img"
                src={IMG_POKEMON(id)}
                alt="pokemon"
              />
            </div>
          </div>
          <div className="DP-description-area">
            <div className="DP-buttons">
              <Link to={"/"}>Go Back!</Link>
              <a
                href="#/"
                onClick={() => {
                  handleTeam();
                }}
              >
                {isTeam ? "Release!" : "Catch!"}
              </a>
            </div>
            <div className="DP-badges">
              {pokemonData.types.map((types) => (
                <BadgeComponent key={types.type.name} types={types} />
              ))}
            </div>
            <div className="DP-info">
              <div className="DP-stats">
                <h2 className="DP-name">{pokemonData.name}</h2>
                <p className="DP-about">
                  {pokemonSpeciesData.flavor_text_entries[1].flavor_text}
                </p>
              </div>
              <div className="DP-stats">
                <p className="DP-stats-title">STATS</p>
                <div className="DP-stats-items">
                  <p className="DP-about">
                    <strong>weight:</strong> {pokemonData.weight}
                  </p>
                  <p className="DP-about">
                    <strong>shape:</strong> {pokemonSpeciesData.shape.name}
                  </p>
                  {pokemonData.stats.map((stat) => (
                    <p key={stat.stat.name} className="DP-about">
                      <strong>{stat.stat.name}:</strong> {stat.base_stat}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="DP-badges DP-evolutions">
            {pokemonChainEvolution.map((evolutions) => (
              <Link key={evolutions.id} to={`/pokemon/${evolutions.id}`}>
                <BadgeComponent evolutions={evolutions} />
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default DetailsPokemon;
