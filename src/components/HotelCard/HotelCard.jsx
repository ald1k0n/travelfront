import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import RatingBox from "./RatingBox";

import "./HotelCard.scss";

import declOfNum from "../DayConfig";

import hotelimg from "../../assets/hotel.png";
import line from "../../assets/line.svg";
import sun from "../../assets/sun.svg";
import moon from "../../assets/moon.svg";
import tag from "../../assets/tag.svg";
import { useSelector } from "react-redux";
import HotelStars from "../HotelStars/HotelStars";

const HotelCard = ({
  hotelId,
  name,
  locationId,
  description,
  rating,
  totalPrice,
  oldPrice,
  rooms,
  hotelStars,
  mode,
  program,
  hotelServices,
  hotel,
  isTour,
  days,
  adultsAmount,
}) => {
  const [cheapestRoom, setCheapestRoom] = useState();

  const [tourDays, setTourDays] = useState(0);

  useEffect(() => {
    const uniqueDays = {};
    if (mode === "tour") {
      program.forEach((item) => {
        item?.days?.forEach((day) => {
          uniqueDays[day?.points?.day] = true;
        });
      });
    }
    setTourDays(Object.keys(uniqueDays).length);
  }, [mode]);

  const { startDate, endDate, daysAmount, peopleAmount } = useSelector(
    (state) => state.client
  );

  // useEffect(() => {
  //   if (rooms && rooms.length > 0) {
  //     setCheapestRoom(
  //       rooms
  //         .filter((room) => room.capacity >= peopleAmount)
  //         .reduce(function (prev, current) {
  //           return prev.roomPrice < current.roomPrice ? prev : current;
  //         })
  //     );
  //   }
  // }, [rooms]);

  const [clientStartingDate, setClientStartingDate] = useState(new Date());
  const [clientEndingDate, setClientEndingDate] = useState(new Date());

  useEffect(() => {
    setClientStartingDate(new Date(+startDate));
    setClientEndingDate(new Date(+endDate));
  }, [startDate, endDate]);

  const [clientData, setClientData] = useState({
    endDate: 0,
    startDate: 0,
    peopleAmount: 1,
    daysAmount: 2,
  });

  useEffect(() => {
    setClientData({
      ...clientData,
      startDate: window.localStorage.getItem("startDate"),
      endDate: window.localStorage.getItem("endDate"),
      peopleAmount: window.localStorage.getItem("peopleAmount"),
      daysAmount: window.localStorage.getItem("daysAmount"),
    });
  }, []);

  return (
    <div className="hotel_card">
      <div className="card_left card_col">
        <img
          src={hotel?.img[0] ? hotel?.img[0] : hotelimg}
          alt=""
          className="hotel_card-img"
        />
        {cheapestRoom?.discount && cheapestRoom?.discount !== 0 ? (
          <div className="discount_box">-{cheapestRoom?.discount}%</div>
        ) : null}
      </div>
      <div className="card_mid card_col">
        <div className="card_mid-top">
          <div className="card_mid-title">{name}</div>
          <div className="card_mid-location">
            {locationId ? locationId.locationName + ", " : "Место загружается"}
            {locationId ? locationId.locationCountry : null}
          </div>
        </div>
        <div className="card_mid-rating">
          {hotelStars ? <HotelStars number={hotelStars} /> : null}
          {rating ? <RatingBox rating={rating} /> : null}
        </div>
        <div className="card_mid-desc">
          {description.slice(0, 100)}
          {description.length > 100 ? "..." : ""}
        </div>
        <div className="card_mid-tags">
          {/* {mode === "tour" ? (
            <>
              {hotelServices && hotelServices.length > 0
                ? hotelServices?.slice(0, 4).map((serv) => {
                    return (
                      <div className="card_tag" key={serv}>
                        {serv.icon ? (
                          <div
                            dangerouslySetInnerHTML={{
                              __html: serv.icon,
                            }}
                          />
                        ) : null}
                        {serv.name}
                      </div>
                    );
                  })
                : null}
            </>
          ) : null} */}
          {hotelServices && hotelServices.length > 0
            ? hotelServices?.slice(0, 4).map((serv) => {
                return (
                  <div className="card_tag" key={serv.hotelServiceName}>
                    {serv.icon ? (
                      <div
                        dangerouslySetInnerHTML={{
                          __html: serv.icon,
                        }}
                      />
                    ) : null}
                    {serv.hotelServiceName}
                  </div>
                );
              })
            : null}
        </div>
      </div>
      <img src={line} alt="" className="plane_divider" />
      <div className="card_right card_col">
        <div className="card_right-top">
          {oldPrice ? (
            <>
              <div className="card_right-old-price">{oldPrice} тг</div>
              <div className="card_right-price">
                от <span>{totalPrice}</span> тг
              </div>
            </>
          ) : (
            <div className="card_right-price">
              от <span>{totalPrice}</span> тг
            </div>
          )}

          <div className="card_right-people">
            {hotel.adultsAmount && hotel.adultsAmount > 0
              ? `На ${adultsAmount ? adultsAmount : 1} взр.`
              : ""}
            {hotel.kidsAmount && hotel.kidsAmount > 0
              ? `, ${hotel.kidsAmount} дет.`
              : null}
          </div>
        </div>
        <div className="card_right-days">
          <div className="card_days">
            <img src={sun} alt="" />
            <span>
              {isTour ? days : hotel.daysAmount}{" "}
              {declOfNum(isTour ? days : hotel.daysAmount)}
            </span>
          </div>
          <div className="card_days nights">
            <img src={moon} alt="" />
            <span>
              {hotel.daysAmount - 1}{" "}
              {declOfNum(hotel.daysAmount - 1, ["ночь", "ночи", "ночей"])}
            </span>
          </div>
        </div>
        <Link
          className="primary-btn yellow"
          to={
            mode === "tour"
              ? `/tour/${hotelId}`
              : mode === "camps"
              ? `/camp/${hotelId}`
              : mode === "sanatorium"
              ? `/sanatoriums/${hotelId}`
              : `/hotels/${hotelId}`
          }
        >
          Подробнее
        </Link>
      </div>
    </div>
  );
};

export default HotelCard;
