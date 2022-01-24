import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useSelector, useDispatch, batch } from "react-redux";

import { API_URL } from "utilis/urls";
import sightseeing from "../reducers/sightseeing";
import Navbar from "../components/Navbar";
import Searchbar from "../components/Searchbar";

const Start = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    fetch(API_URL("stories"))
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        const info = data.response;
        const info2 = data.response.map((item) => item);
        console.log(info2);
        if (data.success) {
          dispatch(sightseeing.actions.addSightseeing(data.response));
        }
      });
  }, []);

  // const sightseeingSearch = useSelector(
  //   (store) => store.sightseeing.sightseeings
  // );

  return (
    <StyledHero>
      <Navbar />
      <StyledContainer>
        {/* {sightseeingSearch.map((item) => {
          <p>{item.name}</p>;
        })} */}
        <StyledHeadline>Explore</StyledHeadline>
        <StyledHeadline>Scandinavia</StyledHeadline>
        <StyledParagraph>
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat."
        </StyledParagraph>
        <Searchbar />
        {/* <button onClick={()=> setCountry("Sweden")}>Sweden</button>
        <button>Denmark</button>
        <button>Norway</button> */}
      </StyledContainer>
    </StyledHero>
  );
};

export default Start;

const StyledHero = styled.div`
  background-image: url("/assets/background.png");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: right;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  position: absolute;
`;

const StyledHeadline = styled.h1`
  color: white;
  margin: 2px;
  font-size: 40px;
`;

const StyledContainer = styled.div`
  margin-top: 100px;
  padding: 0 25px 25px 25px;
`;
const StyledParagraph = styled.p`
  color: white;
  line-height: 1.3;
  font-size: 14px;
`;
