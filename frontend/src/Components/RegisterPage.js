import React, { useState, useEffect, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";

import { Snackbar, Alert } from "@mui/material";
import {
  Button,
  CssBaseline,
  TextField,
  Grid,
  Box,
  Typography,
  Container,
} from "@mui/material";
import LoadingSpinner from "./LoadingSpinner";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import EastIcon from "@mui/icons-material/East";
import { DomainContext } from "../DomainContext";
import axios from "axios";
import Cookies from "universal-cookie";
import logo from "../logo_icon_lg.png";

const theme = createTheme();
const cookies = new Cookies();

const CustomTextField = styled(TextField)(() => ({
  marginTop: "1rem",
  marginBottom: "0.5rem",
  "& .MuiFormHelperText-root": {
    fontSize: "0.875rem",
  },
  "& .MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-notchedOutline": {
    borderColor: "#FB8C00",
  },
  "& .MuiFormHelperText-root.Mui-error": {
    color: "#FB8C00",
  },
  "& .MuiFormLabel-asterisk.Mui-error": {
    color: "#FB8C00",
  },
  "& .MuiInputLabel-root.Mui-error": {
    color: "#FB8C00",
  },
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: "#fff",
  },
  "& label": {
    color: "#fff",
  },
}));

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    white: {
      main: "#fff",
    },
  },
});


 function SuccessMessage({ open, onClose }) {
  return (
    <Snackbar open={open} autoHideDuration={5000} onClose={onClose}>
      <Alert onClose={onClose} severity="success">
        Created successfully! Please verify your email.
      </Alert>
    </Snackbar>
  );
}

