import React from "react";
import "./Loader.scss";

const SumLoader = () => {
  return (
    <>
      <div className={`custom-loader-box sum`}>
        Загрузка <div className={`custom-loader sum small`}></div>
      </div>
    </>
  );
};

export default SumLoader;
