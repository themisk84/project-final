import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useSelector, useDispatch, batch } from "react-redux";
import sightseeing from "../reducers/sightseeing";

const Start = () => {
  useEffect(() => {
    fetch("https://go-scandinavia.herokuapp.com/stories")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  }, []);
  //             if(data.success) {
  //             batch(() => {
  //     dispatch(sightseeing.actions.setName(data.response.name)),
  //     dispatch(sightseeing.actions.setCountry(data.response.country)),
  //     dispatch(sightseeing.actions.setImageUrl(data.response.imageUrl)),
  //     dispatch(sightseeing.actions.setDescription(data.response.description)),
  //     dispatch(sightseeing.actions.setLocation(data.response.location)),
  //     dispatch(sightseeing.actions.setLink(data.response.link)),
  //     dispatch(sightseeing.actions.setCategory(data.response.category)),
  //     dispatch(sightseeing.actions.setRating(data.response.rating)),
  //     dispatch(sightseeing.actions.setLikes(data.response.likes)),
  //     dispatch(sightseeing.actions.setUser(data.response.user)),
  //     dispatch(sightseeing.actions.setCreatedAt(data.response.createdAt)),
  //     dispatch(sightseeing.actions.setComments(data.response.comments))
  //     })
  // } else {
  //     batch(() => {
  //         dispatch(sightseeing.actions.setName(null)),
  //         dispatch(sightseeing.actions.setCountry(null)),
  //         dispatch(sightseeing.actions.setImageUrl(null)),
  //         dispatch(sightseeing.actions.setDescription(null)),
  //         dispatch(sightseeing.actions.setLocation(null)),
  //         dispatch(sightseeing.actions.setLink(null)),
  //         dispatch(sightseeing.actions.setCategory(null)),
  //         dispatch(sightseeing.actions.setRating(null)),
  //         dispatch(sightseeing.actions.setLikes(null)),
  //         dispatch(sightseeing.actions.setUser(null)),
  //         dispatch(sightseeing.actions.setCreatedAt(null)),
  //         dispatch(sightseeing.actions.setComments(null)),
  //         dispatch(sightseeing.actions.setError(data.response))
  //     })
  //     }
  //})
  //}, [])

  return (
    <div>
      {/* <StyledHero></StyledHero> */}
      <div>
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