export default function SignUp() {
  const DOMAIN = useContext(DomainContext);
  const [pass_error, setpass_error] = useState("");
  const [username_error, setusername_error] = useState("");
  const [conpass_error, setconpass_error] = useState("");
  const [email_error, setemail_error] = useState("");
  const [email, setEmail] = useState();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState();
  const [confirm_password, setConfirmPassword] = useState();
 
  const [is_loading, setIsLoading] = useState(false);
  const [successMessageOpen, setSuccessMessageOpen] = useState(false);
  const navigator = useNavigate();
  useEffect(() => {
    if (cookies.get("Token") && cookies.get("Token").length > 10) {
      navigator("/Tickets");
    }
  }, [navigator]);
  const regform = async (eo) => {
  
    try {  eo.preventDefault();
    setIsLoading(true);
    setpass_error("");
    setemail_error("");
    setusername_error("");
    setconpass_error("");
    if(password != confirm_password){
      setconpass_error("Passwords do not match");
     throw new Error("Passwords do not match");
    }
      console.log(DOMAIN + "api/register/");
      console.log(username, email, password, confirm_password);
      const response = await fetch("http://localhost:8000/api/register/", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          username: username,
          email: email,
          password: password,
        })
      });

      const data = await response.json();
      console.log("Response data:", data);
      
      if (!response.ok) {
        throw { response: { data } };
      }
      
      cookies.set("Token", data.token, { path: "/", sameSite: "lax" });
      cookies.set("User", JSON.stringify(data.user), { path: "/", sameSite: "lax" });
      
      setIsLoading(false);
      setpass_error("");
      setemail_error("");
      setusername_error("");
      setconpass_error("");
      eo.target.reset();
      setSuccessMessageOpen(true);
      
      setTimeout(() => {
        navigator("/Tickets");
      }, 2000);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      if(error.response!==undefined){
      if (error.response.data.password) {
        setpass_error(error.response.data.password[0]);
      } else {
        setpass_error("");
      }
      if (error.response.data.username) {
        setusername_error(error.response.data.username[0]);
      } else {
        setusername_error("");
      }
      if (error.response.data.confirm_password) {
        setconpass_error(error.response.data.confirm_password[0]);
      } else {
        setconpass_error("");
      }
      if (error.response.data.email) {
        setemail_error(error.response.data.email[0]);
      } else {
        setemail_error("");
      }
      if (error.response.data.non_field_errors) {
        setconpass_error(
          (old) => old + "\n" + error.response.data.non_field_errors[0]
        );
      } else {
        setconpass_error((old) => old + "");
      }
    }}
  };

  return (
    <ThemeProvider theme={theme}>
      <SuccessMessage
        open={successMessageOpen}
        onClose={() => setSuccessMessageOpen(false)}
      />
      <Box
        sx={{
          background:
            "linear-gradient(90.26deg,rgb(2, 33, 20) 2.61%,rgb(8, 69, 55) 50.43%, #3D3883 65.25%, #59A0F8 99.7%)",
          minHeight: "100vh",
          overflow: "hidden",
        }}
        style={{ minHeight: "100dvh", zIndex: "0", position: "relative" }}
      >
        <img
          style={{
            zIndex: "1",
            position: "absolute",
            height: "110vh",
            width: "auto",
            left: "0px",
            top: "0px",
            border: "4px solid",
            borderImageSource:
              "linear-gradient(180deg, rgba(255, 255, 255, 0.06) 0%, rgba(20, 86, 255, 0.25) 100%)",
          }}
          //  src={logo}
        />
        <Container
          component="main"
          sx={{
            zIndex: "2",
            position: "relative",
            maxWidth: { xl: "78%", lg: "lg", md: "md", sm: "sm", xs: "xs" },
          }}
        >
          <CssBaseline />
          <Grid
            container
            sx={{
              minHeight: "100vh",
            }}
            style={{ minHeight: "100dvh" }}
            alignItems="center"
            flexDirection={{ md: "row", xs: "column" }}
            justifyContent={{ md: "space-around", xs: "space-evenly" }}
          >
            <Grid
              container
              item
              md={7}
              alignItems={{ md: "flex-start", xs: "center" }}
              flexDirection="column"
            >
              <Box display="flex" flexDirection="column" alignItems="left">
                <Box
                  component={Link}
                  to="/"
                  display="flex"
                  alignItems="center"
                  sx={{ textDecoration: "none" }}
                >
                  <img
                    style={{ width: "50%", height: "100%" }}
                    src={logo}
                  />
                </Box>
                <Typography
                  my={2}
                  sx={{
                    display: { md: "block", xs: "none" },
                    typography: { lg: "h5", sm: "h6" },
                    fontWeight: { lg: "700", sm: "700" },
                    lineHeight: { lg: "130%", sm: "130%" },
                    fontSize: { lg: "1.5rem", md: "1.15rem" },
                    letterSpacing: { lg: "-0.04em", sm: "-0.04em" },
                  }}
                  color="#FAF8FF"
                >
       
                </Typography>
              </Box>
            </Grid>
            <ThemeProvider theme={darkTheme}>
              <Grid
                container
                item
                md={5}
                sx={{ maxWidth: { md: "25.5rem", sm: "22rem", xs: "18rem" } }}
                alignItems="center"
                flexDirection="column"
                component="form"
                onSubmit={regform}
                noValidate
              >
                <Typography
                  sx={{
                    typography: { lg: "h4", sm: "h5", xs: "h6" },
                    fontSize: { lg: "2rem", sm: "1.875rem", xs: "1.5rem" },
                    fontWeight: { lg: "600", sm: "600", xs: "600" },
                    lineHeight: { lg: "140%", sm: "140%", xs: "140%" },
                  }}
                  color="#FFFFFF"
                  mb={{ md: "3rem", xs: "1.5rem" }}
                >
                  Welcome to Supportly
                </Typography>
                <CustomTextField
                  error={email_error ? true : false}
                  helperText={email_error ? email_error : ""}
                  margin="normal"
                  label="User Name"
                  required
                  id="username"
                  name="username"
                  size="small"
                  color="white"
                  fullWidth
                  onChange={(e) => setUsername(e.target.value)}
                />
                <CustomTextField
                  error={email_error ? true : false}
                  helperText={email_error ? email_error : ""}
                  margin="normal"
                  label="Email Address"
                  required
                  id="email"
                  name="email"
                  size="small"
                  color="white"
                  fullWidth
                  onChange={(e) => setEmail(e.target.value)}
                />
                <CustomTextField
                  error={pass_error ? true : false}
                  helperText={pass_error ? pass_error : ""}
                  margin="normal"
                  required
                  fullWidth
                  size="small"
                  color="white"
                  name="password"
                  label="Password"
                  type="password"
                  id="password_"
                  autoComplete="current-password"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <CustomTextField
                  error={conpass_error ? true : false}
                  helperText={conpass_error ? conpass_error : ""}
                  margin="normal"
                  required
                  fullWidth
                  size="small"
                  color="white"
                  name="confirm-password"
                  label="Confirm Password"
                  type="password"
                  id="password_"
                  autoComplete="current-password"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  endIcon={is_loading ? null : <EastIcon />}
                  sx={{
                    fontWeight: "600",
                    fontSize: "1.25rem",
                    lineHeight: "1.5rem",
                    textTransform: "none",
                    alignItems: "center",
                    paddingY: "10px",
                    marginTop: "2rem",
                    marginBottom: "1rem",
                    color: "#FFFFFF",
                    borderRadius: "10px",
                    backgroundColor: "#4D4BD7",
                    "&:hover": {
                      backgroundColor: "#4D4BD7",
                    },
                    boxShadow: "none",
                  }}
                >
                  <Box
                    height="1.25rem"
                    fontFamily="inherit"
                    sx={{
                      fontWeight: "600",
                      fontSize: "1rem",
                      lineHeight: "1.5rem",
                      textTransform: "none",
                      alignItems: "center",
                    }}
                  >
                    {is_loading ? <LoadingSpinner /> : <p  style={{marginTop:"-5px"}}>Continue</p>}
                  </Box>
                </Button>
                <Typography fontSize="1rem" color="#FFFFFF">
                  Already have an account?{" "}
                  <Link
                    style={{
                      textDecoration: "none",
                      fontWeight: "600",
                      color: "#FFFFFF",
                    }}
                    to="/login"
                  >
                    Login
                  </Link>
                </Typography>

              </Grid>
            </ThemeProvider>
          </Grid>
        </Container>
      </Box>
    </ThemeProvider>
  );
}
