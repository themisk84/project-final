import React, { useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { API_URL } from "utilis/urls";

import { ui } from "../reducers/ui";
import sightseeing from "../reducers/sightseeing";

import Searchbar from "../components/Searchbar";
import Loader from "../components/Loader";

const Start = () => {
  const loading = useSelector((store) => store.ui.loading);
  const dispatch = useDispatch();

  useEffect(() => {
    // if(sightseeing.length === 0) {
    dispatch(ui.actions.setLoading(true));
    fetch(API_URL("stories"))
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setTimeout(() => {
            dispatch(sightseeing.actions.addSightseeing(data.response));
            dispatch(ui.actions.setLoading(false));
          }, 100);
        } else {
        }
      });
    // }
  }, [dispatch]);

  const cities = ["Norway", "Sweden", "Denmark"];

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <StyledHero>
          <StyledContainer>
            <StyledHeadline>Explore</StyledHeadline>
            <StyledHeadline>Scandinavia</StyledHeadline>
            <StyledParagraph>
              In English usage, Scandinavia can refer to Denmark, Norway, and
              Sweden, sometimes more narrowly to the Scandinavian Peninsula. The
              geography of Scandinavia is extremely varied. Notable are the
              Norwegian fjords, the Scandinavian Mountains covering much of
              Norway and parts of Sweden, the flat, low areas in Denmark and the
              archipelagos of Norway, Sweden, and Finland.
            </StyledParagraph>
            <StyledCircle></StyledCircle>
            <Searchbar />
            <StyledChooseCountry>Choose a country</StyledChooseCountry>
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
      )}
    </>
  );
};

export default Start;

const StyledHero = styled.div`
  background-image: url("/assets/background.png");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: right;
  width: 100%;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  position: absolute;
  @media (min-width: 390px) {
    background-position: center;
  }
`;

const StyledHeadline = styled.h1`
  color: white;
  margin: 2px;
  font-size: 40px;
  @media (min-width: 390px) {
    margin-top: 10px;
  }
  @media (min-width: 768px) {
    font-size: 60px;
    margin: 0;
    /* padding: 10px 50px; */
  }
`;

const StyledContainer = styled.div`
  margin-top: 100px;
  padding: 25px;
  width: 100%;
  @media (min-width: 768px) {
    padding: 25px 50px;
    overflow-x: hidden;
  }
  @media (min-width: 992px) {
    padding: 25px 80px;
    overflow-x: hidden;
    max-width: 1300px;
    margin: 100px auto 0 auto;
  }
`;
const StyledParagraph = styled.p`
  color: white;
  line-height: 1.3;
  font-size: 14px;
  @media (min-width: 768px) {
    max-width: 55%;
    font-size: 20px;
  }
`;

const StyledContainerCountry = styled.div`
  display: flex;
  margin: 10px 10px 0 -25px;
  overflow-x: auto;
  width: 100vw;
  padding-left: 25px;
  div {
    display: flex;
    text-align: center;
  }
  &::-webkit-scrollbar {
    display: none;
  }
  @media (min-width: 390px) {
    margin: 40px 10px 0 -25px;
  }
  @media (min-width: 768px) {
    margin: 0;
    padding: 0;
    overflow-x: hidden;
    width: auto;
    justify-content: center;
  }
  @media (min-width: 992px) {
    justify-content: left;
  }
`;
const StyledCountryWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 200px;
  margin-right: 25px;
  @media (min-width: 992px) {
    width: 250px;
  }
`;
const StyledCountry = styled.div`
  height: 250px;
  width: 200px;
  background-size: cover;
  border-radius: 12px;
  @media (min-width: 992px) {
    height: 300px;
    width: 250px;
  }
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
  @media (min-width: 992px) {
    font-size: 22px;
  }

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

const StyledCircle = styled.div`
  display: none;
  @media (min-width: 768px) {
    display: flex;
    height: 300px;
    width: 300px;
    border-radius: 50%;
    background-image: url("/assets/man.jpeg");
    position: absolute;
    background-size: cover;
    top: 250px;
    right: 40px;
  }
  @media (min-width: 992px) {
    height: 30vw;
    width: 30vw;
    top: 130px;
    right: 40px;
  }
`;
const StyledChooseCountry = styled.p`
  color: white;
  margin-bottom: 5px;
  font-size: 16px;
  text-align: left;
  font-weight: bold;
  @media (min-width: 768px) {
    text-align: center;
  }
  @media (min-width: 768px) {
    text-align: left;
    font-size: 20px;
    margin-top: 40px;
    margin-bottom: 10px;
  }
`;
