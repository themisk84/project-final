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
      console.log('Post liked!', action.payload)
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
        if (item._id === action.payload._id) {
          const commentsArray = action.payload.comments
          const newestComment = commentsArray.pop()
          console.log('Newest comment: ', newestComment)

          const updateComments = {
            ...item,
            comments: [...item.comments, newestComment],
          }
          return updateComments
        } else {
          return item
        }
      })
      store.sightseeings = updatedSightseeings
    },
    deletePost: (store, action) => {
      const deletedPost = store.sightseeings.filter(
        (item) => item._id !== action.payload,
      )
      store.sightseeings = deletedPost
    },
  },
})
export default sightseeing
