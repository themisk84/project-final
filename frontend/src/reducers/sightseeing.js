import { createSlice } from "@reduxjs/toolkit";

const sightseeing = createSlice({
  name: "sightseeing",
  initialState: {
    sightseeings: [],
  },
  reducers: {
    addSightseeing: (store, action) => {
      const newSightseeing = {
        id: action.payload,
        name: action.payload,
        country: action.payload,
        description: action.payload,
        category: action.payload,
        link: action.payload,
        location: action.payload,
        user: action.payload,
        rating: action.payload,
        createdAt: action.payload,
        comments: action.payload,
        likes: action.payload,
        imageUrl: action.payload,
        error: action.payload,
      };

      store.sightseeings = [...store.sightseeings, newSightseeing];
    },
  },
});
export default sightseeing;
