import React from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import styled from 'styled-components'

import AttractionCards from "components/AttractionCards";

const SearchPage = () => {
  const search = useLocation().search;
  const name = new URLSearchParams(search).get("name");
  const category = new URLSearchParams(search).get("category");
  const country = new URLSearchParams(search).get("country");
  const description = new URLSearchParams(search).get("description");

  const stories = useSelector((store) => store.sightseeing.sightseeings);
  const filteredStories = stories.filter(
    (story) =>
      story.country.toLowerCase().includes(name.toLowerCase()) ||
      story.name.toLowerCase().includes(category.toLowerCase()) ||
      story.description.toLowerCase().includes(country.toLowerCase()) ||
      story.category.toLowerCase().includes(description.toLowerCase())
  );
  return (
    <AttractionContainer>
      {filteredStories.map((item) => (
        <AttractionCards item={item} key={item._id} />
      ))}
    </AttractionContainer>
  );
};

export default SearchPage;

const AttractionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px auto;
  @media (min-width: 768px) {
    flex-direction: row;
    flex-wrap: wrap;
  }
  @media (min-width: 998px) {
    flex-wrap: wrap;
    justify-content: space-between;
    width: 900px;
  }
`
