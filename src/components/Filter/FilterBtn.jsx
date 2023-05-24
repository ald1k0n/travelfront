import React from "react";
import CheckBtn from "./CheckBtn";

const FilterBtn = ({ isActive, onClick, key, label }) => {
  return (
    <div key={key} className="filter_content filter_btn" onClick={onClick}>
      <CheckBtn isActive={isActive} />
      {label}
    </div>
  );
};

export default FilterBtn;
