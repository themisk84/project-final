import React, { useState } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { FaSortDown } from "react-icons/fa";

import Searchbar from "../components/Searchbar";
import AttractionCards from "components/AttractionCards";
import GradientBackground from "components/GradientBackground";

const Country = () => {
  const { country } = useParams();
  const [visible, setVisible] = useState(false);
  const [category, setCategory] = useState("");
  const [land, setLand] = useState(country); //land takes the place of country in useParams

  const navigate = useNavigate();
  const accessToken = useSelector((store) => store.user.accessToken);

  let attractions = useSelector((store) =>
    store.sightseeing.sightseeings.filter((item) => item.country === land)
  );
  console.log(attractions);
  const categoryAttractions = attractions.filter(
    (item) => item.category === category
  );

  console.log(categoryAttractions);

  console.log("category", categoryAttractions);

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
          <SearchBarContainer>
            <Searchbar />
          </SearchBarContainer>
          <StyledToggle onClick={showMenu}>
            <FilterText>Filter Menu</FilterText>
            <FaSortDown style={{ width: 23, height: 25, marginLeft: 5 }} />
          </StyledToggle>
          {visible && (
            <div>
              <CountryChooseCountainer>
                <FilterText>Country</FilterText>
                <form>
                  <label htmlFor="country"></label>
                  <Select
                    id="country"
                    value={land}
                    onChange={(event) => {
                      setLand(event.target.value); //asychronous
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
              </CountryChooseCountainer>
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
            </div>
          )}
        </FilteringContainer>

        <AttractionContainer>
          {category === ""
            ? attractions.map((item) => (
                <AttractionCards item={item} key={item._id} />
              ))
            : categoryAttractions.map((item) => (
                <AttractionCards key={item._id} item={item} />
              ))}
        </AttractionContainer>
      </Main>
    </>
  );
};

export default Country;

const Main = styled.div`
  @media (min-width: 768px) {
    display: flex;
    flex-direction: row;
  }
`;

const AttractionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 100px;
  /* background-color: white; */
  @media (min-width: 768px) {
    flex-direction: row;
    min-height: 150vh;
  }
`;

const FilteringContainer = styled.div`
  @media (min-width: 768px) {
    width: 300px;
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
  width: 100%;
  height: 35px;
  margin: 5px 0;
  font-size: 15px;
  }
`;

const FilterText = styled.p`
  color: white;
  margin-bottom: 5px;
  font-size: 16px;
  font-weight: bold;
`;
const SearchBarContainer = styled.div`
  padding: 100px 25px 0px 25px;
`;

const CountryChooseCountainer = styled.div`
  padding: 0px 25px 0px 25px;
`;

const ButtonContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 5px;
  justify-items: center;
  width: 80%;
  margin-left: 20px;
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

// const AttractionCards = styled.div`
//   width: 50%;
// `;

// const LikeContainer = styled.div`
//   color: white;
//   align-self: flex-end;
//   margin: 10px;
// `;

// const CommentContainer = styled.div`
//   width: 40px;
// `;
// const HeaderContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
// `;

// const Header = styled.h1`
//   color: white;
//   font-size: 20px
//   margin: 0;
// `;

// const Description = styled.p`
//   color: white;
//   font-size: 16px;
// `;
