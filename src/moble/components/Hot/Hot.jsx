import React from "react";

import style from "./Hot.module.scss";

const Hot = (props) => {
  return (
    <div className={style.hot_container}>
      <div className={style.hot_title}>
        {props ? `Найдено ${props.count}` : "Горячие туры 2023"}
      </div>
      <div className={style.hot_description}>
        Lorem ipsum dolor sit amet, id dicant splendide cum.
      </div>
    </div>
  );
};

export default Hot;
