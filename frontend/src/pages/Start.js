import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useSelector, useDispatch, batch } from 'react-redux'
import sightseeing from '../reducers/sightseeing'
import Navbar from '../components/Navbar'
import Searchbar from '../components/Searchbar'

const Start = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    fetch('https://go-scandinavia.herokuapp.com/stories')
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        const info = data.response
        const info2 = data.response.map((item) => item)
        console.log(info2)
        if (data.success) {
          info.map((item) => {
            console.log(item)
            //dispatch(sightseeing.actions.addSightseeing(item));
          })
        } else {
        }
      })
  }, [])

  // const sightseeingSearch = useSelector(
  //   (store) => store.sightseeing.sightseeings
  // );
  const cities = ['Norway', 'Sweden', 'Denmark']

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
        <StyledContainerCountry>
          {cities.map((item) => (
            <StyledCountryWrapper>
              <StyledCountry item={item}></StyledCountry>
              <StyledTitle item={item}>{item}</StyledTitle>
            </StyledCountryWrapper>
          ))}
        </StyledContainerCountry>
        {/* <button onClick={()=> setCountry("Sweden")}>Sweden</button>
        <button>Denmark</button>
        <button>Norway</button> */}
      </StyledContainer>
    </StyledHero>
  )
}

export default Start

const StyledHero = styled.div`
  background-image: url('/assets/background.png');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: right;
  width: 100%;
  height: 110%;
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

const StyledContainerCountry = styled.div`
  display: flex;
  margin: 10px 0;
  overflow: auto;
  border: 1px solid red;
  width: 1000px;
  flex-wrap: wrap;
  div {
    display: flex;
    text-align: center;
  }
`
const StyledCountryWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 200px;
`
const StyledCountry = styled.div`
  height: 250px;
  background-size: cover;
  border-radius: 12px;
  ${(props) =>
    props.item === 'Norway'
      ? `background-image: url('/assets/norway.jpg')`
      : props.item === 'Sweden'
      ? `background-image:url('/assets/sweden.jpg')`
      : `background-image:url('/assets/denmark.jpg')`}
`
const StyledTitle = styled.p`
  text-align: center;
  font-weight: bold;
  text-transform: uppercase;

  ${(props) =>
    props.item === 'Norway'
      ? `color: #56baa0`
      : props.item === 'Sweden'
      ? `color: #638eca`
      : `color: #bedaa8`}
`
