import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/Footer";
import HeroBanner from "../../components/HeroBanner";
import LoadingComponent from "../../components/LoadingComponent/LoadingComponent";
import { getAccessToken } from "../../functions/validateToken";
import { fetchPokemons, getUser } from "../../store/actions";
import {
  userSelector,
  userStatusSelector,
} from "../../store/reducers/userReducer";
import Login from "../Login/Login";

const LayoutScreen = ({ children }) => {
  const status = useSelector(userStatusSelector);
  const userSelect = useSelector(userSelector);
  const [loginValidate, setLoginValidate] = useState(false);
  
  const dispatch = useDispatch();

  const handleSession = async () => {
    const user = {
      token: sessionStorage.getItem("token"),
      id: sessionStorage.getItem("id"),
      username: sessionStorage.getItem("user"),
    };
    if (user.token && user.id && user.username && !status) {      
      dispatch(getUser(user));
      dispatch({
        type: "RELOAD",
        payload: { token: user.token, status: "OK", user: userSelect },
      });
    }
  };

  useEffect(() => {
    handleSession();
    dispatch(fetchPokemons());
  }, []);

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
      <LoadingComponent />
      <HeroBanner />
      {children}

      <Footer />
    </div>
  );

  return loginValidate ? layoutContent : <Login />;
};

export default LayoutScreen;
