import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { FaRegCompass } from "react-icons/fa";
import { Link } from "react-router-dom";

import { ui } from "reducers/ui";
import { API_URL } from "utilis/urls";

const UserPage = () => {
  const [saved, setSaved] = useState([]);
  const dispatch = useDispatch();
  const accessToken = useSelector((store) => store.user.accessToken);
  // const saved = useSelector((store) => store?.user?.savedSights);

  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        Authorization: accessToken,
      },
    };

    dispatch(ui.actions.setLoading(true));
    fetch(API_URL("stories/saved"), options)
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        if (data.success) {
          setSaved(data.response.savedPosts);
          dispatch(ui.actions.setLoading(false));
        } else {
          console.log("Problem", data);
        }
      });
  }, [dispatch, accessToken]);

  const sightseeing = useSelector((store) => store.sightseeing.sightseeings);

  const savedPosts = saved?.map((s) => {
    return sightseeing.filter((item) => item._id.includes(s));
  });

  return (
    <>
      <StyledHeadline>My saved posts</StyledHeadline>
      <AttractionContainer>
        {savedPosts?.length === 0 && (
          <div
            style={{
              textAlign: "center",
              fontSize: 20,
              color: "#061137",
              marginTop: 10,
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            You haven't saved any posts yet.
          </div>
        )}

        {/* {savedPosts.length === 1 && (
          <DeleteContainer>
            <FaTrash onClick={() => onDeleteSavedPost(saved._id)} />
            <StyledLink key={saved._id} to={`/activity/${saved._id}`}>
              <LikedPostWrapper>
                <ImageContainer image={saved.imageUrl} />{" "}
                <InfoContainer>
                  <ActivityName>{saved.name}</ActivityName>
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
                      {saved.location}
                    </p>
                  </InfoWrapper>
                  <InfoWrapper>
                    <p style={{ margin: 0 }}>Category:</p>
                    <p style={{ margin: 0, marginLeft: 5 }}>{saved.category}</p>
                  </InfoWrapper>
                </InfoContainer>
              </LikedPostWrapper>
            </StyledLink>
          </DeleteContainer>
        )} */}

        {savedPosts?.map((item) => {
          // console.log(item[0]._id);
          return (
            <>
              <DeleteContainer>
                <StyledLink key={item[0]._id} to={`/activity/${item[0]._id}`}>
                  <LikedPostWrapper>
                    <ImageContainer image={item[0].imageUrl} />{" "}
                    <InfoContainer>
                      <ActivityName>{item[0].name}</ActivityName>
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
                          {item[0].location}
                        </p>
                      </InfoWrapper>
                      <InfoWrapper>
                        <p style={{ margin: 0 }}>Category:</p>
                        <p style={{ margin: 0, marginLeft: 5 }}>
                          {item[0].category}
                        </p>
                      </InfoWrapper>
                    </InfoContainer>
                  </LikedPostWrapper>
                </StyledLink>
              </DeleteContainer>
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
    width: 85%;
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
  height: 150px;
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

const DeleteContainer = styled.div`
  width: 100%;
  height: 200px;

  @media (min-width: 768px) {
    width: 50%;
  }
`;
