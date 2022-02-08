import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Footer from "../../components/Footer";
import HeroBanner from "../../components/HeroBanner";
import LoadingComponent from "../../components/LoadingComponent/LoadingComponent";
import { getAccessToken } from "../../functions/validateToken";
import { fetchPokemons } from "../../store/actions";
import { userStatusSelector } from "../../store/reducers/userReducer";
import Login from "../Login/Login";

const LayoutScreen = ({ children }) => {
  const status = useSelector(userStatusSelector);

  const [loginValidate, setLoginValidate] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPokemons());
    console.log('EJECUTANDO USE EFFECT DISPATCH POKEMONS')
  },[]);

  useEffect(() => {
    status === "OK" && getAccessToken()
      ? setLoginValidate(true)
      : setLoginValidate(false);
  }, [status]);

  const layoutContent = (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <LoadingComponent/>   
      <HeroBanner />
      {children}
         
      <Footer />
    </div>
  );

  return loginValidate ? layoutContent : <Login />;
};

export default LayoutScreen;
