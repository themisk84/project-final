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
    savedSights: [],
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
    addSavedPost: (store, action) => {
      console.log(action.payload);
      if (store.savedSights?.length === 0) {
        console.log(store.savedSights);
        store.savedSights = [action.payload];
      } else if (store.savedSights?.length > 0) {
        console.log(store.savedSights);
        store.savedSights = [...store.savedSights, action.payload];
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
