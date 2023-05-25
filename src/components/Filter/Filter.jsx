import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import RangeSlider from "react-range-slider-input";

// import plane from "../../assets/plane.svg";

import { setFilterData as setHotelFilterData } from "../../features/hotel/hotelSlice";
import { setFilterData as setSanatoriumFilterData } from "../../features/sanatorium/sanatoriumSlice";
import { setFilterData as setCampFilterData } from "../../features/camps/campSlice";
import { setFilterData as setTourFilterData } from "../../features/tour/tourSlice";
import { setSearchData } from "../../features/search/searchSlice";

import { useGetFoodQuery } from "../../features/services/base.service";

import "./Filter.scss";
import {
  useLazyGetCampsByFilterQuery,
  useLazyGetHotelsByFilterQuery,
  useLazyGetSanatoriumsByFilterQuery,
  useLazyGetTourByFilterQuery,
} from "../../features/services/filter.service";
import FilterBtn from "./FilterBtn";
import HotelStars from "../HotelStars/HotelStars";

import plane from "../../assets/plane.svg";
import calendar from "../../assets/calendar.svg";

const Filter = ({ mode, dashMode }) => {
  const dispatch = useDispatch();

  const { hotels } = useSelector((state) => state.hotels);
  const { sanatoriums } = useSelector((state) => state.sanatoriums);
  const { tours } = useSelector((state) => state.tour);
  const { camps } = useSelector((state) => state.camps);

  // Setting min and max values for RangeSlider
  const [maxPrice, setMaxPrice] = useState(100);
  const [minPrice, setMinPrice] = useState(0);
  const [value, setValue] = useState([minPrice, maxPrice]);
  useEffect(() => {
    setValue([minPrice, maxPrice]);
  }, [minPrice, maxPrice]);

  useEffect(() => {
    switch (mode) {
      case "hotel":
        if (hotels) {
          setMaxPrice(
            [...hotels]?.sort((a, b) => b?.totalPrice - a?.totalPrice)[0]
              ?.totalPrice || 100
          );
          setMinPrice(
            [...hotels]?.sort((a, b) => a?.totalPrice - b?.totalPrice)[0]
              ?.totalPrice || 0
          );
        }
        break;
      case "sanatorium":
        if (sanatoriums) {
          setMaxPrice(
            [...sanatoriums]?.sort((a, b) => b?.totalPrice - a?.totalPrice)[0]
              ?.totalPrice || 100
          );
          setMinPrice(
            [...sanatoriums]?.sort((a, b) => a?.totalPrice - b?.totalPrice)[0]
              ?.totalPrice || 0
          );
        }
        break;
      case "tour":
        if (tours) {
          setMaxPrice(
            [...tours]?.sort((a, b) => b?.totalPrice - a?.totalPrice)[0]
              ?.totalPrice || 100
          );
          setMinPrice(
            [...tours]?.sort((a, b) => a?.totalPrice - b?.totalPrice)[0]
              ?.totalPrice || 0
          );
        }
        break;
      case "camp":
        if (camps) {
          setMaxPrice(
            [...camps]?.sort((a, b) => b?.totalPrice - a?.totalPrice)[0]
              ?.totalPrice || 100
          );
          setMinPrice(
            [...camps]?.sort((a, b) => a?.totalPrice - b?.totalPrice)[0]
              ?.totalPrice || 0
          );
        }
        break;
    }
  }, [mode, hotels, sanatoriums, tours, camps]);

  console.log(maxPrice, minPrice, "max min");

  const { searchData } = useSelector((state) => state.search);

  // console.log(hotelFilter, "hotelfilter");
  // console.log(searchData, "filter data");

  const [filterTours, { isLoading: tourIsLoading }] =
    useLazyGetTourByFilterQuery();
  const [filterHotels, { isLoading: hotelIsLoading }] =
    useLazyGetHotelsByFilterQuery();
  const [filterCamps, { isLoading: campsIsLoading }] =
    useLazyGetCampsByFilterQuery();
  const [filterSanatoriums, { isLoading: sanatoriumsIsLoading }] =
    useLazyGetSanatoriumsByFilterQuery();

  const [filterObj, setFilterObj] = useState({
    filterMaxPrice: maxPrice ? maxPrice : 600000,
    filterMinPrice: minPrice ? minPrice : 0,
    filterFood: [],
    filterRating: null,
    filterStars: null,
  });

  const [startTime, setStartTime] = useState();
  const [endTime, setEndTime] = useState();

  useEffect(() => {
    setStartTime(new Date(+searchData.start));
    setEndTime(new Date(+searchData.end));
  }, [searchData]);

  useEffect(() => {
    setFilterObj({
      ...filterObj,
      filterMaxPrice: value[1],
      filterMinPrice: value[0],
    });
  }, [value]);

  const { data: allFoods = [], isLoading } = useGetFoodQuery();

  const stars = [5, 4, 3, 2];
  const durations = [
    { value: "", label: "Любая" },
    { value: 3, label: "3 дня" },
    { value: 2, label: "2 дня" },
    { value: 1, label: "1 день" },
  ];

  const applyTourFilter = (filterData) => {
    filterTours(filterData).then(({ data }) => {
      dispatch(setTourFilterData(data));
    });
  };
  const applyHotelFilter = (filterData) => {
    filterHotels(filterData).then(({ data }) => {
      dispatch(setHotelFilterData(data));
    });
  };
  const applySanatoriumFilter = (filterData) => {
    filterSanatoriums(filterData).then(({ data }) => {
      dispatch(setSanatoriumFilterData(data));
    });
  };
  const applyCampFilter = (filterData) => {
    filterCamps(filterData).then(({ data }) => {
      dispatch(setCampFilterData(data));
    });
  };

  const setFilter = () => {
    switch (mode) {
      case "tour":
        dashMode
          ? applyTourFilter({
              ...searchData,
              locationId: searchData.locationId,
              searchNameId: searchData.searchNameId,
              dashMode: true,
            })
          : applyTourFilter({
              ...searchData,
              minPrice: minPrice !== maxPrice ? minPrice : "",
              maxPrice: maxPrice !== minPrice ? maxPrice : "",
            });
        break;
      case "hotel":
        dashMode
          ? applyHotelFilter({
              ...searchData,
              locationId: searchData.locationId,
              searchNameId: searchData.searchNameId,
              dashMode: true,
            })
          : applyHotelFilter({
              ...searchData,
              minPrice: minPrice !== maxPrice ? minPrice : "",
              maxPrice: maxPrice !== minPrice ? maxPrice : "",
            });
        break;
      case "sanatorium":
        dashMode
          ? applySanatoriumFilter({
              ...searchData,
              locationId: searchData.locationId,
              searchNameId: searchData.searchNameId,
              dashMode: true,
            })
          : applySanatoriumFilter({
              ...searchData,
              minPrice: minPrice !== maxPrice ? minPrice : "",
              maxPrice: maxPrice !== minPrice ? maxPrice : "",
            });
        break;
      case "camp":
        dashMode
          ? applyCampFilter({
              ...searchData,
              locationId: searchData.locationId,
              searchNameId: searchData.searchNameId,
              dashMode: true,
            })
          : applyCampFilter({
              ...searchData,
              minPrice: minPrice !== maxPrice ? minPrice : "",
              maxPrice: maxPrice !== minPrice ? maxPrice : "",
            });
        break;
    }
  };

  const clearFilter = () => {
    const newSearchData = {
      ...searchData,
      filterFood: [],
      filterServices: [],
      filterStars: "",
      filterRating: [],
      filterExtraPlaces: true,
      filterBathroom: "",
    };

    dispatch(setSearchData(newSearchData));

    switch (mode) {
      case "tour":
        applyFilter(applyTourFilter, newSearchData);
        break;
      case "hotel":
        applyFilter(applyHotelFilter, newSearchData);
        break;
      case "sanatorium":
        applyFilter(applySanatoriumFilter, newSearchData);
        break;
      case "camp":
        applyFilter(applyCampFilter, newSearchData);
        break;
      default:
        break;
    }
  };

  function applyFilter(filterFunction, searchData) {
    const updatedSearchData = {
      ...searchData,
      locationId: searchData.locationId,
      searchNameId: searchData.searchNameId,
      dashMode: dashMode,
    };

    dashMode ? filterFunction(updatedSearchData) : filterFunction(searchData);
  }

  console.log(dashMode ? "dash mode" : "no dash mode");

  const handleFoodFilter = (foodId) => {
    if (searchData.filterFood.some((el) => el === foodId)) {
      dispatch(
        setSearchData({
          ...searchData,
          filterFood: searchData.filterFood.filter((el) => el !== foodId),
        })
      );
    } else {
      dispatch(
        setSearchData({
          ...searchData,
          filterFood: [...searchData.filterFood, foodId],
        })
      );
    }
  };

  const handleExtraPlacesFilter = () => {
    dispatch(
      setSearchData({
        ...searchData,
        filterExtraPlaces: !searchData.filterExtraPlaces,
      })
    );
  };

  const handleStarsFilter = (stars) => {
    if (searchData.filterStars === stars) {
      dispatch(
        setSearchData({
          ...searchData,
          filterStars: "",
        })
      );
    } else {
      dispatch(
        setSearchData({
          ...searchData,
          filterStars: stars,
        })
      );
    }
  };

  const handleRatingFilter = (rating) => {
    if (
      searchData.filterRating[0] === rating[0] &&
      searchData.filterRating[1] === rating[1]
    ) {
      dispatch(setSearchData({ ...searchData, filterRating: [] }));
    } else {
      dispatch(setSearchData({ ...searchData, filterRating: rating }));
    }
  };

  console.log(startTime, endTime, "search time");

  return (
    <div className="filter_box">
      {!location.pathname.includes("/dashboard") ? (
        <div>
          <div className="filter_title">Ваш запрос</div>
          <div className="filter_content">
            <div className="filter_destination">
              <img src={plane} alt="Откуда" />
              Астана <div className="filter_divider"></div>{" "}
              {localStorage.getItem("locationName")}
            </div>
          </div>
          <div className="filter_content users">
            <div className="filter_dateRange">
              <img src={calendar} alt="Календарь" />
              {startTime?.toLocaleDateString("ru-RU", {
                day: "numeric",
                month: "numeric",
              })}{" "}
              -{" "}
              {endTime?.toLocaleDateString("ru-RU", {
                day: "numeric",
                month: "numeric",
              })}
            </div>
          </div>
          {/* <div className="filter_content users">
            <div className="filter_userAmount">
              <img src={person2} alt="Люди" />
              {localStorage.getItem("agesArray") &&
                JSON.parse(localStorage.getItem("agesArray")).filter(
                  (age) => age === 1000
                ).length}{" "}
              взр.
              {localStorage.getItem("agesArray") &&
                JSON.parse(localStorage.getItem("agesArray")).filter(
                  (age) => age !== 1000
                ).length !== 0 && (
                  <>
                    {localStorage.getItem("agesArray") &&
                      JSON.parse(localStorage.getItem("agesArray")).filter(
                        (age) => age !== 1000
                      ).length}{" "}
                    дет.
                  </>
                )}
            </div>
          </div> */}
        </div>
      ) : null}

      {!location.pathname.includes("/dashboard") &&
      maxPrice !== minPrice &&
      minPrice !== 0 &&
      maxPrice !== 100 ? (
        <div className="filter_row">
          <div className="filter_title">Цена</div>
          <div className="filter_content price_range">
            {hotels || (hotels && maxPrice !== 100) ? (
              <RangeSlider
                onInput={setValue}
                value={value}
                min={minPrice}
                max={maxPrice}
                step={100}
              />
            ) : null}
            <div className="price-box">
              <div className="price-col left">
                <div className="price-col-title">от</div>
                <div className="price-col-text">{filterObj.filterMinPrice}</div>
              </div>
              <div className="price-col">
                <div className="price-col-title">до</div>
                <div className="price-col-text">{filterObj.filterMaxPrice}</div>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {mode === "tour" ? (
        <div className="filter_row">
          <div className="filter_title">Длительность тура</div>
          {durations.map((dur) => {
            return (
              <FilterBtn
                key={dur.label}
                isActive={searchData.filterDuration === dur.value}
                onClick={() =>
                  searchData.filterDuration === dur.value
                    ? dispatch(
                        setSearchData({ ...searchData, filterDuration: "" })
                      )
                    : dispatch(
                        setSearchData({
                          ...searchData,
                          filterDuration: dur.value,
                        })
                      )
                }
                label={dur.label}
              />
            );
          })}
        </div>
      ) : null}

      <div className="filter_row">
        <div className="filter_title">Питание</div>
        {allFoods
          ? allFoods.map((food, idx) => {
              const isActive = searchData?.filterFood?.includes(food._id);
              return (
                <FilterBtn
                  isActive={isActive}
                  onClick={() => {
                    handleFoodFilter(food._id);
                  }}
                  label={food.label}
                  key={food.label}
                />
              );
            })
          : null}
      </div>
      {mode === "hotel" ? (
        <div className="filter_row">
          <div className="filter_title">Доп. места</div>
          <FilterBtn
            isActive={searchData.filterExtraPlaces}
            label={"Есть"}
            onClick={() =>
              handleExtraPlacesFilter(!searchData.filterExtraPlaces)
            }
          />
        </div>
      ) : null}
      {mode === "hotel" ? (
        <div className="filter_row">
          <div className="filter_title">Количество звезд</div>
          <FilterBtn
            isActive={searchData.filterStars === ""}
            label={"Любой класс"}
            key={123}
            onClick={() => handleStarsFilter("")}
          />
          {stars
            ? stars.map((star, idx) => {
                const isActive = searchData?.filterStars === star;
                return (
                  <>
                    <FilterBtn
                      isActive={isActive}
                      label={<HotelStars number={star} />}
                      key={star}
                      onClick={() => handleStarsFilter(star)}
                    />
                  </>
                );
              })
            : null}
        </div>
      ) : null}
      <div className="filter_row">
        <div className="filter_title">Рейтинг</div>
        <FilterBtn
          isActive={searchData?.filterRating?.length === 0}
          label={"Любой"}
          onClick={() => handleRatingFilter([])}
        />
        <FilterBtn
          isActive={
            searchData?.filterRating?.length !== 0 &&
            searchData?.filterRating[0] === 2 &&
            searchData?.filterRating[1] === 3
          }
          label={"2-3"}
          onClick={() => handleRatingFilter([2, 3])}
        />
        <FilterBtn
          isActive={
            searchData?.filterRating?.length !== 0 &&
            searchData?.filterRating[0] === 3 &&
            searchData?.filterRating[1] === 4
          }
          label={"3-4"}
          onClick={() => handleRatingFilter([3, 4])}
        />
        <FilterBtn
          isActive={
            searchData?.filterRating?.length !== 0 &&
            searchData?.filterRating[0] === 4 &&
            searchData?.filterRating[1] === 5
          }
          label={"4-5"}
          onClick={() => handleRatingFilter([4, 5])}
        />
      </div>

      <div className="filter_row no-border">
        <button className="primary-btn" onClick={() => setFilter()}>
          Отфильтровать
        </button>
        <button className="primary-btn yellow" onClick={() => clearFilter()}>
          Сбросить фильтр
        </button>
      </div>
    </div>
  );
};

export default Filter;

{
  /* <div className="filter_row">
  <div className="filter_title">Вид отдыха</div>
  <div className="filter_content">
    <button className="check-btn"></button>
    Экскурсия
  </div>
  <div className="filter_content">
    <button className="check-btn"></button>
    Конные туры
  </div>
  <div className="filter_content">
    <button className="check-btn"></button>
    Пляжные туры
  </div>
  <div className="filter_content">
    <button className="check-btn"></button>
    Пляжные туры
  </div>
  <div className="filter_content">
    <button className="check-btn"></button>
    Необычные туры
  </div>
</div>; */
}

{
  /* <div className="filter_row">
  <div className="filter_title">Тип тура</div>
  <div className="filter_content">
    <button className="check-btn"></button>
    Индивидуальный
  </div>
  <div className="filter_content">
    <button className="check-btn"></button>
    Групповой
  </div>
</div>; */
}
