import { styled } from "../stitches.config";

const Filter = styled("select", {
  // Reset some defaults
  border: "none",
  fontFamily: "Roboto",
  color: "White",

  "&:focus, &:active, &:focus-visible": {
    border: "none",
    boxShadow: "0 0 0 2px $greyDark",
  },

  cursor: "pointer",
  background: "$teal",
  borderRadius: 4,
  padding: "$1 $2",
  fontSize: 14,

  "&::-webkit-datetime-edit": {},
  "&::-webkit-datetime-edit-fields-wrapper": {},
  "&::-webkit-datetime-edit-text": { color: "white" },
  "&::-webkit-datetime-edit-month-field": { color: "white" },
  "&::-webkit-datetime-edit-day-field": { color: "white" },
  "&::-webkit-datetime-edit-year-field": { color: "white" },
  "&::-webkit-inner-spin-button": {},
  "&::-webkit-calendar-picker-indicator": {
    color: "white",
  },
});

export default Filter;
