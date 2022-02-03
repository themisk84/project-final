import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import user from "../reducers/user";

import PostSightseeing from "../pages/PostSightseeing";

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();
  const accessToken = useSelector((store) => store.user.accessToken);
  const dispatch = useDispatch();

  const avatar = useSelector((store) => store.user.avatar);

  const showMenu = () => {
    if (visible) {
      setVisible(false);
    } else {
      setVisible(true);
    }
  };

  const logOut = () => {
    dispatch(user.actions.setAccessToken(null));
    navigate("/");
  };

  let onFormChange = () => {
    dispatch(user.actions.setForm(true));
  };

  const onButtonClick = () => {
    navigate("/add");
    setVisible(false);
  };
  const onButtonClickTwo = () => {
    navigate("/user");
    setVisible(false);
  };
  const onButtonClickThree = () => {
    navigate("/savedPosts");
    setVisible(false);
  };

  return (
    <StyledHeader>
      <Link to="/">
        <StyledLogo />
      </Link>
      {!accessToken ? (
        <StyledHamburger onClick={showMenu}>
          <div></div>
          <div></div>
          <div></div>
        </StyledHamburger>
      ) : (
        <div onClick={showMenu}>
          <img src={require(`../avatarAssets/${avatar}.png`)} />
        </div>
      )}
      {visible && (
        <StyledMobileNav>
          {!accessToken ? (
            <>
              <Link to="/signin">
                <p>Sign In</p>
              </Link>
              <Link to="/about">
                <p>About</p>
              </Link>
            </>
          ) : (
            <>
              <p onClick={onButtonClick}>Add a post</p>
              <p onClick={onButtonClickTwo}>My posts</p>
              <p onClick={onButtonClickThree}>Saved Posts</p>
              <p onClick={logOut}>Log out</p>
            </>
          )}
        </StyledMobileNav>
      )}

      <StyledNav>
        <StyledList>
          {!accessToken && <StyledLink to="/signin">Signin</StyledLink>}
          <StyledContainerButtons>
            {accessToken && (
              <button onClick={() => navigate("/add")}>Add post</button>
            )}
            {accessToken && (
              <button onClick={() => navigate("/user")}>My posts</button>
            )}
            {/* {accessToken && <button>Liked Post</button>} instead saving sightseeings in favorites */}
            {accessToken && <button onClick={logOut}>Log out</button>}
          </StyledContainerButtons>
        </StyledList>
        <StyledList>
          {!accessToken && <StyledLink to="/about">About</StyledLink>}
        </StyledList>
      </StyledNav>
    </StyledHeader>
  );
};

export default Navbar;

const StyledHeader = styled.nav`
  width: 100%;
  height: 70px;
  z-index: 10;
  backdrop-filter: blur(12px);
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 25px;
  @media (min-width: 768px) {
    height: 100px;
    padding: 25px 50px;
  }
`;
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
`;
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
`;
const StyledList = styled.ul`
  list-style-type: none;
  padding: 0;
`;
const StyledLogo = styled.div`
  background-image: url("/assets/logo.png");
  background-size: contain;
  background-repeat: no-repeat;
  height: 18px;
  width: 250px;

  @media (min-width: 768px) {
    height: 22px;
  }
`;
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
`;
const StyledLink = styled(Link)`
  text-decoration: none;
  color: #56baa0;
`;

const StyledContainerButtons = styled.div`
  display: flex;
  color: #56baa0;
`;
