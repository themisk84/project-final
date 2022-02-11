import React from "react";
import { createStore, combineReducers } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import user from "reducers/user";
import sightseeing from "reducers/sightseeing";
import { ui } from "./reducers/ui";

import Start from "./pages/Start";
import Country from "./pages/Country";
import UserPage from "./pages/UserPage";
import Activity from "./pages/Activity";
import Signin from "./pages/Signin";
import PostSightseeing from "./pages/PostSightseeing";
import SavedPosts from "./pages/SavedPosts";
import SearchPage from "pages/SearchPage";
import ErrorMessage from "./pages/ErrorMessage";
import About from "pages/About";

import Navbar from "components/Navbar";
import GradientBackground from "components/GradientBackground";

const reducer = combineReducers({
  user: user.reducer,
  sightseeing: sightseeing.reducer,
  ui: ui.reducer,
});
const persistedState = localStorage.getItem("redux")
  ? JSON.parse(localStorage.getItem("redux"))
  : {};

const store = createStore(
  reducer,
  persistedState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

store.subscribe(() => {
  localStorage.setItem("redux", JSON.stringify(store.getState()));
});

export const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Start />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/country/:country" element={<Country />} />
          <Route path="/activity/:activityId" element={<Activity />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/user" element={<UserPage />} />
          <Route path="/add" element={<PostSightseeing />} />
          <Route path="/savedPosts" element={<SavedPosts />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<ErrorMessage />} />
        </Routes>
      </BrowserRouter>
      <GradientBackground />
    </Provider>
  );
};
