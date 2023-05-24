import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import banner from "../../assets/banner.png";
import SortBtn from "../../components/Filter/SortBtn";
import HotelCard from "../../components/HotelCard/HotelCard";
import { useNavigate } from "react-router-dom";
import { useLazyGetCampsByFilterQuery } from "../../features/services/filter.service";

import { setFilterData as setCampFilterData } from "../../features/camps/campSlice";
import Loader from "../../components/Loader";

const CampsResults = ({ mode }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { searchData } = useSelector((state) => state.search);
  const { camps } = useSelector((state) => state.camps);

  const [searchCamps, { isLoading: campsIsLoading }] =
    useLazyGetCampsByFilterQuery();
  useEffect(() => {
    searchCamps(searchData).then(({ data }) => {
      dispatch(setCampFilterData(data));
    });
  }, []);

  if (campsIsLoading) return <Loader />;

  return (
    <div className="all_hotels_wrapper wrapper ver">
      <img src={banner} alt="" className="banner" />

      <div className="all_hotels-top">
        <div className="all_hotels-num">
          Найдено: <span>{camps?.length}</span>
        </div>
        <SortBtn mode={mode} />
      </div>

      {camps && camps.length > 0 ? (
        camps.map((hotel, idx) => {
          if (hotel.searchable)
            return (
              <HotelCard
                program={hotel.program}
                key={idx}
                hotelId={hotel._id}
                name={hotel.name}
                locationId={hotel.locationId}
                days={searchData.daysAmount}
                description={hotel.description}
                rating={hotel.rating}
                startDate={searchData.start}
                rooms={hotel.rooms}
                totalPrice={hotel.totalPrice}
                oldPrice={hotel.oldPrice}
                hotelStars={hotel.hotelStars}
                mode="camp"
                hotelServices={hotel?.sanatoriumServices?.map(
                  (serv) => serv.serviceType
                )}
                hotel={hotel}
              />
            );
        })
      ) : (
        <div>😭 Ничего не найдено...</div>
      )}

      {/* {selectedSanatoriums?.length >= hotelsToShow ? (
        <button
          className="sort-btn"
          onClick={() => setHotelsToShow(hotelsToShow + 5)}
        >
          Загрузить еще
        </button>
      ) : null} */}
    </div>
  );
};

export default CampsResults;
