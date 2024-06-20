import React from "react";
import { Link } from "react-router-dom";
import styled from "@emotion/styled/macro";

const Nav = styled.nav`
  display: flex;
  justify-content: center;
  padding-top: 16px;
`

const Navbar = () => {
  return (
    <Nav>
      <Link to="/" style={{ padding: 5 }}>Home</Link>
      <Link to="/favourites" style={{ padding: 5 }} >Favourites</Link>
    </Nav>
  );
}

export default Navbar;