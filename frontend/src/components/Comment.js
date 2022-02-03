import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import moment from 'moment'
import sightseeing from '../reducers/sightseeing'


import { FaTimesCircle, FaUserCircle } from 'react-icons/fa'
import { API_URL } from 'utilis/urls'

const Comment = ({ comment, thisActivity }) => {
  const dispatch = useDispatch()
  const userId = useSelector((store) => store.user.userId)
  const accessToken = useSelector((store) => store.user.accessToken)

  const deleteComment = (id) => {
    const options = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: accessToken,
      },
    }


    if (userId === thisActivity.user._id) {
      fetch(API_URL(`comments/${id}`), options)
        .then((res) => res.json())
        .then((data) => {
          console.log(data)
          if (data.success) {
            console.log(data)
          } else {
          }
        })
    }
  }
  return (
    <CommentContainer>
      <FaUserCircle style={{ height: 35, width: 35, marginRight: 8 }} />
      <CommenterWrapper>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 10,
            marginTop: 3,
          }}>
          <StyledUsername>{comment.user.username}</StyledUsername>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <StyledDate>{moment(comment.createdAt).fromNow()}</StyledDate>
            <FaTimesCircle onclick={deleteComment(comment._id)} style={{ height: 17, width: 17, marginLeft: 10 }} />
          </div>
        </div>
        <StyledParagraph>{comment.message}</StyledParagraph>
      </CommenterWrapper>
    </CommentContainer>
  )
}

export default Comment

const CommentContainer = styled.div`
  padding: 15px 0 25px;
  border-bottom: 3px solid pink;
  display: flex;
`
const CommenterWrapper = styled.div`
  width: 100%;
  margin-bottom: 10px;
`
const StyledDate = styled.p`
  margin: 0;
  font-style: italic;
  color: grey;
  font-size: 14px;
  font-weight: 600;
`
const StyledUsername = styled.h5`
  margin: 0;
  font-size: 16px;
  font-weight: 600;
`
const StyledParagraph = styled.p`
  margin: 0;
  font-size: 16px;
`
