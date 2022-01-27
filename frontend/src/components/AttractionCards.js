import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import { API_URL } from '../utilis/urls';
import sightseeing from '../reducers/sightseeing'

const AttractionCards = ({ item }) => {
  const dispatch = useDispatch();

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
  }


  return (
    <AttractionCard
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
    </AttractionCard>
  )
}

export default AttractionCards

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