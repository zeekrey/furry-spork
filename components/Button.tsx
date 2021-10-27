import { styled } from "../stitches.config";

const Button = styled("button", {
  all: "unset",

  cursor: "pointer",
  background: "$blue",
  borderRadius: 4,
  padding: "$1 $2",
  color: "white",
  fontSize: 14,

  "&:hover": {
    background: "$blueDark",
  },
});

export default Button;
