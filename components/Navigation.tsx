import { styled, Box } from "../stitches.config";
import LogoImage from "../public/logo.png";
import BurgerIcon from "../public/burger.svg";

import Image from "next/image";
import ProfileImage from "./ProfileImage";

const Wrapper = styled("nav", {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",

  borderBottom: "1px solid $grey",
});

const FlexCenter = styled("div", {
  display: "flex",
  alignItems: "center",
});

const Navigation: React.FunctionComponent<{
  user?: { name: string; initials: string };
}> = ({ user = { name: "John Doe", initials: "JD" } }) => {
  return (
    <Wrapper>
      <FlexCenter css={{ padding: "$5" }}>
      <Box css={{ paddingRight: "$2" }}>
        <Image src={LogoImage} alt="Acme Logo" /></Box>
        <Box css={{ paddingLeft: "$4" }}>
          <Image src={BurgerIcon} alt="Menu button" />
          </Box>
      </FlexCenter>
      <FlexCenter css={{ padding: "$5" }}>
        <ProfileImage css={{ marginRight: "$2" }}>{user.initials}</ProfileImage>
        <div>{user.name}</div>
      </FlexCenter>
    </Wrapper>
  );
};

export default Navigation;
