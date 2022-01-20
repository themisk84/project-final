import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useSelector, useDispatch, batch } from "react-redux";
import sightseeing from "../reducers/sightseeing";

const Start = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    fetch("https://go-scandinavia.herokuapp.com/stories")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.success) {
          dispatch(sightseeing.actions.addSightseeing(data.response));
        } else {
        }
      });
  }, []);

  const sightseeing = useSelector((store) => store.sightseeing.sightseeings);
  return (
    <div>
      {/* <StyledHero></StyledHero>  */}
      <div>
        {sightseeing.map((item) => {
          <p>{item.country}</p>;
        })}
        {data.map((item) => {
          <p>{item.country}</p>;
        })}
        <h1>Heeeeej</h1>
        {/* <button onClick={()=> setCountry("Sweden")}>Sweden</button>
        <button>Denmark</button>
        <button>Norway</button> */}
      </div>
    </div>
  );
};

export default Start;

// const StyledHero = styled.div`
//    height: 500px;
//    border: 1px solid black;
//    background-image: url('/assets/')
// `
