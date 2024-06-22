import React from "react";
import { Link } from "react-router-dom";
import styled from "@emotion/styled/macro";

const Nav = styled.nav`
  display: flex;
  justify-content: center;
  padding-top: 16px;
`

const StyledLink = styled(Link)`
  padding: 5px;
`
const Navbar = () => {
  return (
    <Nav>
      <StyledLink to="/">Home</StyledLink>
      <StyledLink to="/favourites" >Favourites</StyledLink>
    </Nav>
  );
}

export default Navbar;