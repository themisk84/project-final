import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import Like from "./Like";

const AttractionCards = ({ item }) => {
  const navigate = useNavigate();
  const onAttractionClick = (id) => {
    navigate(`/activity/${id}`);
  };
  return (
    <>
      <LikeCardDiv>
        <Like item={item} />
        <AttractionCard
          onClick={() => onAttractionClick(item._id)}
          style={{ backgroundImage: `url(${item.imageUrl})` }}
        >
          <CommentContainer>{/* <span>&#128172;</span> */}</CommentContainer>

          <HeaderContainer>
            <Header>{item.name}</Header>
            <Description>{item.description}</Description>
            <Description>{item.country}</Description>
          </HeaderContainer>
        </AttractionCard>
      </LikeCardDiv>
    </>
  );
};

export default AttractionCards;

const LikeCardDiv = styled.div`
  position: relative;
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

const CommentContainer = styled.div`
  width: 40px;
`;

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
`;

const Header = styled.h1`
  color: white;
  font-size: 20px
  margin: 0;
`;

const Description = styled.p`
  color: white;
  font-size: 16px;
  -webkit-line-clamp: 3;
  overflow: hidden;
`;
