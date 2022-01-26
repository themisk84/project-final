import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useSelector, useDispatch, batch } from "react-redux";
import { Link } from "react-router-dom";
import sightseeing from "../reducers/sightseeing";
import Navbar from "../components/Navbar";
import Searchbar from "../components/Searchbar";

const Start = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    fetch("https://go-scandinavia.herokuapp.com/stories")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          dispatch(sightseeing.actions.addSightseeing(data.response));
        } else {
        }
      });
  }, []);

  const cities = ["Norway", "Sweden", "Denmark"];

  const countries = useSelector((store) => store.sightseeing.sightseeings);
  console.log(countries.map((item) => item.country));

  return (
    <StyledHero>
      <Navbar />
      <StyledContainer>
        <StyledHeadline>Explore</StyledHeadline>
        <StyledHeadline>Scandinavia</StyledHeadline>
        <StyledParagraph>
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat."
        </StyledParagraph>
        <Searchbar />
        <StyledContainerCountry>
          {cities.map((item, index) => (
            <StyledLink key={index} to={`/country/${item}`}>
              <StyledCountryWrapper>
                <StyledCountry item={item}></StyledCountry>
                <StyledTitle item={item}>{item}</StyledTitle>
              </StyledCountryWrapper>
            </StyledLink>
          ))}
        </StyledContainerCountry>
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
  height: 110%;
  display: flex;
  flex-direction: column;
  position: absolute;
  @media (min-width: 390px) {
    background-position: center;
  }
`;

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

const StyledHeadline = styled.h1`
  color: white;
  margin: 2px;
  font-size: 40px;
  @media (min-width: 390px) {
    margin-top: 10px;
  }
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

const StyledContainerCountry = styled.div`
  display: flex;
  margin: 10px 10px 0 -25px;
  overflow-x: auto;
  width: 100vw;
  padding-left: 25px;
  div {
    display: flex;
    /* padding: 14px; */
    text-align: center;
  }
  &::-webkit-scrollbar {
    display: none;
  }
  @media (min-width: 390px) {
    margin: 40px 10px 0 -25px;
  }
`;
const StyledCountryWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 200px;
  margin-right: 25px;
`;
const StyledCountry = styled.div`
  height: 250px;
  width: 200px;
  background-size: cover;
  border-radius: 12px;
  ${(props) =>
    props.item === "Norway"
      ? `background-image: url('/assets/norway.jpg'); background-position: right`
      : props.item === "Sweden"
      ? `background-image:url('/assets/sweden.jpg')`
      : `background-image:url('/assets/denmark.jpg')`}
`;
const StyledTitle = styled.p`
  text-align: center;
  font-weight: bold;
  text-transform: uppercase;

  ${(props) =>
    props.item === "Norway"
      ? `color: #96e2af`
      : props.item === "Sweden"
      ? `color: #86e7ff`
      : `color: #fdedaa`}
`;
const StyledLink = styled(Link)`
  text-decoration: none;
`;
