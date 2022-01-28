import React from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import { Link, useNavigate } from 'react-router-dom'

import { API_URL } from '../utilis/urls'
import sightseeing from '../reducers/sightseeing'
import Like from './Like'

const AttractionCards = ({ item }) => {
  const navigate = useNavigate()
  const onAttractionClick = (id) => {
    navigate(`/activity/${id}`)
  }
  return (
    <AttractionCard
      onClick={() => onAttractionClick(item._id)}
      style={{ backgroundImage: `url(${item.imageUrl})` }}>
      <CommentContainer>
        <span>&#128172;</span>
      </CommentContainer>

      <Like item={item} />
      <HeaderContainer>
        <Header>{item.name}</Header>
        <Description>{item.description}</Description>
        <Description>{item.country}</Description>
      </HeaderContainer>
    </AttractionCard>
  )
}

export default AttractionCards

const AttractionCard = styled.div`
  display: flex;
  flex-direction: column;
  width: 300px;
  height: 300px;
  border: 1px solid black;
  border-radius: 10px;
  margin-bottom: 10px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
`
// const LikeContainer = styled.div`
//   color: white;
//   align-self: flex-end;
//   margin: 10px;
// `;

const CommentContainer = styled.div`
  width: 40px;
`

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Header = styled.h1`
  color: white;
  font-size: 20px
  margin: 0;
`

const Description = styled.p`
  color: white;
  font-size: 16px;
`
