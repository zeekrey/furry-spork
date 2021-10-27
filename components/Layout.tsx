import { styled } from "../stitches.config";

import Navigation from "./Navigation";
import Footer from "./Footer";

const LayoutWrapper = styled("div", {
  display: "flex",
  flexDirection: "column",
  minHeight: "100vh",
});

const Layout: React.FunctionComponent = ({ children }) => {
  return (
    <LayoutWrapper>
      <Navigation />
      {children}
    
    </LayoutWrapper>
  );
};

export default Layout;
