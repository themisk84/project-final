import React from 'react'
import styled from 'styled-components'
import moment from 'moment'

import { FaTimesCircle, FaUserCircle } from 'react-icons/fa'

const Comment = ({ comment }) => {
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
            <FaTimesCircle style={{ height: 17, width: 17, marginLeft: 10 }} />
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
