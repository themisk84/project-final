import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { FaUserCircle } from "react-icons/fa";

import user from "../reducers/user";

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const wrapperRef = useRef(null);

  const email = useSelector((store) => store.user.email);
  const accessToken = useSelector((store) => store.user.accessToken);
  const avatar = useSelector((store) => store.user.avatar);
  const username = useSelector((store) => store.user.username);
  const { pathname } = useLocation();

  const showMenu = () => {
    if (visible) {
      setVisible(false);
    } else {
      setVisible(true);
    }
  };
  useEffect(() => {
    setVisible(false);
  }, [pathname]);

  const logOut = () => {
    dispatch(user.actions.setAccessToken(null));
    navigate("/");
  };

  const onAddPostClick = () => {
    navigate("/add");
    setVisible(false);
  };
  const onMyPostsClick = () => {
    navigate("/user");
    setVisible(false);
  };
  const onSavedPostsClick = () => {
    navigate("/savedPosts");
    setVisible(false);
  };

  // Function to close the dropdown menu when clicking outside of it
  const OutsideOfMenu = (ref) => {
    useEffect(() => {
      const handleClickOutside = (event) => {
        if (ref.current && !ref.current.contains(event.target)) {
          setVisible(false);
        }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  };

  OutsideOfMenu(wrapperRef);

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
                <Link to="/signin">
                  <p onClick={() => setVisible(false)}>Sign In</p>
                </Link>
                <Link to="/about">
                  <p onClick={() => setVisible(false)}>About</p>
                </Link>
              </>
            ) : (
              <>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: 20,
                  }}
                >
                  {}
                  <FaUserCircle
                    style={{
                      height: 50,
                      width: 50,
                      color: "#00005a",
                      marginRight: 10,
                    }}
                  />
                  <div>
                    <p style={{ fontSize: 20, margin: 0, color: "#00005a" }}>
                      {user.username}
                    </p>
                    {/* <p>{user.email}</p> */}
                  </div>
                </div>
                <StyledOption onClick={onAddPostClick}>Add a post</StyledOption>
                <StyledOption onClick={onMyPostsClick}>My posts</StyledOption>
                <StyledOption onClick={onSavedPostsClick}>
                  Saved Posts
                </StyledOption>
                <StyledOption onClick={logOut} style={{ marginTop: 25 }}>
                  Log out
                </StyledOption>
              </>
            )}
          </StyledMobileNav>
        </>
      )}

      <StyledNav>
        <StyledList>
          {!accessToken && <StyledLink to="/signin">Signin</StyledLink>}
          <StyledContainerButtons>
            {/* {accessToken && (
              <StyledLink to="/add">Add post</StyledLink>
            )} */}
            {/* {accessToken && (
              // <button onClick={() => navigate("/user")}>My posts</button>
              <StyledLink to="/user">My posts</StyledLink>
            )} */}
            {/* {accessToken && <button>Liked Post</button>} instead saving sightseeings in favorites */}
            {/* {accessToken && (
              //  <button onClick={logOut}>Log out</button>
              <StyledLink to="/" onClick={logOut}>
                Log out
              </StyledLink>
            )} */}
          </StyledContainerButtons>
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
          {/* <FaUserCircle style={{ height: 35, width: 35, color: "#56baa0" }} /> */}

          <AvatarImg
            src={require(`../avatarAssets/${avatar}.png`)}
            alt="avatar"
          />
          <UsernameP>
            {username} {email}
          </UsernameP>
        </AvatarImgContainer>
      )}
    </StyledHeader>
  );
};

export default Navbar;

const StyledHeader = styled.header`
  width: 100%;
  height: 70px;
  z-index: 10;
  /* backdrop-filter: blur(12px); */
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

const AvatarImgContainer = styled.div`
  display: flex;
  cursor: pointer;
`;

const UsernameP = styled.div`
  display: none;
  @media (min-width: 768px) {
    display: flex;
    flex-direction: column;
    margin: auto 10px;
    color: white;
    font-size: 20px;
  }
`;

const AvatarImg = styled.img`
  width: 50px;
  @media (min-width: 768px) {
    width: 80px;
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
  height: 19px;
  width: 250px;

  @media (min-width: 768px) {
    height: 22px;
  }
`;
const StyledMobileNav = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  /* align-items: right; */
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
`;
const StyledLink = styled(Link)`
  text-decoration: none;
  color: #56baa0;
`;

const StyledContainerButtons = styled.div`
  display: flex;
  color: #56baa0;
`;

const StyledOption = styled.p`
  color: #00005a;
  margin: 10px 0;
`;
