import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import HotelSearch from "../../components/SearchPanel/HotelSearch";
import Section from "../../components/Section";
import Filter from "../../components/Filter/Filter";
import DashHotelCard from "../../components/HotelCard/DashHotelCard";
import { getSanatoriums } from "../../features/sanatorium/sanatoriumSlice";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../../components/Loader";
import { useLazyGetSanatoriumsByFilterQuery } from "../../features/services/filter.service";
import { setFilterData as setSanatoriumFilterData } from "../../features/sanatorium/sanatoriumSlice";
import SortBtn from "../../components/Filter/SortBtn";

const SanatoriumRes = () => {
  const dispatch = useDispatch();

  const { searchData } = useSelector((state) => state.search);
  const { sanatoriums } = useSelector((state) => state.sanatoriums);

  const [searchSanatoriums, { isLoading: sanatoriumsIsLoading }] =
    useLazyGetSanatoriumsByFilterQuery();
  useEffect(() => {
    searchSanatoriums({
      ...searchData,
      locationId: searchData.locationId,
      searchNameId: searchData.searchNameId,
      dashMode: true,
    }).then(({ data }) => {
      dispatch(setSanatoriumFilterData(data));
    });
  }, []);

  if (sanatoriumsIsLoading) return <Loader />;

  return (
    <div className="tours_tab tab">
      <HotelSearch mode="sanatorium" />
      <Section section="dash_section" wrapper="dash_wrapper">
        <div className="dash_side">
          <Filter mode="sanatorium" dashMode />
        </div>
        <div className="dash_main-wrapper wrapper ver">
          <div className="all_hotels-top">
            <div className="all_hotels-num">
              Найдено: <span>{sanatoriums?.length}</span>
            </div>
            <div className="btns-box">
              <SortBtn mode="sanatorium" />
              <Link to="/dashboard/add-sanatorium" className="primary-btn blue">
                + Добавить санаторий
              </Link>
            </div>
          </div>
          <div className="dash_main">
            {sanatoriums && sanatoriums.length > 0 ? (
              sanatoriums?.map((sanatorium, idx) => {
                return (
                  <DashHotelCard
                    hotel={sanatorium}
                    key={sanatorium._id}
                    mode="sanatorium"
                  />
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

export default SanatoriumRes;
