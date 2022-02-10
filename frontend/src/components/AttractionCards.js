import React from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'

import Like from './Like'
import { FaRegCompass } from 'react-icons/fa'

const AttractionCards = ({ item }) => {
  const navigate = useNavigate()
  const onAttractionClick = (id) => {
    navigate(`/activity/${id}`)
  }
  return (
    <>
      <AttractionCard
        onClick={() => onAttractionClick(item._id)}
        style={{ backgroundImage: `url(${item.imageUrl})` }}>
        <Like item={item} />
        {/* <CommentContainer><span>&#128172;</span></CommentContainer> */}

        <HeaderContainer>
          <Header>{item.name}</Header>
          {/* <Description>{item.description}</Description> */}
          <Description>
            <FaRegCompass
              style={{
                marginRight: '6',
                height: '14',
              }}
            />
            {item.location}, {item.country}
          </Description>
        </HeaderContainer>
      </AttractionCard>
    </>
  )
}

export default AttractionCards

const AttractionCard = styled.article`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
  width: 280px;
  height: 400px;
  border-radius: 10px;
  margin-bottom: 10px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  margin-bottom: 30px;
  overflow: hidden;
`

// const CommentContainer = styled.section`
//   width: 40px;
//   -webkit-line-clamp: 3;
//   border: 1px red yellow;
// `

const HeaderContainer = styled.section`
  display: flex;
  width: 240px;
  flex-direction: column;
  justify-content: flex-end;
  /* align-items: center; */
  overflow: hidden;
  padding: 16px 16px 16px 20px;
  background-color: rgba(6, 17, 55, 0.7);
  border-radius: 0 90px 90px 0;
  margin-bottom: 50px;
  margin-right: 40px;
`

const Header = styled.h1`
  color: white;
  font-size: 26px;
  margin: 0;
  margin-bottom: 8px;
`

const Description = styled.p`
  color: white;
  font-size: 16px;
  -webkit-line-clamp: 3;
  overflow: hidden;
  display: flex;
  align-items: center;
  font-size: 16px;
  margin: 0;
`
