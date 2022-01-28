import React from 'react'
import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Start from './pages/Start'
import Country from './pages/Country'
import UserPage from './pages/UserPage'
import Activity from './pages/Activity'

<<<<<<< HEAD
import user from "./reducers/user";
import sightseeing from "reducers/sightseeing";
import SearchPage from "pages/SearchPage";
import ErrorMessage from "./pages/ErrorMessage";
=======
import Signin from './components/Signin'

import user from './reducers/user'
import sightseeing from 'reducers/sightseeing'
>>>>>>> activityPage

const reducer = combineReducers({
  user: user.reducer,
  sightseeing: sightseeing.reducer,
})

const store = configureStore({ reducer })

// const reducer = combineReducers({
//   user: user.reducer,
//   sightseeing: sightseeing.reducer
// })
// const persistedState = localStorage.getItem('redux')
//   ? JSON.parse(localStorage.getItem('redux'))
//   : {}

// const store = createStore(
//   reducer,
//   persistedState,
//   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
// )

// store.subscribe(() => {
//   localStorage.setItem("redux", JSON.stringify(store.getState()));
// })

export const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Start />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/country/:country" element={<Country />} />
<<<<<<< HEAD
          <Route path="/search" element={<SearchPage />} />
          {/* <Route path="/user" element={<UserPage />} /> */}
          <Route path="*" element={<ErrorMessage />} />
=======
          <Route path="/activity/:activityId" element={<Activity />} />
          {/* // <Route path="/user" element={<UserPage />} />
          // <Route path="*" element={<ErrorPage />} />  */}
>>>>>>> activityPage
        </Routes>
      </BrowserRouter>
    </Provider>
  )
}
