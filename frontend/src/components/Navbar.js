import React from "react";

import styled from "styled-components";

const Navbar = () => {
  return (
    <StyledHeader>
      <StyledLogo />

      <StyledHamburger>
        <div></div>
        <div></div>
        <div></div>
      </StyledHamburger>
    </StyledHeader>
  );
};

export default Navbar;

const StyledHeader = styled.nav`
  width: 100%;
  height: 70px;
  backdrop-filter: blur(12px);
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 25px;
`;
const StyledHamburger = styled.div`
  display: flex;
  width: 25px;
  height: 25px;
  flex-direction: column;
  justify-content: space-between;

  div {
    width: 30px;
    height: 3px;
    background-color: #56baa0;
    border-radius: 5px;
  }
`;

const StyledLogo = styled.div`
  background-image: url("/assets/logo.png");
  background-size: contain;
  background-repeat: no-repeat;
  height: 18px;
  width: 250px;
`;
