import React from "react";
import styled from "styled-components";

const About = () => {
  return (
    <AboutContainer>
      <h1>About </h1>
      <p>
        {" "}
        This app is about creating a travel community where everyone can sign up
        and share their experiences about the wonderful parts of Scandinavia.
      </p>
      <ol>
        The creators of this site
        <li>Helena Wiklund</li>
        <li>Elsa Carlström</li>
        <li>Julia Nikitina</li>
        <li>Efthymios Karakasis</li>
      </ol>
    </AboutContainer>
  );
};

export default About;

const AboutContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 120px 50px;
`;
