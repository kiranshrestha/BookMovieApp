import React, { Fragment, useState } from "react";
import "./Header.css";
import logo from "./../../assets/logo.svg";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import LoginRegistrationModel from "./LoginRegistrationModel";
import { useSelector, useDispatch } from "react-redux";
import { loginAction } from "../../store";

const Header = (props) => {
  const dispatch = useDispatch();

  const userLoggedIn = useSelector((state) => state.userLoggedIn);
  const showLoginSignupModal = useSelector(
    (state) => state.showLoginSignupModal
  );
  const showBookShowButton = useSelector((state) => state.showBookShowButton);

  if (localStorage.getItem("uuid") === null) {
    dispatch(loginAction.userLoggedOut());
  } else {
    dispatch(loginAction.userLoggedIn());
  }

  const openLoginModalHandler = (e) => {
    dispatch(loginAction.showLoginSignupModal());
  };

  const logoutHandler = (e) => {
    localStorage.removeItem("uuid");
    alert("You have been logged out");
    dispatch(loginAction.userLoggedOut());
  };

  console.log("showBookShowButton", showBookShowButton);

  return (
    <Fragment>
      {showLoginSignupModal ? <LoginRegistrationModel /> : ""}
      <header className="app-header">
        <img src={logo} alt="logo" className="app-logo" />
        {!userLoggedIn ? (
          <div className="login-button">
            <Button
              variant="contained"
              color="default"
              onClick={openLoginModalHandler}
            >
              Login
            </Button>
          </div>
        ) : (
          <div className="login-button">
            <Button variant="contained" color="default" onClick={logoutHandler}>
              Logout
            </Button>
          </div>
        )}
        {showBookShowButton ? (
          <div className="bookshow-button">
            <Link to={"/bookshow/" + props.id}>
              <Button variant="contained" color="primary">
                Book Show
              </Button>
            </Link>
          </div>
        ) : (
          ""
        )}
      </header>
    </Fragment>
  );
};

export default Header;
