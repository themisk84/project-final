import React from "react";
import { Link } from "react-router-dom";

const ErrorMessage = () => {
  return (
    <div>
      <Link to="/">Go back</Link>
      <h1>Sorry! this page was not found...</h1>
    </div>
  );
};

export default ErrorMessage;
