import React, { useEffect, useState } from "react";
import CardPokemon from "../CardPokemon";

import "./style.css";

import { useSelector } from "react-redux";

import { pokemonsSelector } from "../../store/reducers/pokemonReducer";

const ListComponent = () => {
  const pokemonsData = useSelector(pokemonsSelector);

  const [dataFilter, setDataFilter] = useState([]);

  const [setList, setSetList] = useState({
    minSet: 0,
    maxSet: 30,
  });

  const handleSearch = (e) => {
    const auxValue = e.target.value;
    const auxData = pokemonsData.filter((d) =>
      d.pokemon_species.name.includes(auxValue)
    );
    setDataFilter(auxData);
  };

  const handlePagination = (name) => {
    const target = name || " ";
    let min = setList.minSet;
    let max = setList.maxSet;

    if (target === "max" && min < dataFilter.length - 30) min = min + 30;

    if (target === "min" && min > 0) min = min - 30;

    if (dataFilter.length - min <= 30) max = dataFilter.length;

    if (dataFilter.length - min >= 30) max = min + 30;

    if (dataFilter.length <= 30) {
      min = 0;
      max = dataFilter.length;
    }

    setSetList({
      minSet: min,
      maxSet: max,
    });
  };

  useEffect(() => {
    if(pokemonsData) setDataFilter(pokemonsData);
  }, [pokemonsData]);

  useEffect(() => {
    handlePagination();
  }, [dataFilter]);

  return (
    <div>
      <div className="list-head">
        <h1>Gotta Catch'em All</h1>
        <div className="searchbar-area">
          <input
            className="searchbar-input"
            type="text"
            placeholder="Search Pokemon!!!"
            onChange={(e) => {
              handleSearch(e);
            }}
          />
        </div>
        <div className="pagination-area">
          <button
            className="pagination-button"
            name="min"
            key={1}
            onClick={(e) => {
              handlePagination(e.target.name);
            }}
          >
            min
          </button>
          <input
            type="text"
            className="pagination-input"
            value={`${setList.minSet} - ${setList.maxSet}`}
            readOnly={true}
          />
          <button
            className="pagination-button"
            name="max"
            key={2}
            onClick={(e) => {
              handlePagination(e.target.name);
            }}
          >
            max
          </button>
        </div>
      </div>

      <div className="list-elements">
        {dataFilter ? dataFilter
          .map((element, index) => (
            <CardPokemon key={index + ""} element={element.pokemon_species} />
          ))
          .filter(
            (element, index) =>
              index >= setList.minSet && index <= setList.maxSet
          ) : ''}
      </div>
      <div className="pagination-area">
        <button
          className="pagination-button"
          name="min"
          key={3}
          onClick={(e) => {
            handlePagination(e.target.name);
          }}
        >
          min
        </button>
        <input
          type="text"
          className="pagination-input"
          value={`${setList.minSet} - ${setList.maxSet}`}
          readOnly={true}
        />
        <button
          className="pagination-button"
          name="max"
          key={4}
          onClick={(e) => {
            handlePagination(e.target.name);
          }}
        >
          max
        </button>
      </div>
    </div>
  );
};

export default ListComponent;
