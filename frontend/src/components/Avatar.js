import React from "react";
import styled from "styled-components";

const Avatar = ({ av, avatar, onChange, image }) => {
  return (
    <AvatarContainer>
      <label htmlFor={av}>
        <Input
          type="radio"
          id={av}
          value={av}
          onChange={onChange}
          checked={avatar === av}
        />
        <Img src={image} alt="avatar" />
      </label>
    </AvatarContainer>
  );
};

export default Avatar;

const AvatarContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100px;
`;
const Img = styled.img`
  height: 50px;
  width: 50px;
  border: 3px solid white;
  border-radius: 50%;
  cursor: pointer;

  &:hover {
    border: 3px solid rgb(120, 196, 195);
  }
`;

const Input = styled.input`
  display: none;
`;
