import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { FaSortDown } from "react-icons/fa";

import Navbar from "components/Navbar";
import Searchbar from "../components/Searchbar";
import AttractionCards from "components/AttractionCards";

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
  const countries = ["all", "Sweden", "Norway", "Denmark"];

  const handleCategory = (event) => {
    // setCountry("");
    setCategory(event.target.value);
  };


  return (
    <>
      <Navbar />
      <SearchBarContainer>
        <Searchbar />
      </SearchBarContainer>
      <StyledToggle onClick={showMenu}>
        <FilterText>Filter Menu</FilterText>
        <FaSortDown style={{ marginBottom: 5 }} />
      </StyledToggle>
      {visible && (
        <div>
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
          <div>
            <div>
              {categories.map((category) => (
                <button
                  key={category}
                  value={category}
                  onClick={handleCategory}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
      <AttractionContainer>
        {category === ""
          ? attractions.map((item) => (
            <AttractionCards
              item={item} key={item.id}
            />

          ))
          : categoryAttractions.map((item) => (
            <AttractionCards key={item.id} item={item} />
          ))}
      </AttractionContainer>
    </>
  );
};

export default Country;


const AttractionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 100px;
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
  padding: 10px;
  font-size: 18px;
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
// const AttractionCard = styled.div`
//   display: flex;
//   flex-direction: column;
//   width: 300px;
//   height: 300px;
//   border: 1px solid black;
//   border-radius: 10px;
//   margin-bottom: 10px;
//   background-repeat: no-repeat;
//   background-position: center;
//   background-size: cover;
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