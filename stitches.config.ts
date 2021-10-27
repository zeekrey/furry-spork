import { createStitches } from "@stitches/react";

export const {
  styled,
  css,
  globalCss,
  keyframes,
  getCssText,
  theme,
  createTheme,
  config,
} = createStitches({
  theme: {
    colors: {
      grey: "#F3F6F9",
      greyDark: "#7E8299",
      blue: "#005B96",
      blueDark: "#011F4B",
      blueLight: "#F1FAFE",
      teal: "#1BC5BD",
    },
    shadows: {},
    space: {
      1: "5px",
      2: "10px",
      3: "15px",
      4: "20px",
      5: "25px",
    },
    sizes: {
      1: "5px",
      2: "10px",
      3: "15px",
      4: "20px",
      5: "25px",
    },
    fontSizes: {
      1: "12px",
      2: "13px",
      3: "15px",
      4: "22px",
      5: "28px",
    },
    radii: {
      small: "5px",
      medium: "15px",
      large: "40px",
    },
  },
  media: {
    small: "(min-width: 640px)",
    medium: "(min-width: 768px)",
    large: "(min-width: 1024px)",
  },
  utils: {
    marginX: (value: string | number) => ({
      marginLeft: value,
      marginRight: value,
    }),
  },
});

export const darkTheme = createTheme({
  colors: {},
});

export const globalStyles = globalCss({
  html: { margin: 0, padding: 0, minHeight: "100vh" },
  body: {
    margin: 0,
    padding: 0,
    minHeight: "100vh",
    fontFamily: "Roboto, sans-serif",
  },
  a: { all: "unset" },

  h1: {
    color: "$blueDark",
    fontWeight: "bold",
    fontSize: "24px",
    lineHeight: "28px",
    textAlign: "center",
  },

  strong: {
    color: "$greyDark",
    fontWeight: "bold",
    fontSize: "16px",
    lineHeight: "19px",
    textAlign: "center",
  },
});

export const Box = styled("div", {});
