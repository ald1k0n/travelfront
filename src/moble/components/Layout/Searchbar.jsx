import React, { useState } from "react";

import style from "./Searchbar.module.scss";
import loupe from "../../../assets/loupe.svg";
const Searchbar = () => {
  const [from, setFrom] = useState(
    localStorage.getItem("from") ? localStorage.getItem("from") : ""
  );
  const [to, setTo] = useState(
    localStorage.getItem("to") ? localStorage.getItem("to") : ""
  );

  const onFromChange = (e) => {
    setFrom(e.target.value);
    localStorage.setItem("from", e.target.value);
  };

  const onToChange = (e) => {
    setTo(e.target.value);
    localStorage.setItem("to", e.target.value);
  };

  return (
    <div className={style.container}>
      <div className={style.search}>
        <input
          type="text"
          placeholder="Откуда"
          value={from}
          onChange={onFromChange}
        />
        <input
          type="text"
          placeholder="Куда"
          value={to}
          onChange={onToChange}
        />
        <button className={style.btn}>
          <img src={loupe} alt="" />
        </button>
      </div>
    </div>
  );
};

export default Searchbar;
