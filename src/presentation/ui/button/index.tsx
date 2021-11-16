import React from "react";
import { withStyles } from "@material-ui/core/styles";
import InitialButton from "@material-ui/core/Button";

const Button = withStyles({
  root: {
    boxShadow: "none",
    textTransform: "none",
    fontSize: 16,
    padding: "6px 12px",
    width: "340px",
    height: "36px",
    background: "white",
    lineHeight: 1.5,
    backgroundColor: "white",
    border: "1px solid rgba(0, 0, 0, 0.05)",
    boxSizing: "border-box",
    borderRadius: "50px",
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),

    "&:active": {
      boxShadow: "none",
      backgroundColor: "#0062cc",
      borderColor: "#005cbf",
    },
    "&:focus": {
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.5)",
    },
  },
})(InitialButton);

export default Button;
