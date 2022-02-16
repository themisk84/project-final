import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import moment from "moment";
import { FaSortDown, FaSplotch, FaTimesCircle } from "react-icons/fa";
import { API_URL } from "utilis/urls";

import sightseeing from "../reducers/sightseeing";
import user from "../reducers/user";

import Like from "../components/Like";
import Comment from "../components/Comment";
import GradientBackground from "components/GradientBackground";

import {
  FaBookmark,
  FaChevronLeft,
  FaRegCompass,
  FaPlus,
} from "react-icons/fa";

const Activity = () => {
  const { activityId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const [comment, setComment] = useState("");
  const [showComments, setShowComments] = useState(2);
  const accessToken = useSelector((store) => store.user.accessToken);

  const thisActivity = useSelector((store) =>
    store.sightseeing.sightseeings.find((item) => item._id === activityId)
  );

  const saved = useSelector((store) =>
    store.user.savedSights.find((item) => item._id === thisActivity._id)
  );
  const userId = useSelector((store) => store.user.userId);
  const ratings = thisActivity.rating / 20;

  const showInput = () => {
    if (visible) {
      setVisible(false);
    } else {
      setVisible(true);
    }
  };

  const handleDeletePost = (id) => {
    const options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: accessToken,
      },
    };

    if (userId === thisActivity.user._id) {
      fetch(API_URL(`stories/${id}`), options)
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            dispatch(sightseeing.actions.deletePost(data.response._id));
            navigate(-1);
          } else {
          }
        });
    }
  };

  const savePost = (id) => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: accessToken,
      },
      body: JSON.stringify({ thisActivity }),
    };

    fetch(API_URL(`stories/saved/${id}`), options)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.success) {
          dispatch(user.actions.addSavedPost(thisActivity));
        } else {
        }
      });
  };

  const handleComments = (id, event) => {
    event.preventDefault();
    setVisible(false);
    setComment("");
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: accessToken,
      },
      body: JSON.stringify({ message: comment }),
    };

    fetch(API_URL(`stories/${id}/comment`), options)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.success) {
          dispatch(sightseeing.actions.addComment(data.response));
        } else {
        }
      });
  };
  return (
    <MainWrapper>
      <StyledContainer>
        <ActivityWrapper>
          <Div>
            <ActivityImage image={thisActivity?.imageUrl}>
              <Left onClick={() => navigate(-1)} />
              <LikeContainer>
                <Like item={thisActivity ? thisActivity : ""} />
              </LikeContainer>
            </ActivityImage>

            <ActivityInfoContainer>
              <Heading>
                <h1
                  style={{
                    margin: "0",
                  }}
                >
                  {thisActivity?.name}
                </h1>
                <Bookmark
                  onClick={() => savePost(thisActivity._id)}
                  style={
                    saved
                      ? { color: "rgba(54, 186, 160, 0.6)" }
                      : { color: "black" }
                  }
                />
              </Heading>
              <LocationWrapper>
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
                  {thisActivity?.location}, {thisActivity?.country}
                </p>
              </LocationWrapper>

              <p
                style={{
                  margin: "0",
                  fontSize: "15px",
                }}
              >
                {thisActivity?.description}
              </p>
              <Section>
                <p>
                  {[...Array(ratings)].map((x, i) => (
                    <FaSplotch
                      key={i}
                      style={{
                        color: "#ffe234",
                        width: 18,
                        height: 18,
                        margin: 1,
                      }}
                    />
                  ))}
                </p>

                <Section2>
                  <Visit
                    href={thisActivity.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Visit website...
                  </Visit>
                  {userId === thisActivity.user._id && (
                    <FaTrash
                      onClick={() => handleDeletePost(thisActivity?._id)}
                    />
                  )}
                </Section2>
              </Section>
              <PosterWrapper>
                <By>By: {thisActivity?.user.username}</By>
                <Created>
                  Posted {moment(thisActivity.createdAt).fromNow()}
                </Created>
              </PosterWrapper>
              <CommentsWrapper>
                <h3>Comments</h3>

                {accessToken && (
                  <AddComment onClick={showInput}>
                    <h5
                      style={{
                        margin: "0",
                      }}
                    >
                      Add
                    </h5>
                    <FaPlus
                      style={{
                        height: "12",
                      }}
                    />
                  </AddComment>
                )}
              </CommentsWrapper>
              {visible && (
                <Form
                  onSubmit={(event) => handleComments(thisActivity?._id, event)}
                >
                  <Textarea
                    maxLength="140"
                    value={comment}
                    onChange={(event) => setComment(event.target.value)}
                  />
                  <Submit type="submit">Submit</Submit>
                </Form>
              )}
              {thisActivity?.comments.map((comment, i) => {
                if (i < showComments) {
                  return (
                    <Comment
                      key={comment._id}
                      thisActivity={thisActivity}
                      comment={comment}
                    />
                  );
                } else {
                  return null;
                }
              })}
              {thisActivity?.comments.length > showComments && (
                <MoreButton onClick={() => setShowComments(showComments + 1)}>
                  more
                  <FaSortDown />
                </MoreButton>
              )}

              {thisActivity?.comments === "" && (
                <p
                  style={{
                    fontSize: "16px",
                    fontStyle: "italic",
                    margin: "0",
                  }}
                >
                  No comments yet
                </p>
              )}
            </ActivityInfoContainer>
          </Div>
        </ActivityWrapper>
      </StyledContainer>
      <GradientBackground />
    </MainWrapper>
  );
};

