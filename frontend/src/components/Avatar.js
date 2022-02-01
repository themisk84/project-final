import React from "react";

import PostSightseeing from "./PostSightseeing";

const Avatar = () => {
  return (
    <div>
      <div>
        <h1>{username}</h1>
      </div>
      <button onClick={handleForm}>Add post</button>
      <button>My Stories</button>
      {form && <PostSightseeing />}
    </div>
  );
};

export default Avatar;
