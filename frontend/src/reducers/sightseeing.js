import { createSlice } from '@reduxjs/toolkit'

const sightseeing = createSlice({
  name: 'sightseeing',
  initialState: {
    sightseeings: [],
  },
  reducers: {
    addSightseeing: (store, action) => {
      console.log(action.payload)
      const payloadsArray = action.payload
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
        }
        return newSightseeing
      })
      store.sightseeings = onePayload
    },
    addLike: (store, action) => {
      const updatedSightseeings = store.sightseeings.map((item) => {
        if (item._id === action.payload._id) {
          const updatedSight = {
            ...item,
            likes: action.payload.likes,
          }
          return updatedSight
        } else {
          return item
        }
      })
      store.sightseeings = updatedSightseeings
    },

    addComment: (store, action) => {
      console.log('payload', action.payload)
      const updatedSightseeings = store.sightseeings.map((item) => {
        //"_id": "61eff08569d872002971e973", sightseeing
        // ==== "61f402c8a48461002973e6c3", comment
        // if (item._id === action.payload.sightseeing) {
        if (item._id === action.payload._id) {
          const updateComments = {
            ...item,
            comments: [...item.comments, action.payload],
          }
          return updateComments
        } else {
          return item
        }
        // const updateComments = {
        //   ...item,
        //   comments: [...item.comments, action.payload],
        // }
      })
      store.sightseeings = updatedSightseeings
      // store.sightseeings = [...store.sightseeings, action.payload];
    },
    // const updateComments = {
    //   ...item,
    //   comments: action.payload,
    // };
    // return updateComments;
    //     }
    //     store.sightseeings = updatedSightseeings;
    //   });
    // },
  },
})
export default sightseeing
