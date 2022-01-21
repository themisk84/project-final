import React, { useEffect, useState } from "react";
import { batch, useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import user from "reducers/user";
import { API_URL } from "../utilis/urls";

const StyledMain = styled.main`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 700px;
  background-image: url("../assets/background.png");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  height: 110vh;
`;

const LogoContainer = styled.div`
width: 100%
height: 70px;
color: white;
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 30px auto;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const FormHeader = styled.h1`
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
  height: 25px;
  width: 200px;
  border: 1px solid white;
  border-radius: 5px;
  background-color: rgba(255, 255, 255, 0.3);
`;

const SignButton = styled.button`
  font-size: 20px;
  border-radius: 10px;
  background-color: rgb(120, 196, 195);
  color: white;
  border: none;
`;
const Buttons = styled.div`
  display: flex;
  flex-direction: row;
  margin: 10px;
`;
const RegisterBtn = styled.button`
  font-size: 20px;
  border-radius: 10px;
  background-color: rgb(120, 196, 195);
  color: white;
  border: none;
`;

const Label = styled.label`
  display: flex;
  flex-direction: column;
  color: white;
  padding-bottom: 3px;
`;
const Signin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [mode, setMode] = useState("signup");

  const accessToken = useSelector((store) => store.user.accessToken);
  //   const error = useSelector((store) => store.user.error);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (accessToken) {
      navigate("/userPage");
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
      }),
    };

    fetch(API_URL(mode), options)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.success) {
          batch(() => {
            dispatch(user.actions.setUserId(data.response.userId));
            dispatch(user.actions.setUsername(data.response.username));
            dispatch(user.actions.setAccessToken(data.response.accessToken));
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
      <LogoContainer>
        <h1>Go Scandinavia</h1>
      </LogoContainer>
      <FormContainer>
        {mode === "signin" ? (
          <FormHeader>Sign In</FormHeader>
        ) : (
          <FormHeader>Sign Up</FormHeader>
        )}
        <Form onSubmit={onHandleSignIn}>
          <LabelContainer>
            <Label htmlFor="username">
              Username
              <StyledInput
                // placeholder="username"
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
                // placeholder="password"
                id="password"
                type="text"
                value={password}
                onChange={handlePasswordChange}
              ></StyledInput>
            </Label>
          </LabelContainer>
          {mode === "signup" && (
            <LabelContainer>
              <Label htmlFor="email">
                Email
                <StyledInput
                  // placeholder="Email"
                  id="email"
                  type="email"
                  value={email}
                  onChange={handleEmailChange}
                ></StyledInput>
              </Label>
            </LabelContainer>
          )}
          <Buttons>
            <RegisterBtn primary type="submit">
              Register
            </RegisterBtn>

            {mode === "signup" ? (
              <SignButton onClick={() => setMode("signin")}>Sign In</SignButton>
            ) : (
              <SignButton onClick={() => setMode("signup")}>Sign Up</SignButton>
            )}
          </Buttons>
        </Form>
      </FormContainer>
    </StyledMain>
  );
};

export default Signin;
