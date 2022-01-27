import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import Navbar from '../components/Navbar'
import sightseeing from '../reducers/sightseeing'
import user from '../reducers/user'

import { FaChevronLeft } from 'react-icons/fa'
import { FaHeart } from 'react-icons/fa'
import { FaRegCompass } from 'react-icons/fa'
import { FaPlus } from 'react-icons/fa'

const Activity = () => {
  const { activityId } = useParams()
  const dispatch = useDispatch()
  // const navigate = useNavigate();
  // const accessToken = useSelector((store) => store.user.accessToken);

  useEffect(() => {
    fetch('https://go-scandinavia.herokuapp.com/stories')
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          dispatch(sightseeing.actions.addSightseeing(data.response))
        } else {
        }
      })
      .finally(() => {})
  }, [])

  const thisActivity = useSelector((store) =>
    store.sightseeing.sightseeings.find((item) => item._id === activityId),
  )
  console.log('activity: ', thisActivity)

  // const {
  //   name,
  //   country,
  //   imageUrl,
  //   createdAt,
  //   description,
  //   link,
  //   location,
  //   category,
  //   rating,
  //   user,
  //   likes,
  //   comments,
  // } = thisActivity

  return (
    <StyledHero>
      <Navbar />
      <StyledContainer>
        <ActivityWrapper>
          <ActivityImage>
            <FaChevronLeft
              style={{
                color: 'white',
                height: '20',
              }}
            />
            <LikesContainer>
              <FaHeart
                style={{
                  color: 'white',
                  height: '9',
                }}
              />
              <h6
                style={{
                  color: 'white',
                  fontSize: '11px',
                  margin: '0',
                }}>
                {thisActivity && `${thisActivity.likes}`}
                {/* ${likes} */}
              </h6>
            </LikesContainer>
          </ActivityImage>
          <ActivityInfoContainer>
            <h2
              style={{
                margin: '0',
              }}>
              {thisActivity && `${thisActivity.name}`}
              {/* ${name} */}
            </h2>

            <LocationWrapper>
              <FaRegCompass
                style={{
                  marginRight: '6',
                  height: '14',
                }}
              />
              <p
                style={{
                  fontSize: '14px',
                  fontStyle: 'italic',
                }}>
                {thisActivity && `${thisActivity.location}`}
                {/* ${location} */}
              </p>
            </LocationWrapper>

            <p
              style={{
                margin: '0',
                fontSize: '15px',
              }}>
              {thisActivity && `${thisActivity.description}`}
              {/* ${description} */}
            </p>
            <PosterWrapper>
              <h5>
                By:
                {/* ${user}   //How to find users by id?*/}
              </h5>
              <h5>
                Posted:
                {/* ${createdAt} */}
              </h5>
            </PosterWrapper>
            <CommentsWrapper>
              <h3>Comments</h3>
              <AddComment>
                <h5
                  style={{
                    margin: '0',
                  }}>
                  Add
                </h5>
                <FaPlus
                  style={{
                    height: '12',
                  }}
                />
              </AddComment>
            </CommentsWrapper>
            {thisActivity && thisActivity.comments === '' && (
              <p
                style={{
                  fontSize: '16px',
                  fontStyle: 'italic',
                  margin: '0',
                }}>
                No comments yet
              </p>
            )}
            {/* {comments && (                //How to find comments by id?
              comments.map((item) => {
                console.log(item.message)
              }),
            )} */}
          </ActivityInfoContainer>
        </ActivityWrapper>
      </StyledContainer>
    </StyledHero>
  )
}

export default Activity

const StyledHero = styled.div`
  background-image: url('/assets/background.png');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: right;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  position: absolute;
  @media (min-width: 390px) {
    background-position: center;
  }
`

const StyledContainer = styled.div`
  margin-top: 70px;
  padding: 25px;
  border: 1px solid red;
`
const ActivityWrapper = styled.div`
  border-radius: 20px;
  overflow: hidden;
`
const ActivityImage = styled.div`
  background-image: url('/assets/sweden.jpg');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  height: 300px;
  /* width: 100%;
  margin: 25px; */
  padding: 20px;
  display: flex;
  justify-content: space-between;
  /* position: sticky; */
`

const LikesContainer = styled.div`
  background-color: rgba(255, 255, 255, 0.2);
  height: 22px;
  min-width: 40px;
  padding: 5px 7px 7px 5px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
`

const ActivityInfoContainer = styled.div`
  background-color: white;
  margin-top: -18px;
  border-radius: 20px;
  padding: 22px;
`
const LocationWrapper = styled.div`
  display: flex;
  align-items: center;
`

const PosterWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`
const CommentsWrapper = styled.div`
  display: flex;
  align-items: center;

  justify-content: space-between;
`
const AddComment = styled.div`
  height: 32px;
  width: 65px;
  padding: 7px;
  border: 2px solid black;
  display: flex;
  align-items: center;
  justify-content: space-between;
  text-transform: uppercase;
  border-radius: 8px;
  background-color: whitesmoke;
`
