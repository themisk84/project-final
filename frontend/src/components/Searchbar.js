import React from "react";

import styled from "styled-components";

const Searchbar = () => {
  return (
    <StyledContainerSearch>
      <StyledSearch>Search</StyledSearch>
      <StyledInput type="text" />
    </StyledContainerSearch>
  );
};

export default Searchbar;

const StyledSearch = styled.p`
  color: white;
  margin-bottom: 5px;
  font-size: 16px;
  font-weight: bold;
  @media (min-width: 768px) {
    width: 300px;
  }
  @media (min-width: 992px) {
    width: 500px;
    font-size: 20px;
  }
`;

const StyledInput = styled.input`
  border: 1px white solid;
  border-radius: 8px;
  background-color: rgba(255, 255, 255, 0.4);
  width: 100%;
  height: 35px;
  margin: 5px 0;
  color: white;
  padding: 10px;
  font-size: 18px;
  @media (min-width: 768px) {
    width: 300px;
  }
  @media (min-width: 992px) {
    width: 500px;
  }
`;
const StyledContainerSearch = styled.div`
@media (min-width: 768px) {
  margin: 20px 0 50px;
  display: flex;
  flex-direction: column;
  justify-content: left;
  align-items: left;
}
`