import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

const Searchbar = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const onQueryChange = (event) => {
    setQuery(event.target.value);
  };



  const onFormSubmit = (event) => {
    event.preventDefault();
    navigate(
      `/search?name=${query}&description=${query}&country=${query}&category=${query}`
    );
  };

  // const stories = useSelector((store) => store.sightseeing.sightseeings);
  // console.log(stories);
  return (
    <StyledContainerSearch>
      <StyledForm className="input-form" onSubmit={onFormSubmit}>
        <StyledSearch htmlFor="search">Search</StyledSearch>
        <StyledInput
          type="text"
          id="search"
          value={query}
          onChange={onQueryChange}
        />
      </StyledForm>
    </StyledContainerSearch>
  );
};

export default Searchbar;

const StyledSearch = styled.label`
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
`;
const StyledForm = styled.form`
  @media (min-width: 768px) {
    display: flex;
    flex-direction: column;
  }
`;
