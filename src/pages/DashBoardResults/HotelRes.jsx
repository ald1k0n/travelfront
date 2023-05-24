import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../../components/Loader";
import { setFilterData as setHotelFilterData } from "../../features/hotel/hotelSlice";
import HotelSearch from "../../components/SearchPanel/HotelSearch";
import Section from "../../components/Section";
import Filter from "../../components/Filter/Filter";
import DashHotelCard from "../../components/HotelCard/DashHotelCard";
import { useLazyGetHotelsByFilterQuery } from "../../features/services/filter.service";
import SortBtn from "../../components/Filter/SortBtn";

const HotelRes = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { searchData } = useSelector((state) => state.search);
  const { hotels } = useSelector((state) => state.hotels);

  // console.log(startDate, "startdate");

  const [searchHotels, { isLoading: hotelsIsLoading }] =
    useLazyGetHotelsByFilterQuery();
  useEffect(() => {
    searchHotels({
      ...searchData,
      locationId: searchData.locationId,
      searchNameId: searchData.searchNameId,
      dashMode: true,
    }).then(({ data }) => {
      dispatch(setHotelFilterData(data));
    });
  }, []);

  if (hotelsIsLoading) {
    return <Loader />;
  }

  return (
    <div className="hotels_tab tab">
      <HotelSearch mode="hotel" />
      <Section section="dash_section" wrapper="dash_wrapper">
        <div className="dash_side">
          <Filter hotelMode mode="hotel" dashMode />
        </div>
        <div className="dash_main-wrapper wrapper ver">
          <div className="all_hotels-top">
            <div className="all_hotels-num">
              Найдено: <span>{hotels?.length}</span>
            </div>
            <div className="btns-box">
              <SortBtn mode="hotel" />
              <Link to="/dashboard/add-hotel" className="primary-btn blue">
                + Добавить отель
              </Link>
            </div>
          </div>
          <div className="dash_main">
            {hotels && hotels.length > 0 ? (
              hotels?.map((hotel, idx) => {
                return <DashHotelCard hotel={hotel} mode="hotel" />;
              })
            ) : (
              <div>😭 Ничего не найдено...</div>
            )}
          </div>
        </div>
      </Section>
    </div>
  );
};

export default HotelRes;
