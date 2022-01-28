import React from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'

import { FaHeart } from 'react-icons/fa'
import { API_URL } from 'utilis/urls'
import sightseeing from '../reducers/sightseeing'

const Like = ({ item }) => {
  const dispatch = useDispatch()
  const handleLike = (storyId) => {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    }

    fetch(API_URL(`stories/${storyId}/like`), options)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          dispatch(sightseeing.actions.addLike(data.response))
        } else {
        }
      })
  }
  return (
    <LikesContainer>
      <FaHeart
        onClick={() => handleLike(item._id)}
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
        {item.likes}
        {/* ${likes} */}
      </h6>
    </LikesContainer>
  )
}

export default Like

const LikesContainer = styled.button`
  background-color: rgba(255, 255, 255, 0.2);
  height: 22px;
  border: none;
  width: 40px;
  padding: 5px 7px 7px 5px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer: cursor;
`
