import React, { useEffect } from "react";
import VanillaTilt from "vanilla-tilt";
import { IMG_POKEMON } from "../../constants";
import "./style.css";

const BadgeComponent = ({ types, evolutions }) => {
  const img = types
    ? require(`../../img/badges/badge_${types.type.name}.png`)
    : IMG_POKEMON(evolutions.id);

  const name = types ? types.type.name : evolutions.name;
  useEffect(() => {
    VanillaTilt.init(document.querySelectorAll(".BC-badge"), {
      max: 25,
      speed: 300,
      glare: false,
      "max-glare": 2.5,
    });
  }, []);

  return (
    <div className="BC-badge-area">
      <img className="BC-badge" name={name} src={img} alt="pokemon badge" />
      <span className="BC-type">{name}</span>
    </div>
  );
};

export default BadgeComponent;
