import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { FaHeart } from "react-icons/fa";

import { API_URL } from "utilis/urls";

import sightseeing from "../reducers/sightseeing";

const Like = ({ item }) => {
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
        }
      });
  };
  return (
    <LikesContainer onClick={() => handleLike(item._id)}>
      <FaHeart
        style={{
          height: "15",
        }}
      />
      <LikesCount>{item.likes}</LikesCount>
    </LikesContainer>
  );
};

export default Like;

const LikesContainer = styled.button`
  background-color: rgba(54, 186, 160, 0.6);
  color: white;
  height: 28px;
  border: none;
  width: 52px;
  padding: 5px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  &:hover {
    color: #36baa0;
    background-color: rgba(255, 255, 255, 0.18);
  }
`;
const LikesCount = styled.p`
  font-size: 14px;
  margin: 0px 0px 0px 5px;
`;
