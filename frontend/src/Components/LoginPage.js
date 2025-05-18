import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "universal-cookie";
import { ThemeProvider, createTheme, styled } from "@mui/material/styles";
import {
  Box,
  Container,
  Button,
  CssBaseline,
  TextField,
  Typography,
  Grid,
} from "@mui/material";
import LoadingSpinner from "./LoadingSpinner";
import EastIcon from "@mui/icons-material/East";
import { DomainContext } from "../DomainContext";
import "../App.css";
import logo from "../logo_icon_lg.png";


const darkTheme = createTheme({
  palette: {
    mode: "dark",
    white: {
      main: "#fff",
    },
  },
});

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

const theme = createTheme();
const cookies = new Cookies();
export default function SignIn() {
  const DOMAIN = useContext(DomainContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user_error, setuser_error] = useState("");
  const [PasswordError, setPasswordError] = useState("");
  const [is_loading, setIsLoading] = useState(false);
  const navigator = useNavigate();
  useEffect(() => {
    if (cookies.get("Token") && cookies.get("Token").length > 10) {
      navigator("/Tickets");
    }
  }, [navigator]);
  const loginform = async (eo) => {
    eo.preventDefault();
    setIsLoading(true);
    setPasswordError("");
    setuser_error("");
    try {
      const res = await fetch("http://localhost:8000/api/login/", {
        method: 'POST',
        // mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          username: username,
          password: password,
        })
      });
      setIsLoading(false);
      const result = await res.json();
      
      if (!res.ok) {
        throw { response: { data: result } };
      }
      
        // setuser_error("please check your email for confirmation");
        cookies.set("Token", result.token, { path: "/", sameSite: "lax" });
    
        navigator("/Tickets");
      
    } catch (error) {
      console.log(error.response.data.error);
      setIsLoading(false);
      if(error.response!==undefined){
   
        setuser_error(error.response.data.error);
        setPasswordError(error.response.data.error);
     
    }}
  };

  return (
    <ThemeProvider theme={theme}>
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
        //   src="/logo_icon_lg.png"
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
                onSubmit={loginform}
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
                  error={user_error ? true : false}
                  helperText={user_error ? user_error : ""}
                  margin="normal"
                  label="User Name"
                  required
                  id="username"
                  name="username"
                  size="username"
                  color="username"
                  fullWidth
                  onChange={(e) => setUsername(e.target.value)}
                />
                <CustomTextField
                  margin="normal"
                  error={PasswordError ? true : false}
                  helperText={PasswordError ? PasswordError : ""}
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
                    {is_loading ? <LoadingSpinner /> : <p style={{marginTop:"-5px"}}>Continue</p>}
                  </Box>
                </Button>
                <Typography fontSize="1rem" color="#FFFFFF">
                  New Here?{" "}
                  <Link
                    style={{
                      textDecoration: "none",
                      fontWeight: "600",
                      color: "#FFFFFF",
                    }}
                    to="/register"
                  >
                    Register Now
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
