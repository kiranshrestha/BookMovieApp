import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import isEmail from "validator/lib/isEmail";
import { BASE_URL } from "../../config";
import { useDispatch } from "react-redux";
import { loginAction } from "../../store";

const LoginForm = (props) => {
  const dispatch = useDispatch();

  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");

  const isValidEmail = isEmail(enteredEmail);
  const isValidPassword = enteredPassword.trim().length > 3;

  let errorEmail = "Enter your email address(Required)";
  let errorPassword = "Enter your password(Required)";

  const onLoginFormSubmit = async (e) => {
    e.preventDefault();
    console.log(enteredEmail, enteredPassword);
    if (!isValidEmail || !isValidPassword) {
      errorEmail = "Invalid email";
      errorPassword = "Invalid password";
      return;
    }

    try {
      const basicAuth = `Basic ${btoa(`${enteredEmail}:${enteredPassword}`)}`;
      console.log(basicAuth);
      const rawResponse = await fetch(`${BASE_URL}auth/login`, {
        method: "POST",
        headers: {
          Authorization: basicAuth,
        },
      });
      const response = await rawResponse.json();
      console.log(response);
      localStorage.setItem("uuid", response.id);
      dispatch(loginAction.userLoggedIn());
      dispatch(loginAction.hideLoginSignupModal());
    } catch (err) {
      console.log(err);
    }
  };

  const onEnteredEmailChange = (e) => {
    setEnteredEmail(e.target.value);
  };

  const onEnteredPasswordChange = (e) => {
    setEnteredPassword(e.target.value);
  };

  return (
    <Box
      component="form"
      sx={{
        "& > :not(style)": { m: 1, width: 300 },
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        flexWrap: "wrap",
      }}
      noValidate
      autoComplete="off"
      onSubmit={onLoginFormSubmit}
    >
      <TextField
        id="email"
        label="Email"
        variant="outlined"
        validateEmail={true}
        fullWidth
        required
        helperText={errorEmail}
        onChange={onEnteredEmailChange}
        value={enteredEmail}
        type="email"
        error={!isValidEmail}
      />
      <TextField
        id="password"
        label="Password"
        variant="outlined"
        required
        fullWidth
        type="password"
        onChange={onEnteredPasswordChange}
        value={enteredPassword}
        helperText={errorPassword}
        error={!isValidPassword}
      />
      <Button variant="contained" color="primary" id="login" type="submit">
        LOGIN
      </Button>
    </Box>
  );
};

export default LoginForm;
