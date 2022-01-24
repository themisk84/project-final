import React, { useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";

import sightseeing from "../reducers/sightseeing";
import { API_URL } from "utilis/urls";

const Country = () => {
  const dispatch = useDispatch();
  const attractions = useSelector((store) => store.sightseeing.sightseeings);
  console.log("my attraction", attractions);

  useEffect(() => {
    fetch(API_URL("stories"))
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        // const info = data.response;
        // const info2 = data.response.map((item) => item);
        // console.log(info2);
        if (data.success) {
          dispatch(sightseeing.actions.addSightseeing(data.response));
        }
      });
  }, []);

  return (
    <div>
      {attractions.map((item) => (
        <div key={item._id}>
          <h1>{item.name}</h1>
          <h2>{item.country}</h2>
          <p>{item.description}</p>
          <p>{item.category}</p>

          <a href={item.link}>{item.link}</a>

          <div>{item.location}</div>
          <div>{item.user}</div>
          <div>{item.rating}</div>
          <div>{item.createdAt}</div>
          <div>{item.likes}</div>
          <img src={item.imageUrl} alt="" />
          <div>{item.id}</div>
        </div>
      ))}
    </div>
  );
};

export default Country;
