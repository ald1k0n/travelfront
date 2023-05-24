import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getTours } from "../../features/tour/tourSlice";
import HotelSearch from "../../components/SearchPanel/HotelSearch";
import Section from "../../components/Section";
import Filter from "../../components/Filter/Filter";
import DashHotelCard from "../../components/HotelCard/DashHotelCard";
import Loader from "../../components/Loader";
import { useLazyGetTourByFilterQuery } from "../../features/services/filter.service";
import { setFilterData as setTourFilterData } from "../../features/tour/tourSlice";
import SortBtn from "../../components/Filter/SortBtn";
import { Link } from "react-router-dom";

const TourRes = () => {
  const dispatch = useDispatch();

  const { searchData } = useSelector((state) => state.search);
  const { tours } = useSelector((state) => state.tour);

  // console.log(startDate, "startdate");

  const [searchTours, { isLoading: toursIsLoading }] =
    useLazyGetTourByFilterQuery();
  useEffect(() => {
    searchTours({
      ...searchData,
      locationId: searchData.locationId,
      searchNameId: searchData.searchNameId,
      dashMode: true,
    }).then(({ data }) => {
      dispatch(setTourFilterData(data));
    });
  }, []);

  if (toursIsLoading) {
    return <Loader />;
  }
  return (
    <div className="tours_tab tab">
      <HotelSearch mode="tour" />
      <Section section="dash_section" wrapper="dash_wrapper">
        <div className="dash_side">
          <Filter mode="tour" dashMode />
        </div>
        <div className="dash_main-wrapper wrapper ver">
          <div className="all_hotels-top">
            <div className="all_hotels-num">
              Найдено: <span>{tours?.length}</span>
            </div>
            <div className="btns-box">
              <SortBtn mode="tour" />
              <Link to="/dashboard/add-tour" className="primary-btn blue">
                + Добавить тур
              </Link>
            </div>
          </div>
          <div className="dash_main">
            {tours && tours.length > 0 ? (
              tours?.map((tour, idx) => {
                return (
                  <DashHotelCard hotel={tour} key={tour._id} mode="tour" />
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

export default TourRes;
