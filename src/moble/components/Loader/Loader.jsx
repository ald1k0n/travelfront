import React from "react";
import style from "./Loader.module.scss";

const Loader = () => {
  return (
    <div className={style.container}>
      <span className={style.loader}></span>
    </div>
  );
};

export default Loader;
