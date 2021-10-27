import { styled } from "../stitches.config";

const Wrapper = styled("footer", {
  fontWeight: "bold",
  fontSize: "16px",
  lineHeight: "19px",
});

const Footer: React.FunctionComponent = () => {
  return <Wrapper>Terms&Conditions | Privacy policy</Wrapper>;
};

export default Footer;
