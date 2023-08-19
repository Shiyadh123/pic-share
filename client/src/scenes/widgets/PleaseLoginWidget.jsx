import React from "react";
import { Typography, Link, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

const PleaseLoginWidget = ({ purpose }) => {
  const navigate = useNavigate();
  return (
    <>
      <Box
        style={{ margin: "10px" }}
        onClick={() => {
          navigate(`/`);
          navigate(0);
        }}
      >
        <Link to="/">{"Login"}</Link>
        <Typography
          variant="h5"
          style={{ display: "inline" }}
        >{` to ${purpose}`}</Typography>
      </Box>
    </>
  );
};

export default PleaseLoginWidget;
