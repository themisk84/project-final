import React, { useEffect, useState } from "react";
import { batch, useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import Avatar from "./Avatar";

import user from "reducers/user";

import { API_URL } from "../utilis/urls";

const Signin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [mode, setMode] = useState("signin");
  const [avatar, setAvatar] = useState("");

  const accessToken = useSelector((store) => store.user.accessToken);
  const err = useSelector((store) => store.user.error);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const avatars = ["tourism", "bear", "man", "woman", "user"];

  useEffect(() => {
    if (accessToken) {
      navigate("/user");
    }
  }, [accessToken, navigate]);

  const onHandleSignIn = (event) => {
    event.preventDefault();
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
        email,
        avatar,
      }),
    };
    // fetch(API_URL(mode), options)
    fetch(API_URL(`users/${mode}`), options)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          batch(() => {
            dispatch(user.actions.setUserId(data.response.userId));
            dispatch(user.actions.setUsername(data.response.username));
            dispatch(user.actions.setAccessToken(data.response.accessToken));
            dispatch(user.actions.setAvatar(data.response.avatar));
            dispatch(user.actions.setEmail(data.response.email));
            dispatch(user.actions.setError(null));
          });
        } else {
          batch(() => {
            dispatch(user.actions.setUserId(null));
            dispatch(user.actions.setUsername(null));
            dispatch(user.actions.setAccessToken(null));
            dispatch(user.actions.setError(data.response));
          });
        }
      });
  };

  const handleUsernameChange = (event) => setUsername(event.target.value);
  const handlePasswordChange = (event) => setPassword(event.target.value);
  const handleEmailChange = (event) => setEmail(event.target.value);

  return (
    <StyledMain>
      <OuterFormContainer>
        <FormContainer>
          {mode === "signin" ? (
            <FormHeader>Sign In</FormHeader>
          ) : (
            <FormHeader>Sign Up</FormHeader>
          )}
          <Form onSubmit={onHandleSignIn}>
            {err === null ? "" : <h1>{err}</h1>}
            <LabelContainer>
              <Label htmlFor="username">
                Username
                <StyledInput
                  id="username"
                  type="text"
                  value={username}
                  onChange={handleUsernameChange}
                ></StyledInput>
              </Label>
            </LabelContainer>
            <LabelContainer>
              <Label htmlFor="password">
                Password
                <StyledInput
                  id="password"
                  type="text"
                  value={password}
                  onChange={handlePasswordChange}
                ></StyledInput>
              </Label>
            </LabelContainer>
            {mode === "signup" && (
              <>
                <LabelContainer>
                  <Label htmlFor="email">
                    Email
                    <StyledInput
                      id="email"
                      type="email"
                      value={email}
                      onChange={handleEmailChange}
                    ></StyledInput>
                  </Label>
                </LabelContainer>
                <AvatarContainer>
                  {avatars.map((av, index) => (
                    <Avatar
                      key={index}
                      av={av}
                      avatar={avatar}
                      image={require(`../avatarAssets/${av}.png`)}
                      onChange={(e) => setAvatar(e.target.value)}
                    />
                  ))}
                </AvatarContainer>
              </>
            )}
            <RegisterBtn
              primary
              type="submit"
              onClick={() => dispatch(user.actions.setError(null))}
            >
              {mode === "signin" ? "Log In" : "Register"}
            </RegisterBtn>
          </Form>
          <Buttons>
            {mode === "signup" ? (
              <ButtonContainer>
                <SignParagraph>
                  Do you already have an account? Sign in!
                </SignParagraph>
                <SignButton
                  onClick={() => {
                    setMode("signin");
                  }}
                >
                  Sign In
                </SignButton>
              </ButtonContainer>
            ) : (
              <ButtonContainer>
                <SignParagraph>
                  Do you not have an account? Sign up!
                </SignParagraph>
                <SignButton
                  onClick={() => {
                    setMode("signup");
                  }}
                >
                  Sign Up
                </SignButton>
              </ButtonContainer>
            )}
            {console.log("error", err)}
          </Buttons>
        </FormContainer>
        <ImageContainer />
      </OuterFormContainer>
    </StyledMain>
  );
};

export default Signin;

const StyledMain = styled.main`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 700px;
  background-image: url("/assets/background.png");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  height: 110vh;

  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const OuterFormContainer = styled.div`
  display: flex;
  margin: auto;
  width: 90%;

  @media (min-width: 768px) {
    flex-direction: column;
    align-items: center;
  }

  @media (min-width: 992px) {
    flex-direction: row;
  }
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: auto;

  @media (min-width: 768px) {
    background-color: rgba(255, 255, 255, 0.18);
    width: 50%;
    height: 600px;
  }
`;

const ImageContainer = styled.div`
  display: none;
  background-image: url("assets/man.jpeg");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;

  @media (min-width: 998px) {
    display: flex;
    width: 50%;
    min-height: 600px;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin: auto;
`;

const FormHeader = styled.h1`
  margin: 50px;
  color: white;
  font-size: 20px;
  text-align: center;
`;

const LabelContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

const StyledInput = styled.input`
  height: 35px;
  width: 225px;
  border: 1px solid white;
  border-radius: 5px;
  background-color: rgba(255, 255, 255, 0.3);
`;

const AvatarContainer = styled.div`
  display: flex;
  width: 350px;
`;

const SignButton = styled.button`
  padding: 7px;
  width: 150px;
  font-size: 20px;
  border-radius: 20px;
  background-color: rgb(120, 196, 195);
  color: white;
  border: none;
`;

const Buttons = styled.div`
  display: flex;
  flex-direction: column;
  cursor: pointer;

  @media (min-width: 768px) {
    margin-bottom: 10px;
  }
`;

const RegisterBtn = styled.button`
  padding: 7px;
  width: 150px;
  font-size: 20px;
  border-radius: 20px;
  background-color: rgb(120, 196, 195);
  color: white;
  border: none;
  margin: 30px auto;
  cursor: pointer;
`;

const Label = styled.label`
  display: flex;
  flex-direction: column;
  color: white;
  padding-bottom: 3px;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (min-width: 992px) {
    margin: auto;
  }
`;

const SignParagraph = styled.p`
  color: white;
  font-size: 16px;
`;
