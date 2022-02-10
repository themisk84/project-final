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
          lng: item.lng,
          lat: item.lat,
          location: item.location,
          user: item.user,
          rating: item.rating,
          createdAt: item.createdAt,
          comments: item.comments,
          likes: item.likes,
          imageUrl: item.imageUrl,
        };
        return newSightseeing;
      });
      store.sightseeings = onePayload;
    },
    addLike: (store, action) => {
      const updatedSightseeings = store.sightseeings.map((item) => {
        if (item._id === action.payload._id) {
          const updatedSight = {
            ...item,
            likes: action.payload.likes,
          };
          return updatedSight;
        } else {
          return item;
        }
      });
      store.sightseeings = updatedSightseeings;
    },
    addComment: (store, action) => {
      const updatedSightseeings = store.sightseeings.map((item) => {
        if (item._id === action.payload._id) {
          const newestComment = action.payload.comments.pop();
          console.log("Newest comment: ", newestComment);
          const updateComments = {
            ...item,
            comments: [newestComment, ...item.comments],
          };
          return updateComments;
        } else {
          return item;
        }
      });
      store.sightseeings = updatedSightseeings;
    },
    deleteComment: (store, action) => {
      const updatedSightseeings = store.sightseeings.map((item) => {
        if (item._id === action.payload._id) {
          const updateComments = {
            ...item,
            comments: action.payload.comments,
          };
          return updateComments;
        } else {
          return item;
        }
      });
      store.sightseeings = updatedSightseeings;
    },

    deletePost: (store, action) => {
      const deletedPost = store.sightseeings.filter(
        (item) => item._id !== action.payload
      );
      store.sightseeings = deletedPost;
    },
    addPost: (store, action) => {
      console.log(action.payload);
      const newSightseeing = {
        _id: action.payload._id,
        name: action.payload.name,
        country: action.payload.country,
        description: action.payload.description,
        category: action.payload.category,
        link: action.payload.link,
        lng: action.payload.lng,
        lat: action.payload.lat,
        location: action.payload.location,
        user: action.payload.user,
        rating: action.payload.rating,
        createdAt: action.payload.createdAt,
        comments: action.payload.comments,
        likes: action.payload.likes,
        imageUrl: action.payload.imageUrl,
      };

      store.sightseeings = [...store.sightseeings, newSightseeing];
    },
  },
});
export default sightseeing;
