import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import banner from "../../assets/banner.png";
import SortBtn from "../../components/Filter/SortBtn";
import HotelCard from "../../components/HotelCard/HotelCard";
import "./Home.scss";

const Hotels = ({ selectedHotels, mode }) => {
  const [hotelsToShow, setHotelsToShow] = useState(5);
  const { startDate, endDate, peopleAmount, daysAmount, destination } =
    useSelector((state) => state.client);

  return (
    <div className="all_hotels_wrapper wrapper ver">
      <img src={banner} alt="" className="banner" />

      <div className="all_hotels-top">
        <div className="all_hotels-num">
          Найдено: <span>{selectedHotels?.length}</span>
        </div>
        <SortBtn mode={mode} />
      </div>

      {selectedHotels && selectedHotels.length > 0 ? (
        selectedHotels
          .filter((hotel, idx) => idx < hotelsToShow)
          .map((hotel, idx) => {
            return (
              <HotelCard
                program={hotel.program}
                key={idx}
                hotelId={hotel._id}
                name={hotel.name}
                locationId={hotel.locationId}
                price={hotel.price * peopleAmount}
                amount={peopleAmount}
                days={daysAmount}
                description={hotel.description}
                rating={hotel.rating}
                startDate={startDate}
                endDate={endDate}
                rooms={hotel.rooms}
                totalPrice={hotel.totalPrice}
                oldPrice={hotel.oldPrice}
                hotelStars={hotel.hotelStars}
                mode={mode}
                hotelServices={hotel.hotelServices}
                hotel={hotel}
              />
            );
          })
      ) : (
        <div>😭 Ничего не найдено...</div>
      )}

      {selectedHotels.length >= hotelsToShow ? (
        <button
          className="sort-btn"
          onClick={() => setHotelsToShow(hotelsToShow + 5)}
        >
          Загрузить еще...
        </button>
      ) : null}
    </div>
  );
};

export default Hotels;