export default Activity;

const MainWrapper = styled.div`
  width: 100%;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  position: absolute;
  @media (min-width: 390px) {
    background-position: center;
  }
`;
const StyledContainer = styled.div`
  margin-top: 70px;
  padding: 25px;
`;
const ActivityWrapper = styled.div`
  border-radius: 20px;
  overflow: hidden;
  max-width: 500px;
  margin: 40px auto;
`;
const ActivityImage = styled.div`
  background-image: ${(props) => `url(${props.image})`};
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  height: 300px;
  padding: 20px;
  display: flex;
  justify-content: space-between;
`;
const Heading = styled.div`
  display: flex;
  justify-content: space-between;
`;
const Div = styled.article`
  position: relative;
`;
const ActivityInfoContainer = styled.div`
  background-color: white;
  margin-top: -18px;
  border-radius: 20px;
  padding: 22px;
`;
const LocationWrapper = styled.div`
  display: flex;
  align-items: center;
`;
const PosterWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;
const CommentsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 10px 0;
  border-top: 3px solid pink;
  border-bottom: 3px solid pink;
`;
const AddComment = styled.button`
  height: 32px;
  width: 65px;
  padding: 7px;
  border: 2px solid black;
  display: flex;
  cursor: pointer;
  align-items: center;
  justify-content: space-between;
  text-transform: uppercase;
  border-radius: 8px;
  background-color: whitesmoke;
  &:hover {
    transform: scale(1.1, 1.1);
  }
`;
const MoreButton = styled.button`
  margin: 10px;
  padding: 7px;
  border: 2px solid black;
  display: flex;
  cursor: pointer;
  align-items: center;
  justify-content: space-between;
  text-transform: uppercase;
  border-radius: 8px;
  background-color: whitesmoke;
  &:hover {
    transform: scale(1.1, 1.1);
  }
`;
const LikeContainer = styled.div`
  padding-right: 35px;
`;

const By = styled.h2`
  font-size: 17px;
`;
const Created = styled.h3`
  font-size: 15px;
  font-weight: normal;
`;
const Form = styled.form`
  display: flex;
  padding: auto;
`;
const Textarea = styled.textarea`
  border: solid 3px;
  border-radius: 5px;
  width: 300px;
  &:focus {
    outline: none !important;
    border-color: #36baa0;
    box-shadow: 0 0 10px #719ece;
  }
`;
const Submit = styled.button`
  margin: 10px;
  padding: 7px;
  border: 2px solid black;
  cursor: pointer;
  text-transform: uppercase;
  border-radius: 8px;
  background-color: whitesmoke;
  &:hover {
    transform: scale(1.1, 1.1);
  }
`;
const Section = styled.section``;

const FaTrash = styled(FaTimesCircle)`
  height: 20px;
  width: 20px;
  cursor: pointer;
  &:hover {
    transform: scale(1.2, 1.2);
    color: #36baa0;
  }
`;

const Left = styled(FaChevronLeft)`
  height: 20px;
  color: white;
  cursor: pointer;
  &:hover {
    transform: scale(1.5, 1.5);
    color: #36baa0;
  }
`;

const Bookmark = styled(FaBookmark)`
  cursor: pointer;
  &:hover {
    transform: scale(1.5, 1.5);
  }
`;
const Section2 = styled.section`
  display: flex;
  justify-content: space-between;
`;
const Visit = styled.a`
  text-decoration: none;
  color: black;
  cursor: pointer;
  &:hover {
    transform: scale(1.1, 1.1);
    color: #36baa0;
  }
`;
