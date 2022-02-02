import { createSlice } from "@reduxjs/toolkit";

const user = createSlice({
  name: "user",
  initialState: {
    username: null,
    userId: null,
    accessToken: null,
    error: null,
    likedSights: []
    // form: false,
  },
  reducers: {
    setUsername: (store, action) => {
      store.username = action.payload;
    },
    setUserId: (store, action) => {
      store.userId = action.payload;
    },
    setAccessToken: (store, action) => {
      store.accessToken = action.payload;
    },
    setError: (store, action) => {
      store.error = action.payload;
    },
    addLikedPosts: (store, action) => {
      if (store.likedSights?.length === 0) {
        store.likedSights = [action.payload]
      } else if (store.likedSights?.length > 0) {
        store.likedSights = [...store.likedSights, action.payload]
      }
    }
    // setForm: (store, action) => {
    //   store.form = action.payload;
    // },
  },
});

export default user;
