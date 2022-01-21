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
        const info = data.response;
        const info2 = data.response.map((item) => item);
        console.log(info2);
        if (data.success) {
          info.map((item) => {
            console.log(item);
            //dispatch(sightseeing.actions.addSightseeing(item));
          });
        } else {
        }
      });
  }, []);

  // const sightseeingSearch = useSelector(
  //   (store) => store.sightseeing.sightseeings
  // );

  return (
    <div>
      {/* <StyledHero></StyledHero>  */}
      <div>
        {/* {sightseeingSearch.map((item) => {
          <p>{item.name}</p>;
        })} */}
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
