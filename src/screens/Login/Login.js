import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { CREATE_BUTTON, GO_LOGIN, GO_SIGN_IN, LOGIN_BUTTON, PLACEHOLDER_PASSWORD, PLACEHOLDER_USERNAME } from "../../constants";
import { loadUser } from "../../store/actions";
import "./style.css";

const Login = () => {
  const dispatch = useDispatch();
 
  const [typeForm, setTypeForm] = useState(true);
  const [dataUser, setDataUser] = useState({
    username: "",
    password: "",
  });
 
  const handleLoginSubmit = (e) => {
    e.preventDefault();
        
    if (typeForm) {
      dispatch(loadUser(dataUser));
    }
    if (!typeForm) {
      dispatch(loadUser(dataUser, "signin"));
    }
  };

  const handleLoginForm = (e) => {
    setDataUser({
      ...dataUser,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="login-background">
      <span
        className="login-signup"
        onClick={() => {
          setTypeForm(!typeForm);
        }}
      >
        {typeForm
          ? GO_SIGN_IN
          : GO_LOGIN}
      </span>
      <div className="login-area">
        <form
          className="login-form"
          onChange={(e) => {
            handleLoginForm(e);
          }}          
        >
          <input
            className="login-input"
            name="username"
            id="loginName"
            placeholder={PLACEHOLDER_USERNAME}            
          />          
          <input
            type="password"
            className="login-input"
            name="password"
            id="loginPass"
            placeholder={PLACEHOLDER_PASSWORD}           
          />
          
          <button
            className="login-button"
            type="submit"
            onClick={(e) => {
              handleLoginSubmit(e);
            }}
          >
            {typeForm ? LOGIN_BUTTON : CREATE_BUTTON}
          </button>
        </form>
        
      </div>
      
    </div>
  );
};

export default Login;
