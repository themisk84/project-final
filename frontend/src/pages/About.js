import React from "react";
import styled from "styled-components";

const About = () => {
  return (
    <Main>
      <AboutContainer>
        <Heading>About </Heading>
        <p>
          This app is about creating a travel community where everyone can sign
          up and share their experiences about the wonderful parts of
          Scandinavia.
        </p>
      </AboutContainer>
      <Heading2>Team</Heading2>
      <TeamSection>
        <ImgBox>
          <P>Helena Wiklund</P>
          <Img
            src="https://avatars.githubusercontent.com/u/63056581?v=4"
            alt="ninja-Turtle Helena"
          />
        </ImgBox>
        <ImgBox>
          <P>Elsa Carlström</P>
          <Img
            src="https://avatars.githubusercontent.com/u/83236666?v=4"
            alt="ninja-Turtle Elsa"
          />
        </ImgBox>
        <ImgBox>
          <P>Julia Nikitina</P>
          <Img
            src="https://avatars.githubusercontent.com/u/84314805?v=4"
            alt="ninja-Turtle Julia"
          />
        </ImgBox>
        <ImgBox>
          <P>Efthymios Karakasis</P>
          <Img
            src="https://avatars.githubusercontent.com/u/77687868?v=4"
            alt="ninja-Turtle Efthymios"
          />
        </ImgBox>
      </TeamSection>
    </Main>
  );
};

export default About;

const Main = styled.main`
  text-align: center;
  color: white;
  padding: 10px;
`;
const Heading = styled.h1`
  font-size: 35px;
`;
const Heading2 = styled.h2`
  font-size: 35px;
`;

const AboutContainer = styled.section`
  display: flex;
  flex-direction: column;
  margin-top: 150px;
  font-size: 17px;
  @media (min-width: 768px) {
    margin: 150px;
    font-size: 20px;
  }
`;
const TeamSection = styled.section`
  display: flex;
  flex-direction: column;
  @media (min-width: 768px) {
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
  }
`;

const Img = styled.img`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
`;

const P = styled.p`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 22;
  padding: auto;
  background-color: rgba(0, 0, 0, 0.5);
`;

const ImgBox = styled.article`
  position: relative;
  text-align: center;
  margin: 10px;
  color: white;
  font-size: 20px;
`;
