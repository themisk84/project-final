
import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { Rating } from "react-simple-star-rating";

import { API_URL } from "utilis/urls";

import sightseeing from "../reducers/sightseeing";

const PostSightseeing = () => {
  const [rating, setRating] = useState(0);
  const fileInput = useRef();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [lng, setLng] = useState("");
  const [lat, setLat] = useState("");
  const [location, setLocation] = useState("");
  const [country, setCountry] = useState("");
  const [link, setLink] = useState("");
  const [category, setCategory] = useState("");

  const accessToken = useSelector((store) => store.user.accessToken);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleRating = (rate) => {
    setRating(rate);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", fileInput.current.files[0]);
    formData.append("name", name);
    formData.append("description", description);
    formData.append("lng", lng);
    formData.append("lat", lat);
    formData.append("location", location);
    formData.append("country", country);
    formData.append("link", link);
    formData.append("category", category);
    formData.append("rating", rating);

    fetch(API_URL("stories"), {
      method: "POST",
      headers: {
        Authorization: accessToken,
      },
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        dispatch(sightseeing.actions.addPost(data.response));
        navigate("/user");
      });
  };

  const categories = ["food", "culture", "activity", "music"];

  return (
    <FormContainer>
      <StyledForm onSubmit={handleFormSubmit}>
        <label>Name</label>
        <StyledInput
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label>Description</label>
        <StyledInput
          type="textarea"
          required
          minLength={5}
          maxLength={800}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <label>Longitude</label>
        <StyledInput
          type="number"
          required
          value={lng}
          onChange={(e) => setLng(e.target.value)}
        />
        <label>Latitude</label>
        <StyledInput
          type="number"
          required
          value={lat}
          onChange={(e) => setLat(e.target.value)}
        />
        <label>Location</label>
        <StyledInput
          type="text"
          required
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <label>Country</label>
        <StyledInput
          type="text"
          required
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        />
        <label>Website</label>
        <StyledInput
          type="url"
          required
          value={link}
          onChange={(e) => setLink(e.target.value)}
        />
        <label style={{ marginBottom: 5 }}>Category</label>
        <StyledSelect
          required
          value={category}
          onChange={(event) => setCategory(event.target.value)}
        >
          {categories.map((option, index) => (
            <option key={index} value={option} >
              {option}
            </option>
          ))}
        </StyledSelect>
        <label style={{ marginTop: 10, marginBottom: 5 }} >Rating</label>
        <Rating onClick={handleRating} ratingValue={rating} style={{ marginBottom: 10 }} />
        <label>Image</label>
        <StyledInput type="file" ref={fileInput} required />
        <RegisterBtn type="submit" disabled={accessToken === null}>
          Add Post
        </RegisterBtn>
      </StyledForm>
    </FormContainer>
  );
};

export default PostSightseeing;

const StyledForm = styled.form`
  color: white;
  display: flex;
  flex-direction: column;
  margin: auto;
`;
const StyledInput = styled.input`
  height: 35px;
  width: 300px;
  border: 1px solid white;
  color: #061137;
  border-radius: 5px;
  background-color: rgba(255, 255, 255, 0.3);
  margin-bottom: 10px;
  margin-top: 2px;
`;
const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: auto;
  padding-top: 200px;
  @media (min-width: 768px) {
    width: 50%;
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
const StyledSelect = styled.select`
  height: 35px;
  width: 300px;
  border: 1px solid white;
  border-radius: 5px;
  background-color: rgba(255, 255, 255, 0.3);
  color: #061137;
  margin-bottom: 10px;
  margin-top: 2px;
`
