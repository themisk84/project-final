import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { FaSortDown } from "react-icons/fa";

import sightseeing from "../reducers/sightseeing";
import user from "../reducers/user";
import { API_URL } from "utilis/urls";
import Navbar from "components/Navbar";
import Searchbar from "../components/Searchbar";
import FilteringDiv from "../components/FilteringDiv";

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
const Option = styled.option``;

const FilterText = styled.p`
  color: white;
  margin-bottom: 5px;
  font-size: 16px;
  font-weight: bold;
`;
const SearchBarContainer = styled.div`
  padding: 100px 25px 0px 25px;
`;
const AttractionCard = styled.div`
  display: flex;
  flex-direction: column;
  width: 300px;
  height: 300px;
  border: 1px solid black;
  border-radius: 10px;
  margin-bottom: 10px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
`;

const LikeContainer = styled.div`
  color: white;
  align-self: flex-end;
  margin: 10px;
`;

const CommentContainer = styled.div`
  width: 40px;
`;
const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Header = styled.h1`
  color: white;
  font-size: 20px
  margin: 0;
`;

const Description = styled.p`
  color: white;
  font-size: 16px;
`;

const Country = () => {
  const { country } = useParams();
  const [visible, setVisible] = useState(true);
  const [category, setCategory] = useState("");
  const [land, setLand] = useState(country);

  const accessToken = useSelector((store) => store.user.accessToken);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  console.log("Country from params", country);
  console.log(useParams());

  useEffect(() => {
    fetch(API_URL(`country/${country}`))
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          dispatch(sightseeing.actions.addSightseeing(data.response));
        }
      });
  }, [country]);

  // useEffect(() => {
  //   // fetch(API_URL(`country/${land}`))
  //   //   .then((res) => res.json())
  //   //   .then((data) => {
  //   //     console.log("Another fetch", data);
  //   //     if (data.success) {
  //   //       dispatch(sightseeing.actions.addSightseeing(data.response));
  //   //     }
  //   //   });

  //   console.log(land);
  // }, [land]);

  const attractions = useSelector((store) => store.sightseeing.sightseeings);

  const handleLike = (storyId) => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    };

    fetch(API_URL(`stories/${storyId}/like`), options)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          dispatch(sightseeing.actions.addLike(data.response));
        } else {
        }
      });
  };

  const handleComments = (storyId) => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: accessToken,
      },
    };

    fetch(API_URL(`stories/${storyId}/comments`), options)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          dispatch(sightseeing.actions.addComment(data.response));
        } else {
        }
      });
  };

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

  const fetchCategory = (category) => {
    fetch(API_URL(`category/${category ? category : "culture"}`))
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          console.log("Category", data);
        }
      });
  };

  return (
    <>
      <Navbar />
      <SearchBarContainer>
        <Searchbar />
      </SearchBarContainer>
      {/* <FilteringDiv
        country={country}
        category={category}
        visible={visible}
        showMenu={showMenu}
        categories={categories}
        handleCategory={handleCategory}
        fetchCategory={fetchCategory}
        countries={countries}
      /> */}
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
              }}
            >
              {console.log("Country", country)}
              {console.log("Land", land)}
              {console.log("Type", typeof land)}
              {console.log("Type", typeof country)}
              {/* <option disabled value="">

                  Change country
                </option> */}
              {countries.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </Select>
          </form>
          <div>
            <div onClick={fetchCategory(category)}>
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
        {attractions.map((item) => (
          <AttractionCard
            key={item._id}
            style={{ backgroundImage: `url(${item.imageUrl})` }}
          >
            <CommentContainer>
              <span>&#128172;</span>
            </CommentContainer>
            <LikeContainer>
              <button onClick={() => handleLike(item._id)}>
                <span>&hearts;</span>
              </button>
              x {item.likes}
            </LikeContainer>
            <HeaderContainer>
              <Header>{item.name}</Header>
              <Description>{item.description}</Description>
              <Description>{item.country}</Description>
            </HeaderContainer>
            <h2></h2>

            {/* <p>{item.category}</p> */}
            {/* <a href={item.link}>{item.link}</a> */}
            {/* <div>{item.location}</div>
            <div>{item.user}</div>
            <div>{item.rating}</div>
            <div>{item.createdAt}</div> */}

            {/* <div>{item._id}</div> */}
          </AttractionCard>
        ))}
      </AttractionContainer>
    </>
  );
};

export default Country;
