import React from "react";
import { useNavigate } from "react-router-dom";

import foodTag from "../assets/tag.svg";
import calendar from "../assets/tableCalendar.svg";

import style from "./Card.module.scss";

const Card = ({
  image,
  location,
  name,
  food,
  stars,
  duration,
  price,
  id,
  isTour,
  isHotel,
  comforts,
}) => {
  const navigate = useNavigate();
  const goToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  const [peopleAmount, setPeopleAmount] = React.useState(
    localStorage.getItem("peopleAmount")
      ? JSON.parse(localStorage.getItem("peopleAmount"))
      : 1
  );

  const [kidsAmount] = React.useState(
    localStorage.getItem("kidsAmount")
      ? JSON.parse(localStorage.getItem("kidsAmount"))
      : 0
  );

  return (
    <div className={`${style.card_container}`}>
      <div className={`${style.card_body}`}>
        <img src={image} alt="hotel-image" />
        <div className={style.card_location}>
          {location ? location : "Алматинская область, Казахстан"}
        </div>
        <div className={style.card_name}>
          {name ? name : "Горный тур по Тянь-Шань"}
        </div>
        <div className={style.card_stars_body}>
          <div className={style.card_stars}>Рейтинг {stars}</div>
        </div>

        <div className={style.card_info}>
          <div className={style.periods}>
            <img src={calendar} alt="" />
            {duration ? `(${duration} дн.)` : "(2 дн.)"}
          </div>

          <div className={style.food}>
            {food && (
              <>
                <img src={foodTag} alt="food tag" />
                {food}
              </>
            )}
          </div>
        </div>
        {comforts && comforts.length > 0 && (
          <div className={style.comforts}>
            <>
              {comforts.map((comfort, idx) => (
                <>
                  {idx < 3 && (
                    <div key={comfort._id} className={style.comfort}>
                      {comfort.length > 18 ? comfort.substring(0, 16) : comfort}
                    </div>
                  )}
                </>
              ))}
            </>
          </div>
        )}
      </div>
      <div className={style.card_button}>
        <hr
          style={{
            height: "1px",
            border: "none",
            backgroundColor: "rgba(174, 173, 171, .5)",
          }}
        />
        <div className={style.price}>
          <div>от {price ? price : 120000} тг</div>
          <div className={style.peoples}>
            На {peopleAmount} взр. {kidsAmount !== 0 && `и ${kidsAmount} реб.`}
          </div>
        </div>
        <button
          onClick={() => {
            navigate(isTour ? `/tour/${id}` : isHotel ? `/hotels/${id}` : "");
            goToTop();
          }}
          style={{ width: "100%" }}
          className="primary-btn"
        >
          Подробнее
        </button>
      </div>
    </div>
  );
};

export default Card;
