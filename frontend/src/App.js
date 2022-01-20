import React from "react";
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Start from "./pages/Start";
import Country from "./pages/Country";
import UserPage from "./pages/UserPage";

import user from "./reducers/user";
import sightseeing from "reducers/sightseeing";

const reducer = combineReducers({
  user: user.reducer,
  sightseeing: sightseeing.reducer,
});

const store = configureStore({ reducer });

export const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Start />} />
          {/* <Route path="/country/:country" element={<Country />} />
          <Route path="/user" element={<UserPage />} />
          <Route path="*" element={<ErrorPage />} /> */}
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};
