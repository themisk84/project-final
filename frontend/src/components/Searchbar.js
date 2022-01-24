import React from "react";

import styled from "styled-components";

const Searchbar = () => {
  return (
    <>
      <StyledSearch>Search</StyledSearch>
      <StyledInput type="text" />
    </>
  );
};

export default Searchbar;

const StyledSearch = styled.p`
  color: white;
  margin-bottom: 5px;
  font-size: 16px;
  font-weight: bold;
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
`;
