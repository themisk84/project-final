import React from 'react'
import { createStore, configureStore, combineReducers } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Start from './pages/Start'
import Country from './pages/Country'
import UserPage from './pages/UserPage'
import Activity from './pages/Activity'
import Navbar from 'components/Navbar'
import PostSightseeing from './pages/PostSightseeing'
import SavedPosts from './pages/SavedPosts'

import user from './reducers/user'
import sightseeing from 'reducers/sightseeing'
import SearchPage from 'pages/SearchPage'
import ErrorMessage from './pages/ErrorMessage'
import Signin from './components/Signin'
import { ui } from './reducers/ui'

const reducer = combineReducers({
  user: user.reducer,
  sightseeing: sightseeing.reducer,
  ui: ui.reducer,
});

const store = configureStore({ reducer });

// const reducer = combineReducers({
//   user: user.reducer,
//   sightseeing: sightseeing.reducer,
//   ui: ui.reducer,
// })
// const persistedState = localStorage.getItem('redux')
//   ? JSON.parse(localStorage.getItem('redux'))
//   : {}

// const store = createStore(
//   reducer,
//   persistedState,
//   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
// )

// store.subscribe(() => {
//   localStorage.setItem('redux', JSON.stringify(store.getState()))
// })

export const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Start />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/country/:country" element={<Country />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/activity/:activityId" element={<Activity />} />
          <Route path="/user" element={<UserPage />} />
          <Route path="/add" element={<PostSightseeing />} />
          <Route path="/savedPosts" element={<SavedPosts />} />
          <Route path="*" element={<ErrorMessage />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  )
}
