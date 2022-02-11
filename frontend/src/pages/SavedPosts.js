import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { FaRegCompass } from "react-icons/fa";
import { Link } from "react-router-dom";

const UserPage = () => {
  const saved = useSelector((store) => store.user?.savedSights);

  return (
    <>
      <StyledHeadline>My saved posts</StyledHeadline>
      {saved?.length === 0 && <div>You have not saved any posts</div>}
      <AttractionContainer>
        {saved?.map((item) => {
          return (
            <>
              <StyledLink key={item._id} to={`/activity/${item._id}`}>
                <LikedPostWrapper>
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
                      <p style={{ margin: 0 }}>Category:</p>
                      <p style={{ margin: 0, marginLeft: 5 }}>
                        {item.category}
                      </p>
                    </InfoWrapper>
                  </InfoContainer>
                </LikedPostWrapper>
              </StyledLink>
            </>
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
    justify-content: flex-start;
    flex-wrap: wrap;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0;
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

const StyledLink = styled(Link)`
  border-radius: 20px;
  width: 100%;
  height: 150px;
  margin-bottom: 20px;
  overflow: hidden;
  display: flex;
  text-decoration: none;
  color: black;
  margin: 10px auto;
  @media (min-width: 768px) {
    width: 31%;
  }
`;

const LikedPostWrapper = styled.div`
  border-radius: 20px;
  width: 100%;
  height: 150px;
  margin-bottom: 20px;
  overflow: hidden;
  display: flex;
  background-color: white;
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
