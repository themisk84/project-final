import { createSlice } from "@reduxjs/toolkit";

const user = createSlice({
  name: "user",
  initialState: {
    username: null,
    userId: null,
    accessToken: null,
    error: null,
    avatar: "",
    email: "",
    likedSights: [],
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
        store.likedSights = [action.payload];
      } else if (store.likedSights?.length > 0) {
        store.likedSights = [...store.likedSights, action.payload];
      }
    },
    setAvatar: (store, action) => {
      store.avatar = action.payload;
    },
    setEmail: (store, action) => {
      store.email = action.payload;
    },
    // setAvatarUrl: (store, action) => {
    //   store.avatarUrl = action.payload;
    // },
  },
});

export default user;
