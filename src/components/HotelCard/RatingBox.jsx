import React from "react";
import star from "../../assets/star.svg";

const RatingBox = ({ rating, starMode }) => {
  return (
    <>
      {!starMode ? (
        <div className="rating-num">Рейтинг {rating}</div>
      ) : (
        <div className="rating-star">
          {rating} <img src={star} alt="" />
        </div>
      )}
    </>
  );
};

export default RatingBox;
