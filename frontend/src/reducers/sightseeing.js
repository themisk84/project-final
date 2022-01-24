import { createSlice } from "@reduxjs/toolkit";

const sightseeing = createSlice({
  name: "sightseeing",
  initialState: {
    sightseeings: [],
  },
  reducers: {
    addSightseeing: (store, action) => {
      const payloadsArray = action.payload;
      const onePayload = payloadsArray.map((item) => {
        const newSightseeing = {
          _id: item._id,
          name: item.name,
          country: item.country,
          description: item.description,
          category: item.category,
          link: item.link,
          location: item.location,
          user: item.user,
          rating: item.rating,
          createdAt: item.createdAt,
          comments: item.comments,
          likes: item.likes,
          imageUrl: item.imageUrl,
          user: item.user,
        };
        return newSightseeing;
      });
      store.sightseeings = onePayload;
    },
  },
});
export default sightseeing;
