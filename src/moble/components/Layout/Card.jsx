import React from "react";

import style from "./Card.module.scss";
import HotelStars from "../../../components/HotelStars/HotelStars";
import { RatingBox } from "../../../components/HotelCard/HotelCard";
import tag from "../../../assets/tag.svg";
import line from "../../../assets/line.svg";
import { Button } from "../Button/Button";

const Card = ({ name, image, locationFeature, stars, rating, price }) => {
  const formatter = Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency: "KZT",
  });

  return (
    <div className={style.card}>
      <div className={style.card_container}>
        <div className={style.card_content}>
          <div className={style.card_image}>
            <img
              src={
                image
                  ? image
                  : "https://pix10.agoda.net/hotelImages/22885182/-1/3df920ce196da7b8a015ce2a24b2dff9.jpg?ca=19&ce=1&s=312x235&ar=16x9"
              }
              alt="Card Image"
            />
          </div>
          <div className={style.card_location}>
            {locationFeature
              ? `${locationFeature}`
              : "Алматинская область, Казахстан"}
          </div>
          <div className={style.card_title}>
            {name ? name : "Отель Каравансарай"}
          </div>
          <div className={style.card_stars}>
            {stars ? <HotelStars number={stars} /> : <HotelStars number={4} />}
            {rating ? <RatingBox rating={rating} /> : <RatingBox rating={4} />}
          </div>
          <div className={style.card_tags}>
            <img src={tag} alt="" />
            Все включено
          </div>
          <hr style={{ marginTop: "18px", marginBottom: "18px" }} />
          <div className={style.card_price}>
            {price ? price : `от ${formatter.format(10000)}`}
          </div>

          <div className={style.card_button}>
            <Button btn="primary">Подробнее</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
