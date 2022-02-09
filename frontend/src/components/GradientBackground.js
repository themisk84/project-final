import React from "react";
import styled from "styled-components";

const GradientBackground = () => {
  return <StyledBackground />;
};

export default GradientBackground;

const StyledBackground = styled.div`
  background-image: linear-gradient(180deg, #36baa0, #061137);
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: -10;
`;
