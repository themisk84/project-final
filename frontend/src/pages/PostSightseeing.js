import React, { useState, useRef } from "react";
import styled from "styled-components"
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom"

import { API_URL } from "utilis/urls";
import { Rating } from 'react-simple-star-rating'
import user from "reducers/user";
import sightseeing from '../reducers/sightseeing'



const PostSightseeing = () => {
  const [rating, setRating] = useState(0)
  const fileInput = useRef()
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [location, setLocation] = useState('')
  const [country, setCountry] = useState('')
  const [link, setLink] = useState('')
  const [category, setCategory] = useState('')

  const accessToken = useSelector((store) => store.user.accessToken)
  console.log(typeof rating)
  const navigate = useNavigate();

  const dispatch = useDispatch()

  const handleRating = (rate) => {
    setRating(rate)
  }

  const handleFormSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('image', fileInput.current.files[0])
    formData.append('name', name)
    formData.append('description', description)
    formData.append('location', location)
    formData.append('country', country)
    formData.append('link', link)
    formData.append('category', category)
    formData.append('rating', rating)

    fetch(API_URL('stories'), {
      method: 'POST',
      headers: {
        Authorization: accessToken,
      },
      body: formData
    })
      .then((res) => res.json())
      .then((data) => {
        dispatch(sightseeing.actions.addPost(data.response))
        navigate("/user")
      })
  }
  // const handleLike = (storyId) => {
  //   const options = {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   };

  //   fetch(API_URL(`stories/${storyId}/like`), options)
  //     .then((res) => res.json())
  //     .then((data) => {
  //       if (data.success) {
  //         dispatch(sightseeing.actions.addLike(data.response));
  //       } else {
  //       }
  //     });
  // };
  const categories = ["food", "culture", "activity", "music"];

  return (
    <FormContainer>
      <StyledForm onSubmit={handleFormSubmit}>
        <label>Name</label>
        <StyledInput type="text" required value={name} onChange={(e) => setName(e.target.value)} />
        <label>Description</label>
        <StyledInput type="textarea" required minLength={5} maxLength={800} required value={description} onChange={(e) => setDescription(e.target.value)} />
        <label>Location</label>
        <StyledInput type="text" required value={location} onChange={(e) => setLocation(e.target.value)} />
        <label>Country</label>
        <StyledInput type="text" required value={country} onChange={(e) => setCountry(e.target.value)} />
        <label>Link</label>
        <StyledInput type="url" required value={link} onChange={(e) => setLink(e.target.value)} />
        <label>Category</label>
        <select required value={category} onChange={(event) => setCategory(event.target.value)}>
          {categories.map((option, index) => (
            <option key={index} value={option}> {option}</option>))}
        </select>
        {/* <label>Rating</label>
      <StyledInput type="number" required /> */}
        <Rating onClick={handleRating} ratingValue={rating} />
        <label>Image</label>
        <StyledInput type="file" ref={fileInput} required />
        <RegisterBtn type="submit" disabled={accessToken === null}>Add Post</RegisterBtn>
      </StyledForm >
    </FormContainer>
  );
};

export default PostSightseeing;

const StyledForm = styled.form`
  color: white;
  display: flex;
  flex-direction: column;
  margin: auto;
`

const StyledInput = styled.input`
  height: 35px;
  width: 225px;
  border: 1px solid white;
  border-radius: 5px;
  background-color: rgba(255, 255, 255, 0.3);
`;
const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: auto;
  padding-top 200px;


  @media (min-width: 768px) {
    width: 50%;
    height: 600px;
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