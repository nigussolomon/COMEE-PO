import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  Box,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme();

const LoginScreen = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const loginUrl = "http://localhost:3000/comee_core/login";
  const [alertOn, setAlertOn] = React.useState("none");
  const [message, setMessage] = React.useState("");
  const [disabled, setDisabled] = useState(false);

  const requestBody = {
    auth: {
      email: email,
      password: password,
    },
  };
  const handleSubmit = (e) => {
    setDisabled(true);
    e.preventDefault();
    fetch(loginUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.error) {
          setAlertOn("block");
          setMessage(data.error);
          setDisabled(false);
        } else {
          localStorage.setItem("accessToken", data.token);
          navigate("/home");
          setDisabled(false);
        }
      })
      .catch((error) => {
        console.error("Error during login:", error);
      });
  };

  return (
    <ThemeProvider theme={theme}>
      <Card sx={{ maxWidth: 400, margin: "0 auto", marginTop: 50 }}>
        <CardContent>
          <Typography variant="h5" component="div" gutterBottom>
            Login
          </Typography>
          <span style={{ color: "red", display: alertOn }}>{message}</span>
          <br />
          <form onSubmit={handleSubmit}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 5 }}>
              <TextField
                label="Email"
                variant="outlined"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                label="Password"
                variant="outlined"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button
                disabled={disabled}
                style={{ padding: "12px" }}
                type="submit"
                variant="contained"
                color="primary"
              >
                Login
              </Button>
            </Box>
          </form>
        </CardContent>
      </Card>
    </ThemeProvider>
  );
};

export default LoginScreen;
