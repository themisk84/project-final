import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";

import styled from "styled-components";
import { FaSortDown } from "react-icons/fa";

import Searchbar from "../components/Searchbar";
import AttractionCards from "components/AttractionCards";
import MapLocation from "components/MapLocation";

const Country = () => {
  const { country } = useParams();
  const [visible, setVisible] = useState(true);
  const [category, setCategory] = useState("");
  const [land, setLand] = useState(country); //land takes the place of country in useParams

  const navigate = useNavigate();

  let attractions = useSelector((store) =>
    store.sightseeing.sightseeings.filter((item) => item.country === land)
  );
  console.log(attractions);
  const categoryAttractions = attractions.filter(
    (item) => item.category === category
  );

  const showMenu = () => {
    if (visible) {
      setVisible(false);
    } else {
      setVisible(true);
    }
  };
  const categories = ["food", "culture", "activity", "music"];
  const countries = ["Sweden", "Norway", "Denmark"];

  const handleCategory = (event) => {
    setCategory(event.target.value);
  };
  // FOR ACTIVITY PAGE "ADD A COMMENT"

  return (
    <>
      <Main>
        <FilteringContainer>
          <h2>{land}</h2>
          {/* <SearchBarContainer>
            <Searchbar />
          </SearchBarContainer> */}
          <StyledToggle onClick={showMenu}>
            <FilterText>
              Filter Menu <FaSortDown />
            </FilterText>
            {/* <FaSortDown style={{ width: 23, height: 25, marginLeft: 5 }} /> */}
          </StyledToggle>
          {/* <div>
            <CountryChooseContainer>
              <FilterText>Country</FilterText>
              <form>
                <label htmlFor="country"></label>
                <Select
                  id="country"
                  value={land}
                  onChange={(event) => {
                    setLand(event.target.value); //asynchronous
                    navigate(`/country/${event.target.value}`);
                    setCategory("");
                  }}
                >
                  {countries.map((option, index) => (
                    <option key={index} value={option}>
                      {option}
                    </option>
                  ))}
                </Select>
              </form>
            </CountryChooseContainer>
            <div>
              <ButtonContainer>
                {categories.map((category) => (
                  <FilteringButton
                    key={category}
                    value={category}
                    onClick={handleCategory}
                  >
                    {category}
                  </FilteringButton>
                ))}
              </ButtonContainer>
            </div>
          </div> */}
          {visible && (
            <ToggleContainer>
              <CountryChooseContainer>
                <FilterText>Country</FilterText>
                <form>
                  <label htmlFor="country"></label>
                  <Select
                    id="country"
                    value={land}
                    onChange={(event) => {
                      setLand(event.target.value); //asynchronous
                      navigate(`/country/${event.target.value}`);
                      setCategory("");
                    }}
                  >
                    {countries.map((option, index) => (
                      <option key={index} value={option}>
                        {option}
                      </option>
                    ))}
                  </Select>
                </form>
              </CountryChooseContainer>

              <ButtonContainer>
                {categories.map((category) => (
                  <FilteringButton
                    key={category}
                    value={category}
                    onClick={handleCategory}
                  >
                    {category}
                  </FilteringButton>
                ))}
              </ButtonContainer>
            </ToggleContainer>
          )}
        </FilteringContainer>
        <MapAndCards>
          <MapLocation />
          <AttractionContainer>
            {category === ""
              ? attractions.map((item) => (
                  <AttractionCards item={item} key={item._id} />
                ))
              : categoryAttractions.map((item) => (
                  <AttractionCards key={item._id} item={item} />
                ))}
          </AttractionContainer>
        </MapAndCards>
      </Main>
    </>
  );
};

export default Country;

const Main = styled.div`
  // Why is it 100% width?
  @media (min-width: 768px) {
    display: flex;
    margin: 0 auto;
    border: 2px blue solid;
    /* flex-direction: column; */
  }
`;
const MapAndCards = styled.div`
  display: flex;
  flex-direction: column;
  @media (min-width: 768px) {
    margin-left: 350px;
  }
`;
const AttractionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 2px red solid;
  margin: 20px auto;

  /* background-color: white; */
  @media (min-width: 768px) {
    flex-direction: row;
    flex-wrap: wrap;
  }

  @media (min-width: 998px) {
    flex-wrap: wrap;
    justify-content: space-around;
  }
`;

const FilteringContainer = styled.div`
  padding-top: 100px;
  border: 2px yellow solid;
  color: #061137;
  width: 100%;

  @media (min-width: 768px) {
    position: fixed;
    top: 0;
    bottom: 0;
    width: 300px;
  }
  @media (min-width: 998px) {
    padding-top: 130px;

    /* margin: 0 auto; */
  }
`;
const StyledToggle = styled.div`
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Select = styled.select`
  border: 1px white solid;
  border-radius: 8px;
  background-color: rgba(255, 255, 255, 0.4);
  width: 200px;
  height: 35px;
  margin: 5px auto;
  font-size: 15px;
  @media (min-width: 768px) {
    width: 300px%;
  }
`;

const FilterText = styled.p`
  color: white;
  margin-bottom: 5px;
  font-size: 16px;
  font-weight: bold;
`;
const SearchBarContainer = styled.div`
  /* padding: 100px 25px 0px 25px; */
`;

const CountryChooseContainer = styled.div`
  padding: 0px 25px 0px 25px;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-left: 20px;
  width: 300px;
  margin: auto;
`;

const FilteringButton = styled.button`
  border: none;
  border-radius: 10px;
  padding: 8px 5px;
  width: 100px;
  margin: 5px;
  background-color: rgba(255, 255, 255, 0.4);
  cursor: pointer;
  &:hover {
    background-color: #56baa0;
    color: white;
  }
`;

const ToggleContainer = styled.div``;
