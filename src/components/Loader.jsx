import React from "react";

import "./Loader.scss";

const Loader = ({ small }) => {
  return (
    <>
      <div className={`custom-loader-box ${small ? "small" : ""}`}>
        Загрузка <div className={`custom-loader ${small ? "small" : ""}`}></div>
      </div>
    </>
  );
};

export default Loader;
