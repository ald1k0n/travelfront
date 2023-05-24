import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import banner from "../../assets/banner.png";
import SortBtn from "../../components/Filter/SortBtn";
import HotelCard from "../../components/HotelCard/HotelCard";
import { getSearchedHotels } from "../../features/hotel/hotelSlice";
import { useNavigate } from "react-router-dom";
import {
  useGetHotelsByFilterQuery,
  useLazyGetHotelsByFilterQuery,
} from "../../features/services/filter.service";

import { setFilterData as setHotelFilterData } from "../../features/hotel/hotelSlice";
import Loader from "../../components/Loader";

const HotelsResults = ({ mode }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { searchData } = useSelector((state) => state.search);
  const { hotels } = useSelector((state) => state.hotels);

  // console.log(startDate, "startdate");

  const [searchHotels, { isLoading: hotelsIsLoading }] =
    useLazyGetHotelsByFilterQuery();
  useEffect(() => {
    searchHotels(searchData).then(({ data }) => {
      dispatch(setHotelFilterData(data));
    });
  }, []);

  if (hotelsIsLoading) return <Loader />;

  return (
    <div className="all_hotels_wrapper wrapper ver">
      <img src={banner} alt="" className="banner" />

      <div className="all_hotels-top">
        <div className="all_hotels-num">
          Найдено: <span>{hotels?.length}</span>
        </div>
        <SortBtn mode={mode} />
      </div>

      {hotels && hotels?.length > 0 ? (
        hotels?.map((hotel, idx) => {
          if (hotel.searchable)
            return (
              <HotelCard
                program={hotel.program}
                key={hotel._id}
                hotelId={hotel._id}
                name={hotel.name}
                locationId={hotel.locationId}
                price={hotel.price}
                adultsAmount={hotel.adultsAmount}
                kidsAmount={hotel.kidsAmount}
                days={hotel.daysAmount}
                description={hotel.description}
                rating={hotel.rating}
                startDate={searchData.start}
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

      {/* {hotels?.length >= hotelsToShow ? (
        <button className="sort-btn">Загрузить еще...</button>
      ) : null} */}
    </div>
  );
};

export default HotelsResults;
