import { styled } from "../stitches.config";
import Image from "next/image";
import Link from "next/link";

import MenuBarImage1 from "../public/menubar-1.png";
import MenuBarImage2 from "../public/menubar-2.png";
import MenuBarImage3 from "../public/menubar-3.png";
import MenuBarImage4 from "../public/menubar-4.png";
import MenuBarImage5 from "../public/menubar-5.png";

const Wrapper = styled("div", {
  display: "flex",
  flexDirection: "column",
});

const MenuBarItem = styled("a", {
  all: "unset",
  padding: "$5",
  cursor: "pointer",

  "&:hover": {
    background: "$grey",
  },

  "&:focus": {
    boxShadow: "0 0 0 1px $greyDark",
  },
});

const MENUBARITEMS = [
  {
    name: "Menu 1",
    href: "/",
    image: MenuBarImage1,
  },
  {
    name: "Menu 2",
    href: "/",
    image: MenuBarImage2,
  },
  {
    name: "Menu 3",
    href: "/",
    image: MenuBarImage3,
  },
  {
    name: "Menu 4",
    href: "/",
    image: MenuBarImage4,
  },
  {
    name: "Menu 5",
    href: "/",
    image: MenuBarImage5,
  },
];

const MenuBar: React.FunctionComponent = () => {
  return (
    <Wrapper>
      {MENUBARITEMS.map(({ name, href, image }) => (
        <Link href={href} key={name} passHref>
          <MenuBarItem>
            <Image src={image} alt={name} />
          </MenuBarItem>
        </Link>
      ))}
    </Wrapper>
  );
};

export default MenuBar;
