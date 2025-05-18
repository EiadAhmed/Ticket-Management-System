import React, { createContext, useCallback, useContext } from "react";
import { useNavigate } from "react-router";
import Cookies from "universal-cookie";
import { DomainContext } from "./DomainContext";
import axios from "axios";

const cookies = new Cookies();
const AuthenticationContext = createContext();

const AuthenticationContextProvider = ({ children }) => {
  const DOMAIN = useContext(DomainContext);
  const navigator = useNavigate();
  const checkExpiry = useCallback(async () => {
    const Token = cookies.get("Token");
    let valid = await axios
      .get(DOMAIN + "api/tickets", {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Token " + Token,
        },
      })
      .then((response) => {
        if (response.status === 200) return true;
      })
      .catch(() => {
        navigator("/login");
        return false;
      });
    return valid;
  }, [DOMAIN]);

  return (
    // the Provider gives access to the context to its children
    <AuthenticationContext.Provider value={checkExpiry}>
      {children}
    </AuthenticationContext.Provider>
  );
};

export { AuthenticationContext, AuthenticationContextProvider };
