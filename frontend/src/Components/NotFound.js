import { React, useEffect } from "react";
import { Link } from "react-router-dom";
import { Container, Typography, Button } from "@mui/material";
import WarningIcon from "@mui/icons-material/Warning";

const NotFound = () => {
  useEffect(() => {
    document.title = "404 Not Found";
  }, []);

  return (
    <Container
      maxWidth="sm"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <WarningIcon
        style={{ fontSize: 80, color: "#FF5733", paddingBottom: 10 }}
      />
      <Typography variant="h3" gutterBottom style={{ marginTop: "16px" }}>
        404 Not Found
      </Typography>
      <Typography variant="h7" color="textSecondary" paragraph>
        The page you are looking for does not exist.
      </Typography>
      <Link to="/login" style={{ textDecoration: "none" }}>
        <Button
          variant="contained"
          style={{
            backgroundColor: "#4d4bd7",
            color: "#fff",
            padding: "12px 24px",
            marginTop: "16px",
          }}
        >
          Back to Home
        </Button>
      </Link>
    </Container>
  );
};

export default NotFound;
