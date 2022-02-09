import React from "react";
import styled from "styled-components";

const Footer = () => {
  return (
    <Foot>
      <h1>I am The footer!!</h1>
    </Foot>
  );
};

export default Footer;

const Foot = styled.footer`
  height: 100px;
  background-color: black;
  position: absolute;
  margin-top: 130vh;
  width: 100%;
`;
