import React from "react";

import style from "./Hotel.module.scss";

const Hotels = ({ hotel }) => {
  console.log(hotel);
  return (
    <div className={style.container}>
      <div className={style.body_top}>
        <img
          src={
            hotel.img.length > 0
              ? hotel.img[0]
              : "https://alterainvest.ru/upload/iblock/606/6068fc0ed88b9d6f995d3f1d073cce37.jpg"
          }
          alt="hotel image"
        />
        <div className={style.info}>
          <div className={style.title}>{hotel.name}</div>
        </div>
      </div>
      <div className={style.button_container}>
        <button style={{ width: "100%" }} className="primary-btn">
          Выбрать
        </button>
      </div>
    </div>
  );
};

export default Hotels;
