import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import DetailsPokemon from "../components/DetailsPokemon";
import MenuNavLink from "../components/MenuNavLink";
import Home from "../screens/Home";
import MyTeam from "../screens/MyTeam";
import Page404 from "../screens/Page404";

const Router = () => {
  return (
    <BrowserRouter>
      <MenuNavLink />
      <Routes>        
        <Route exact path="/myteam/" element={<MyTeam />} />
        <Route exact path="/pokemon/:id" element={<DetailsPokemon />} />
        <Route exact path="/" element={<Home />} />
        <Route exact path='*' element={<Page404 />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
