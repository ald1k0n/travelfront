import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import HotelSearch from "../../components/SearchPanel/HotelSearch";
import Section from "../../components/Section";
import Filter from "../../components/Filter/Filter";
import DashHotelCard from "../../components/HotelCard/DashHotelCard";
import { Link, useNavigate } from "react-router-dom";
import { setFilterData as setCampFilterData } from "../../features/camps/campSlice";
import Loader from "../../components/Loader";
import { useLazyGetCampsByFilterQuery } from "../../features/services/filter.service";
import SortBtn from "../../components/Filter/SortBtn";

const CampRes = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { searchData } = useSelector((state) => state.search);
  const { camps } = useSelector((state) => state.camps);

  const [searchCamps, { isLoading: hotelsIsLoading }] =
    useLazyGetCampsByFilterQuery();
  useEffect(() => {
    searchCamps({
      ...searchData,
      locationId: searchData.locationId,
      searchNameId: searchData.searchNameId,
      dashMode: true,
    }).then(({ data }) => {
      dispatch(setCampFilterData(data));
    });
  }, []);

  if (hotelsIsLoading) {
    return <Loader />;
  }

  return (
    <div className="tours_tab tab">
      <HotelSearch mode="camp" />
      <Section section="dash_section" wrapper="dash_wrapper">
        <div className="dash_side">
          <Filter mode="camp" dashMode />
        </div>
        <div className="dash_main-wrapper wrapper ver">
          <div className="all_hotels-top">
            <div className="all_hotels-num">
              Найдено: <span>{camps?.length}</span>
            </div>
            <div className="btns-box">
              <SortBtn mode="camp" />
              <Link to="/dashboard/add-camp" className="primary-btn blue">
                + Добавить лагерь
              </Link>
            </div>
          </div>
          <div className="dash_main">
            {camps && camps.length > 0 ? (
              camps?.map((camp, idx) => {
                return (
                  <DashHotelCard hotel={camp} key={camp._id} mode="camp" />
                );
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

export default CampRes;
