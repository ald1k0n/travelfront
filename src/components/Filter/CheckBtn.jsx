import React from "react";
import check from "../../assets/filter/check.svg";

const CheckBtn = ({ isActive }) => {
  return (
    <button className={isActive ? "check-btn active" : "check-btn"}>
      {isActive ? <img src={check} alt="" /> : null}
    </button>
  );
};

export default CheckBtn;
