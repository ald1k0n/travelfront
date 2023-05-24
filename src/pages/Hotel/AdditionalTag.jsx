import React from "react";

const AdditionalTag = ({ text, img, green }) => {
  return (
    <div className={`room_addit-tag ${green ? "green" : ""}`}>
      <img src={img} alt="" />
      {text}
    </div>
  );
};

export default AdditionalTag;
