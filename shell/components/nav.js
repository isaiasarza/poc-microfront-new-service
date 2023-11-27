import React, { Suspense, lazy } from "react";
import dynamic from "next/dynamic";
import {
  Button,
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
console.log("fromHome", __webpack_share_scopes__, Link);

const Nav = ({ isLoggedIn }) => {
 const router = useRouter();
  const onButtonClicked = () => {
    if (isLoggedIn) router.push("/select-service-type", { scroll: false });
    else router.push("/login", { scroll: false });
  };

  return (
    <Navbar>
      <NavbarBrand>
        <p className="font-bold text-inherit">Mi TV</p>
      </NavbarBrand>
      {/* <NavbarContent className="hidden sm:flex gap-4" justify="center">
      <NavbarItem>
        <Link color="foreground" href="#">
          Features
        </Link>
      </NavbarItem>
      <NavbarItem isActive>
        <Link href="#" aria-current="page">
          Customers
        </Link>
      </NavbarItem>
      <NavbarItem>
        <Link color="foreground" href="#">
          Integrations
        </Link>
      </NavbarItem>
    </NavbarContent> */}
      <NavbarContent justify="end">
        <NavbarItem>
          <Button
            as={Link}
            color="primary"
            variant="flat"
            onPress={() => onButtonClicked()}
          >
            {isLoggedIn === true ? "Nuevo Servicio" : "Ingresar"}
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
};

export default Nav;
