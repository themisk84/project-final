import React, { useState } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";

import Searchbar from "components/Searchbar";
import PostSightseeing from "../components/PostSightseeing";
import user from "../reducers/user";
import AttractionCards from "components/AttractionCards";

const UserPage = () => {
  const [form, setForm] = useState(false);
  const username = useSelector((store) => store.user.username);
  const userId = useSelector((store) => store.user.userId);
  console.log(userId);

  const addForm = useSelector((store) => store.user.form);

  const myPosts = useSelector((store) =>
    store.sightseeing.sightseeings.filter((item) => item.user._id === userId)
  );
  console.log(myPosts);

  const handleForm = () => {
    setForm(true);
  };

  return (
    <>
      <h1></h1>
      <h1>{username}</h1>
      <Searchbar />

      {addForm ? (
        <PostSightseeing />
      ) : (
        <AttractionContainer>
          {myPosts &&
            myPosts.map((item) => (
              <AttractionCards item={item} key={item._id} />
            ))}
        </AttractionContainer>
      )}
    </>
  );
};

export default UserPage;

const AttractionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 100px;
  background-color: white;
`;
