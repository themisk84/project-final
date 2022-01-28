import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { API_URL } from 'utilis/urls'

import Navbar from '../components/Navbar'
import sightseeing from '../reducers/sightseeing'
import Like from '../components/Like'

import user from '../reducers/user'

import { FaChevronLeft } from 'react-icons/fa'

import { FaRegCompass } from 'react-icons/fa'
import { FaPlus } from 'react-icons/fa'

const Activity = () => {
  const { activityId } = useParams()
  // console.log(activityId)
  const dispatch = useDispatch()
  const [visible, setVisible] = useState(false)
  const [comment, setComment] = useState('')

  // const navigate = useNavigate();
  const accessToken = useSelector((store) => store.user.accessToken)

  const thisActivity = useSelector((store) =>
    store.sightseeing.sightseeings.find((item) => item._id === activityId),
  )
  // console.log('activity: ', thisActivity)

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
  const showInput = () => {
    if (visible) {
      setVisible(false)
    } else {
      setVisible(true)
    }
  }

  const handleComments = (id, event) => {
    event.preventDefault()
    setVisible(false)
    setComment('')
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: accessToken,
      },
      body: JSON.stringify({ message: comment }),
    }
    console.log(comment)

    fetch(API_URL(`stories/${id}/comment`), options)
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        if (data.success) {
          console.log(data)
          dispatch(sightseeing.actions.addComment(data.response))
        } else {
        }
      })
  }

  return (
    <StyledHero>
      <Navbar />
      <StyledContainer>
        <ActivityWrapper>
          <ActivityImage image={thisActivity.imageUrl}>
            <FaChevronLeft
              style={{
                color: 'white',
                height: '20',
              }}
            />
          </ActivityImage>
          <ActivityInfoContainer>
            <h2
              style={{
                margin: '0',
              }}>
              {thisActivity.name}
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
                {thisActivity.location}
              </p>
            </LocationWrapper>

            <p
              style={{
                margin: '0',
                fontSize: '15px',
              }}>
              {thisActivity.description}
            </p>
            <PosterWrapper>
              <h5>By: {thisActivity.user.username}</h5>
              <h5>Posted: {thisActivity.createdAt}</h5>
            </PosterWrapper>
            <CommentsWrapper>
              <h3>Comments</h3>
              {accessToken && (
                <AddComment onClick={showInput}>
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
              )}
            </CommentsWrapper>
            {visible && (
              <form
                onSubmit={(event) => handleComments(thisActivity._id, event)}>
                <textarea
                  maxLength="140"
                  value={comment}
                  onChange={(event) => setComment(event.target.value)}
                />
                <button type="submit">Submit</button>
              </form>
            )}
            {thisActivity.comments.map((item) => {
              return <p key={item._id}>{item.message}</p>
            })}
            {thisActivity.comments === '' && (
              <p
                style={{
                  fontSize: '16px',
                  fontStyle: 'italic',
                  margin: '0',
                }}>
                No comments yet
              </p>
            )}
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
  min-height: 100%;
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
  background-image: ${(props) => `url(${props.image})`};
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

// const LikesContainer = styled.div`
//   background-color: rgba(255, 255, 255, 0.2);
//   height: 22px;
//   min-width: 40px;
//   padding: 5px 7px 7px 5px;
//   border-radius: 6px;
//   display: flex;
//   align-items: center;
//   justify-content: center;
// `

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
`