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
        } else {
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
  position: absolute;
  background-color: rgba(255, 255, 255, 0.4);
  height: 30px;
  border: none;
  width: 55px;
  padding: 5px 7px 7px 5px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer: cursor;
`;

const LikesCount = styled.p`
  font-size: 15px;
  margin: 0px 0px 0px 5px;
`;
