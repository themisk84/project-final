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
  width: 100vw;
  height: 80vh;
  z-index: -10;
`;
