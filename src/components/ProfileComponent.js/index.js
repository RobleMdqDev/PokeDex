import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { userSelector } from "../../store/reducers/userReducer";
import "./style.css";
import { trainers } from "../../data/trainers";

import VanillaTilt from "vanilla-tilt";
import { updateUser } from "../../store/actions";

const ProfileComponent = () => {
  const dispatch = useDispatch();

  const userData = useSelector(userSelector);

  const [trainerSelected, setTrainerSelected] = useState(trainers[0]);

  useEffect(() => {
    if (userData.avatar) setTrainerSelected(trainers[userData.avatar]);
  }, [userData]);

  const handleAvatar = (e) => {
    setTrainerSelected(trainers[e.target.id]);
  };

  const handleUpdateUser = () => {
    dispatch(updateUser(userData, { avatar: trainerSelected.id }));
  };

  useEffect(() => {
    VanillaTilt.init(document.querySelector(".UP-img"), {
      max: 30,
      speed: 300,
      glare: false,
      "max-glare": 2.5,
    });
    VanillaTilt.init(document.querySelector(".UP-inner-area"), {
      max: 25,
      speed: 300,
      glare: false,
      "max-glare": 2.5,
    });
  }, [trainerSelected]);

  return (
    <div id="UP-wrapper" className="UP-wrapper">
      {!userData ? (
        <div className="area">Loading...</div>
      ) : (
        <>
          <div className="UP-img-area">
            <div className="UP-inner-area">
              <img
                className="UP-img"
                src={trainerSelected.avatar}
                alt="pokemon"
              />
            </div>
          </div>
          <div className="UP-description-area">
            <div className="UP-info">
              <h2 id="UP-name" className="UP-name">
                {userData.username}
              </h2>

              <div className="UP-stats">
                <p className="UP-about">Hometown: {trainerSelected.hometown}</p>
                <p className="UP-about">Region: {trainerSelected.region}</p>
                <p className="UP-about">Class: {trainerSelected.class}</p>
                <p className="UP-about">
                  Specializes: {trainerSelected.specializes}
                </p>
              </div>
            </div>
            <div
              className="UP-avatars"
              onClick={(e) => {
                handleAvatar(e);
              }}
            >
              {trainers.map((element, index) => (
                <img
                  className="UP-avatars-image"
                  key={index}
                  id={index}
                  src={element.avatar}
                  alt="avatar"
                />
              ))}
            </div>
            <div className="UP-buttons">
              <button
                onClick={() => {
                  handleUpdateUser();
                }}
              >
                Save New Avatar!
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ProfileComponent;
