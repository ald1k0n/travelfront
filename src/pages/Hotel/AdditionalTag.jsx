import React from "react";

import { GiBabyFace } from "react-icons/gi";

const AdditionalTag = ({ text, img, green, yellow }) => {
  return (
    <div
      className={`room_addit-tag ${green ? "green" : ""} ${
        yellow ? "yellow" : ""
      }`}
    >
      {yellow ? (
        <GiBabyFace style={{ marginRight: "5px" }} />
      ) : (
        <img src={img} alt="" />
      )}
      {text}
    </div>
  );
};

export default AdditionalTag;
