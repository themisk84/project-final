import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useSelector, useDispatch, batch } from "react-redux";
import sightseeing from "../reducers/sightseeing";

const Start = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    fetch("https://go-scandinavia.herokuapp.com/stories")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        const info = data.response;
        const info2 = data.response.map((item) => item);
        console.log(info2);
        if (data.success) {
          info.map((item) => {
            console.log(item);
            //dispatch(sightseeing.actions.addSightseeing(item));
          });
        } else {
        }
      });
  }, []);

  // const sightseeingSearch = useSelector(
  //   (store) => store.sightseeing.sightseeings
  // );

  return (
    <StyledHero>
      <StyledHeader>
        <StyledLogo />

        <StyledHamburger>
          <div></div>
          <div></div>
          <div></div>
        </StyledHamburger>
      </StyledHeader>
      <StyledContainer>
        {/* {sightseeingSearch.map((item) => {
          <p>{item.name}</p>;
        })} */}
        <StyledHeadline>Explore</StyledHeadline>
        <StyledHeadline>Scandinavia</StyledHeadline>
        <StyledParagraph>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."</StyledParagraph>
        <StyledSearch>Search</StyledSearch>
        <StyledInput type="text" />
        {/* <button onClick={()=> setCountry("Sweden")}>Sweden</button>
        <button>Denmark</button>
        <button>Norway</button> */}
      </StyledContainer>

    </StyledHero >
  );
};

export default Start;

const StyledHero = styled.div`
background-image: url('/assets/background.png');
background-size: cover;
background-repeat: no-repeat;
background-position: right;
width: 100%;
height: 100%;
display: flex;
flex-direction: column;
position: absolute;
`

const StyledHeader = styled.nav`
width: 100%;
height: 70px;
backdrop-filter: blur(12px);
position: fixed;
display: flex;
align-items: center;
justify-content: space-between;
padding: 25px;
`
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
`

const StyledLogo = styled.div`
background-image: url('/assets/logo.png');
background-size: contain;
background-repeat: no-repeat;
height: 18px;
width: 250px;
`
const StyledHeadline = styled.h1`
color: white;
margin: 2px;
font-size: 40px;
`

const StyledContainer = styled.div`
margin-top: 100px;
padding: 0 25px 25px 25px;
`
const StyledParagraph = styled.p`
color: white;
line-height: 1.3;
font-size: 14px;
`
const StyledSearch = styled.p`
color: white;
margin-bottom: 5px;
font-size: 16px;
font-weight: bold;
`

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
`
