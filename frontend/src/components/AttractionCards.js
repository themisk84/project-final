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
      <AttractionCard
        onClick={() => onAttractionClick(item._id)}
        style={{ backgroundImage: `url(${item.imageUrl})` }}
      >
        <Like item={item} />
        <CommentContainer>{/* <span>&#128172;</span> */}</CommentContainer>

        <HeaderContainer>
          <Header>{item.name}</Header>
          <Description>{item.description}</Description>
          <Description>{item.country}</Description>
        </HeaderContainer>
      </AttractionCard>
    </>
  );
};

export default AttractionCards;

const AttractionCard = styled.article`
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
  margin: 20px;
`;

const CommentContainer = styled.section`
  width: 40px;
  -webkit-line-clamp: 3;
`;

const HeaderContainer = styled.section`
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
