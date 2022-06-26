import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";
import isEmail from "validator/lib/isEmail";
import { BASE_URL } from "../../config";

const RegistrationFrom = (params) => {
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [enteredFirstName, setEnteredFirstName] = useState("");
  const [enteredLastName, setEnteredLastName] = useState("");
  const [enteredPhoneNumber, setEnteredPhoneNumber] = useState("");
  const [isRegistrationComplete, setRegistrationComplete] = useState(false);

  const isValidFirstName = enteredFirstName.trim().length > 3;
  const isValidLastName = enteredLastName.trim().length > 3;
  const isValidEmail = isEmail(enteredEmail);
  const isValidPassword = enteredPassword.trim().length > 3;
  const isValidPhoneNumber = enteredPhoneNumber.trim().length == 10;

  let errorFirstName = "Enter your First Name(Required)";
  let errorLastName = "Enter your Last Name(Required)";
  let errorEmail = "Enter your email address(Required)";
  let errorPassword = "Enter your password(Required)";
  let errorPhoneNumber = "Enter your phone number(Required)";
  let message = "";
  const onEnteredEmailChange = (e) => {
    setEnteredEmail(e.target.value);
  };

  const onEnteredPasswordChange = (e) => {
    setEnteredPassword(e.target.value);
  };

  const onEnteredFirstName = (e) => {
    setEnteredFirstName(e.target.value);
  };

  const onEnteredLastName = (e) => {
    {
      setEnteredLastName(e.target.value);
    }
  };

  const onEnteredPhoneNumber = (e) => {
    {
      setEnteredPhoneNumber(e.target.value);
    }
  };

  const onRegistrationFormSubmit = async (e) => {
    e.preventDefault();
    try {
      if (
        isValidFirstName &&
        isValidLastName &&
        isValidEmail &&
        isValidPhoneNumber &&
        isValidPassword
      ) {
        console.log(
          enteredFirstName,
          enteredLastName,
          enteredPassword,
          enteredPhoneNumber,
          enteredEmail
        );

        const newUser = {
          first_name: enteredFirstName,
          last_name: enteredLastName,
          email_address: enteredEmail,
          password: enteredPassword,
          mobile_number: enteredPhoneNumber,
        };

        console.log("newUser", newUser);
        console.log("newUser", JSON.stringify(newUser));

        const rawResponse = await fetch(`${BASE_URL}signup`, {
          method: "post",
          headers: {
            ContentType: "application/json;charset=UTF-8",
          },
          body: JSON.stringify(newUser),
        });

        const response = await rawResponse.json();
        if (response.code === "USR-009") {
          message = response.message;
          setRegistrationComplete(true);

          return;
        }

        console.log(response.message);
        message = "Registration Successful. Please Login!";
        setRegistrationComplete(true);
      } else {
        message = "Registration Failure. Please try Again!";
        setRegistrationComplete(true);
      }
    } catch (e) {
      message = "Registration Failure. Please try again!";
      setRegistrationComplete(true);
    }
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
      onSubmit={onRegistrationFormSubmit}
    >
      <TextField
        id="firstName"
        label="First Name"
        variant="outlined"
        fullWidth
        required
        helperText={errorFirstName}
        onChange={onEnteredFirstName}
        value={enteredFirstName}
        type="text"
        error={!isValidFirstName}
      />
      <TextField
        id="lastName"
        label="Last Name"
        variant="outlined"
        fullWidth
        required
        helperText={errorLastName}
        onChange={onEnteredLastName}
        value={enteredLastName}
        type="email"
        error={!isValidLastName}
      />
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
        type="password"
        required
        fullWidth
        onChange={onEnteredPasswordChange}
        value={enteredPassword}
        helperText={errorPassword}
        error={!isValidPassword}
      />
      <TextField
        id="phone"
        label="Phone Number"
        variant="outlined"
        type="number"
        required
        fullWidth
        onChange={onEnteredPhoneNumber}
        value={enteredPhoneNumber}
        helperText={errorPhoneNumber}
        error={!isValidPhoneNumber}
      />
      {!isRegistrationComplete && <div>{message}</div>}
      <Button variant="contained" color="primary" id="register" type="submit">
        REGISTER
      </Button>
    </Box>
  );
};

export default RegistrationFrom;
