import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import banner from "../../assets/banner.png";
import SortBtn from "../../components/Filter/SortBtn";
import HotelCard from "../../components/HotelCard/HotelCard";
import { useNavigate } from "react-router-dom";
import { setFilterData as setSanatoriumFilterData } from "../../features/sanatorium/sanatoriumSlice";
import { useLazyGetSanatoriumsByFilterQuery } from "../../features/services/filter.service";
import Loader from "../../components/Loader";

const SanatoriumResults = ({ mode }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { searchData } = useSelector((state) => state.search);
  const { sanatoriums } = useSelector((state) => state.sanatoriums);

  // console.log(startDate, "startdate");

  const [searchSanatoriums, { isLoading: sanatoriumsIsLoading }] =
    useLazyGetSanatoriumsByFilterQuery();
  useEffect(() => {
    searchSanatoriums(searchData).then(({ data }) => {
      dispatch(setSanatoriumFilterData(data));
    });
  }, []);

  if (sanatoriumsIsLoading) return <Loader />;

  return (
    <div className="all_hotels_wrapper wrapper ver">
      <img src={banner} alt="" className="banner" />

      <div className="all_hotels-top">
        <div className="all_hotels-num">
          Найдено: <span>{sanatoriums?.length}</span>
        </div>
        <SortBtn mode={mode} />
      </div>

      {sanatoriums && sanatoriums.length > 0 ? (
        sanatoriums.map((hotel, idx) => {
          if (hotel.searchable)
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
                startDate={searchData.start}
                rooms={hotel.rooms}
                totalPrice={hotel.totalPrice}
                oldPrice={hotel.oldPrice}
                hotelStars={hotel.hotelStars}
                mode="sanatorium"
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

export default SanatoriumResults;
