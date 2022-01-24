import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Navbar = () => {
  const [visible, setVisible] = useState(false)

  const showMenu = () => {
    if (visible) {
      setVisible(false)
    } else {
      setVisible(true)
    }
  }

  return (
    <StyledHeader>
      <StyledLogo />
      <StyledHamburger onClick={showMenu}>
        <div></div>
        <div></div>
        <div></div>
      </StyledHamburger>
      {visible && (
        <StyledMobileNav>
          <Link to="/signin">
            <p>Sign In</p>
          </Link>
          <Link to="/signin">
            <p>Sign Up</p>
          </Link>
          <Link to="/about">
            <p>About</p>
          </Link>
        </StyledMobileNav>
      )}
    </StyledHeader>
  )
}

export default Navbar

const StyledHeader = styled.nav`
  width: 100%;
  height: 70px;
  backdrop-filter: blur(12px);
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 25px;
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
`

const StyledLogo = styled.div`
  background-image: url('/assets/logo.png');
  background-size: contain;
  background-repeat: no-repeat;
  height: 18px;
  width: 250px;
`
const StyledMobileNav = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  right: 0;
  left: 0;
  top: 70px;
  text-align: right;
  background-color: #56baa0;
  padding: 25px;
  font-weight: bold;

  a {
    text-decoration: none;
  }
`
