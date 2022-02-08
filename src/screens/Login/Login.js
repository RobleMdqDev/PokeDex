import React, { useState } from "react";
import { useDispatch } from "react-redux";
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
          ? "If you still don't have an account, create one by clicking here!"
          : "Back to login!"}
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
            placeholder="Type your PokeName!"
            required
          />
          <input
            type="password"
            className="login-input"
            name="password"
            id="loginPass"
            placeholder="Type your PokePassword!"
            required
          />
          <button
            className="login-button"
            type="submit"
            onClick={(e) => {
              handleLoginSubmit(e);
            }}
          >
            {typeForm ? "Login!" : "Create!"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
