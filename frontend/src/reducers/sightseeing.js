import { createSlice } from "@reduxjs/toolkit";

const sightseeing = createSlice({
  name: "sightseeing",
  initialState: {
    sightseeings: [],
  },
  reducers: {
    addSightseeing: (store, action) => {
      const { name, country, description, category, link, location, user } =
        action.payload;
    },
  },
});
export default sightseeing;
