import React from "react";
import banner from "../../img/pokeball.jpg";

const HeroBanner = () => {
  const style = {
    padding: 0,
    margin: 0,    
    width: '100%',
    height: '95vh',
    backgroundImage: `url(${banner})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'none',
    backgroundAttachment: 'fixed'    
  };

  return <div className="banner" style={style}></div>;

};

export default HeroBanner;
