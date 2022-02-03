import React from "react";

const Avatar = ({ av, avatar, onChange, image }) => {
  return (
    <div>
      <label htmlFor="profileImage">
        <input
          type="radio"
          id="profileImage"
          value={av}
          onChange={onChange}
          required
          checked={avatar === av}
        />
        <img src={image} alt="avatar" />
      </label>
    </div>
  );
};

export default Avatar;
