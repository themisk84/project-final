import React, { useState, useEffect, useRef } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { batch, useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { FaUserCircle } from 'react-icons/fa'

import user from '../reducers/user'

const Navbar = () => {
  const [visible, setVisible] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const wrapperRef = useRef(null)

  const email = useSelector((store) => store.user.email)
  const accessToken = useSelector((store) => store.user.accessToken)
  const avatar = useSelector((store) => store.user.avatar)
  const username = useSelector((store) => store.user.username)
  const { pathname } = useLocation()

  const showMenu = () => {
    if (visible) {
      setVisible(false)
    } else {
      setVisible(true)
    }
  }
  useEffect(() => {
    setVisible(false)
  }, [pathname])

  const logOut = () => {
    batch(() => {
      dispatch(user.actions.setUserId(null))
      dispatch(user.actions.setUsername(null))
      dispatch(user.actions.setAccessToken(null))
      dispatch(user.actions.setAvatar(null))
      dispatch(user.actions.setEmail(null))
      dispatch(user.actions.setError(null))
    })

    navigate('/')
  }

  const onAddPostClick = () => {
    navigate('/add')
    setVisible(false)
  }
  const onMyPostsClick = () => {
    navigate('/user')
    setVisible(false)
  }
  const onSavedPostsClick = () => {
    navigate('/savedPosts')
    setVisible(false)
  }
  const onAboutClick = () => {
    navigate('/about')
    setVisible(false)
  }
  const onSigninClick = () => {
    navigate('/signin')
    setVisible(false)
  }

  // Function to close the dropdown menu when clicking outside of it
  const OutsideOfMenu = (ref) => {
    useEffect(() => {
      const handleClickOutside = (event) => {
        if (ref.current && !ref.current.contains(event.target)) {
          setVisible(false)
        }
      }
      document.addEventListener('mousedown', handleClickOutside)
      return () => {
        document.removeEventListener('mousedown', handleClickOutside)
      }
    }, [ref])
  }

  OutsideOfMenu(wrapperRef)

  return (
    <StyledHeader>
      <Link to="/">
        <StyledLogo />
      </Link>

      {visible && (
        <>
          <StyledMobileNav ref={wrapperRef}>
            {!accessToken ? (
              <>
                <StyledOption onClick={onSigninClick}>Sign in</StyledOption>
                <StyledOption onClick={onAboutClick}>About</StyledOption>
              </>
            ) : (
              <>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    marginBottom: 20,
                  }}>
                  <FaUserCircle
                    style={{
                      height: 50,
                      width: 50,
                      color: '#00005a',
                      marginRight: 10,
                    }}
                  />
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      color: '#00005a',
                    }}>
                    <p style={{ margin: 0, marginBottom: 5, fontSize: 17 }}>
                      {username}
                    </p>
                    <p style={{ margin: 0, fontSize: 14 }}>{email}</p>
                  </div>
                </div>
                <StyledOption onClick={onAddPostClick}>Add a post</StyledOption>
                <StyledOption onClick={onMyPostsClick}>My posts</StyledOption>
                <StyledOption onClick={onSavedPostsClick}>
                  Saved Posts
                </StyledOption>

                <StyledOption onClick={logOut} style={{ marginTop: 25 }}>
                  Sign out
                </StyledOption>
                <StyledOption onClick={onAboutClick}>About</StyledOption>
              </>
            )}
          </StyledMobileNav>
        </>
      )}

      <StyledNav>
        <StyledList>
          {!accessToken && <StyledLink to="/signin">Sign in</StyledLink>}
        </StyledList>
        <StyledList>
          {!accessToken && <StyledLink to="/about">About</StyledLink>}
        </StyledList>
      </StyledNav>
      {!accessToken ? (
        <StyledHamburger onClick={showMenu}>
          <div></div>
          <div></div>
          <div></div>
        </StyledHamburger>
      ) : (
        <AvatarImgContainer onClick={showMenu}>
          <AvatarImg
            src={require(`../avatarAssets/${avatar}.png`)}
            alt="avatar"
          />
          <UsernameP>{username}</UsernameP>
        </AvatarImgContainer>
      )}
    </StyledHeader>
  )
}

export default Navbar

const StyledHeader = styled.header`
  width: 100%;
  height: 70px;
  z-index: 10;
  background-color: #061137;
  position: fixed;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 25px;
  @media (min-width: 768px) {
    height: 100px;
    padding: 25px 50px;
  }
`
const StyledHamburger = styled.div`
  display: flex;
  width: 25px;
  height: 25px;
  flex-direction: column;
  justify-content: space-between;
  div {
    width: 30px;
    height: 4px;
    background-color: #56baa0;
    border-radius: 5px;
  }
  @media (min-width: 768px) {
    display: none;
  }
`
const AvatarImgContainer = styled.div`
  display: flex;
  cursor: pointer;
`
const UsernameP = styled.div`
  display: none;
  @media (min-width: 768px) {
    display: flex;
    flex-direction: column;
    margin: auto 10px;
    color: white;
    font-size: 20px;
  }
`
const AvatarImg = styled.img`
  width: 50px;
  @media (min-width: 768px) {
    width: 80px;
  }
`
const StyledNav = styled.nav`
  display: none;
  @media (min-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 100%;
    width: 200px;
    font-size: 22px;
  }
`
const StyledList = styled.ul`
  list-style-type: none;
  padding: 0;
`
const StyledLogo = styled.div`
  background-image: url('/assets/logo.png');
  background-size: contain;
  background-repeat: no-repeat;
  height: 19px;
  width: 250px;

  @media (min-width: 768px) {
    height: 22px;
  }
`
const StyledMobileNav = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  right: 0;
  left: 0;
  top: 70px;
  background-color: #56baa0;
  padding: 25px;
  font-weight: bold;
  @media (min-width: 768px) {
    max-width: 300px;
    top: 100px;
    margin: 0 0 auto auto;
  }
`
const StyledLink = styled(Link)`
  text-decoration: none;
  color: #56baa0;
  cursor: pointer;
`

const StyledOption = styled.p`
  color: #00005a;
  margin: 10px 0;
  cursor: pointer;
`
