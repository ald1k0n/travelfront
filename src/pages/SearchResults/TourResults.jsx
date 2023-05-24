import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import banner from "../../assets/banner.png";
import SortBtn from "../../components/Filter/SortBtn";
import HotelCard from "../../components/HotelCard/HotelCard";
import { setFilterData as setTourFilterData } from "../../features/tour/tourSlice";

import { useNavigate } from "react-router-dom";

import Loader from "../../components/Loader";
import {
  useGetTourByFilterQuery,
  useLazyGetTourByFilterQuery,
} from "../../features/services/filter.service";

const TourResults = ({ mode }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { searchData } = useSelector((state) => state.search);
  const { tours } = useSelector((state) => state.tour);

  // console.log(startDate, "startdate");

  const [searchTours, { isLoading: toursIsLoading }] =
    useLazyGetTourByFilterQuery();
  useEffect(() => {
    searchTours(searchData).then(({ data }) => {
      dispatch(setTourFilterData(data));
    });
  }, []);

  if (toursIsLoading) {
    return <Loader />;
  }

  return (
    <div className="all_hotels_wrapper wrapper ver">
      <img src={banner} alt="" className="banner" />

      <div className="all_hotels-top">
        <div className="all_hotels-num">
          Найдено: <span>{tours.length}</span>
        </div>
        <SortBtn mode={mode} />
      </div>
      {tours && tours.length > 0 ? (
        tours.map((hotel, idx) => {
          if (hotel?.searchable)
            return (
              <HotelCard
                program={hotel.program}
                key={hotel._id}
                hotelId={hotel._id}
                name={hotel.name}
                locationId={hotel.locationId}
                price={hotel.price}
                days={hotel.duration ? hotel.duration : 1}
                description={hotel.description}
                rating={hotel.rating}
                startDate={searchData.start}
                isTour
                totalPrice={hotel.totalPrice}
                oldPrice={hotel.oldPrice}
                hotelStars={hotel.hotelStars}
                mode="tour"
                adultsAmount={
                  searchData?.agesArray?.filter((age) => age === 1000).length
                }
                hotelServices={hotel.tourServices}
                hotel={hotel}
              />
            );
        })
      ) : (
        <div>😭 Ничего не найдено...</div>
      )}

      {tours?.length ? (
        <button
          className="sort-btn"
          onClick={() => setHotelsToShow(hotelsToShow + 5)}
        >
          Загрузить еще
        </button>
      ) : null}
    </div>
  );
};

export default TourResults;
