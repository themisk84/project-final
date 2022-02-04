import React from "react";
import Lottie from "react-lottie";
import animationData from "./lotties/travel2";
import { useSelector } from "react-redux";
import styled from "styled-components";

const LoadingContainer = styled.div`
  display: flex;
  align-items: center;
  width: 500px;
  height: 100vh; ;
`;
const Div = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
`;

const Loader = () => {
  const loading = useSelector((store) => store.ui.loading);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <Div>
      <LoadingContainer>
        {loading && (
          <Lottie options={defaultOptions} height={400} width={400} />
        )}
      </LoadingContainer>
    </Div>
  );
};

export default Loader;
