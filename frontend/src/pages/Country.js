import React, { useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";

import sightseeing from "../reducers/sightseeing";
import { API_URL } from "utilis/urls";
import Navbar from "components/Navbar";

const AttractionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  /* margin-top: 70px; */
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
  const dispatch = useDispatch();
  const attractions = useSelector((store) => store.sightseeing.sightseeings);
  console.log("my attraction", attractions);

  useEffect(() => {
    fetch(API_URL("stories"))
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        // const info = data.response;
        // const info2 = data.response.map((item) => item);
        // console.log(info2);
        if (data.success) {
          dispatch(sightseeing.actions.addSightseeing(data.response));
        }
      });
  }, []);

  return (
    <>
      <div>
        {" "}
        <Navbar />
      </div>

      <AttractionContainer>
        {attractions.map((item) => (
          <AttractionCard
            key={item._id}
            style={{ backgroundImage: `url(${item.imageUrl})` }}
          >
            <LikeContainer>
              <button>
                <span>&hearts;</span>
              </button>
              x {item.likes}
            </LikeContainer>
            <HeaderContainer>
              <Header>{item.name}</Header>
              <Description>{item.description}</Description>
              <Description>{item.country}</Description>
            </HeaderContainer>
            {/* <h2></h2> */}

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
