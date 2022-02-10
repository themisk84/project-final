import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { FaRegCompass } from "react-icons/fa";

const UserPage = () => {
  const userId = useSelector((store) => store.user.userId);

  const myPosts = useSelector((store) =>
    store.sightseeing.sightseeings.filter((item) => item.user._id === userId)
  );

  return (
    <>
      <StyledHeadline>My posts</StyledHeadline>
      <AttractionContainer>
        {myPosts.length === 0 && <div>You have not made any post yet!</div>}

        {myPosts.map((item) => {
          return (
            <PostWrapper key={item._id} to={`/activity/${item._id}`}>
              <ImageContainer image={item.imageUrl} />
              <InfoContainer>
                <ActivityName>{item.name}</ActivityName>
                <InfoWrapper>
                  <FaRegCompass
                    style={{
                      marginRight: "6",
                      height: "14",
                    }}
                  />
                  <p
                    style={{
                      fontSize: "14px",
                      fontStyle: "italic",
                    }}
                  >
                    {item.location}
                  </p>
                </InfoWrapper>
                <InfoWrapper>
                  <p>Category:</p>
                  <p style={{ marginLeft: 5 }}>{item.category}</p>
                </InfoWrapper>
              </InfoContainer>
            </PostWrapper>
          );
        })}
      </AttractionContainer>
    </>
  );
};

export default UserPage;

const AttractionContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  width: 100%;
  @media (min-width: 768px) {
    flex-direction: row;
    flex-wrap: wrap;
  }
`;
const StyledHeadline = styled.h2`
  color: #061137;
  margin: 100px auto 0 auto;
  text-align: center;
  @media (min-width: 768px) {
    margin: 200px auto 50px auto;
  }
`;
const PostWrapper = styled(Link)`
  border-radius: 20px;
  width: 300px;
  height: 150px;
  margin-bottom: 20px;
  overflow: hidden;
  display: flex;
  background-color: white;
  text-decoration: none;
  color: black;
  margin: 10px auto;
  @media (min-width: 768px) {
    width: 400px;
  }
`;
const ImageContainer = styled.div`
  height: 100%;
  width: 45%;
  background-image: ${(props) => `url(${props.image})`};
  background-size: cover;
  background-position: center;
`;
const InfoContainer = styled.div`
  background-color: white;
  border-radius: 20px;
  margin-left: -20px;
  padding: 15px;
`;
const ActivityName = styled.h3`
  margin: 0;
  margin-top: 10px;
`;
const InfoWrapper = styled.div`
  display: flex;
  align-items: center;
`;
