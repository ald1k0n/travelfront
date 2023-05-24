import React, { useState, useEffect } from "react";
import axios from "axios";

import "react-datepicker/dist/react-datepicker.css";

import { useDispatch, useSelector } from "react-redux";

import "./SearchPanel.scss";

import { setFilterData as setHotelFilterData } from "../../features/hotel/hotelSlice";
import { setFilterData as setSanatoriumFilterData } from "../../features/sanatorium/sanatoriumSlice";
import { setFilterData as setCampFilterData } from "../../features/camps/campSlice";
import { setFilterData as setTourFilterData } from "../../features/tour/tourSlice";
import { setSearchData } from "../../features/search/searchSlice";
import {
  useLazyGetCampsByFilterQuery,
  useLazyGetHotelsByFilterQuery,
  useLazyGetSanatoriumsByFilterQuery,
  useLazyGetTourByFilterQuery,
} from "../../features/services/filter.service";

import { getAdminHotels, reset } from "../../features/hotel/hotelSlice";
import { useGetLocationQuery } from "../../features/services/base.service";

const HotelSearch = ({
  mode,
  reqMode,
  handleStatus,
  handleQuery,
  find,
  query,
}) => {
  const dispatch = useDispatch();

  // Importing all locations for location select
  const { data: allLocations = [], isLoading } = useGetLocationQuery();

  // Importing searchData from searchSlice
  const { searchData } = useSelector((state) => state.search);

  const [searchHotels, { isLoading: hotelsIsLoading }] =
    useLazyGetHotelsByFilterQuery();
  const [searchSanatoriums, { isLoading: sanatoriumsIsLoading }] =
    useLazyGetSanatoriumsByFilterQuery();
  const [searchCamps, { isLoading: campsIsLoading }] =
    useLazyGetCampsByFilterQuery();
  const [searchTours, { isLoading: toursIsLoading }] =
    useLazyGetTourByFilterQuery();

  const handleSearch = (searchObj) => {
    switch (mode) {
      case "hotel":
        searchHotels(searchObj).then(({ data }) => {
          dispatch(setHotelFilterData(data));
        });
        goTo();
        break;
      case "sanatorium":
        searchSanatoriums(searchObj).then(({ data }) => {
          dispatch(setSanatoriumFilterData(data));
        });
        goTo();
        break;
      case "camp":
        searchCamps(searchObj).then(({ data }) => {
          dispatch(setCampFilterData(data));
        });
        goTo();
        break;
      case "tour":
        searchTours(searchObj).then(({ data }) => {
          dispatch(setTourFilterData(data));
        });
        goTo();
        break;
    }
  };

  const renderTitle = () => {
    switch (mode) {
      case "hotel":
        return "Отели";
      case "tour":
        return "Туры";
      case "sanatorium":
        return "Санатории";
      case "camp":
        return "Лагеря";
      case "request":
        return "Заявки";
    }
  };

  return (
    <section className="dash_search_section">
      <div className="container">
        <div className="dash_search_wrapper wrapper ver">
          <div className="dash_heading">{renderTitle()}</div>
          <div className={reqMode ? "search_box req" : "search_box"}>
            <div className="search_bot">
              <div className="search_col">
                <div className="search_col-content">
                  <div className="search_col-bot">
                    <input
                      type="text"
                      placeholder={
                        reqMode
                          ? "Поиск по имени или названию"
                          : "Название или ID"
                      }
                      name="origin"
                      value={reqMode ? query : searchData.searchName}
                      onChange={(e) => {
                        if (reqMode) {
                          handleQuery(e.target.value);
                        } else {
                          dispatch(
                            setSearchData({
                              ...searchData,
                              searchNameId: e.target.value,
                            })
                          );
                        }
                      }}
                    />
                  </div>
                </div>
              </div>

              {reqMode && (
                <div className="search_col">
                  <div className="search_col-content">
                    <div className="search_col-top">Тип услуги</div>
                    <div className="search_col-bot">
                      <select type="text" name="services">
                        <option selected>Отель</option>
                        <option>Тур (если отель с туром)</option>
                        <option>1-3 тур</option>
                        <option>Санаторий</option>
                        <option>Лагерь</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              <div className="search_col">
                <div className="search_col-content">
                  <div className="search_col-top">Где?</div>
                  <div className="search_col-bot">
                    <select
                      type="text"
                      name="destination"
                      value={searchData.locationId}
                      onChange={(e) => {
                        dispatch(
                          setSearchData({
                            ...searchData,
                            locationId: e.target.value,
                          })
                        );
                      }}
                    >
                      <option value="" selected>
                        Весь Казахстан
                      </option>
                      {allLocations ? (
                        allLocations.map((location, idx) => {
                          return (
                            <option value={location._id} key={idx}>
                              {location.locationName}
                            </option>
                          );
                        })
                      ) : (
                        <p>Locations are loading</p>
                      )}
                    </select>
                  </div>
                </div>
              </div>

              {reqMode && (
                <div className="search_col">
                  <div className="search_col-content">
                    <div className="search_col-top">Статус</div>
                    <div className="search_col-bot">
                      <select
                        type="text"
                        name="status"
                        onChange={(e) => {
                          handleStatus(e.target.value);
                        }}
                      >
                        <option value="" selected>
                          Любой статус
                        </option>
                        <option value="В обработке">В обработке</option>
                        <option value="Отклонено">Отклонено</option>
                        <option value="Оплачено">Оплачено</option>
                        <option value="На паузе">На паузе</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {reqMode ? (
                <div className="search_col">
                  <div className="search_col-content">
                    <div className="search_col-top">Когда?</div>
                    <div className="search_col-bot">
                      <label htmlFor="dates">Любые даты</label>
                      <input
                        type="date"
                        placeholder="Любые даты"
                        hidden
                        id="dates"
                        name="dates"
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="search_col">
                  <div className="search_col-content">
                    <div className="search_col-top">Мин. возраст</div>
                    <div className="search_col-bot">
                      <input
                        type="number"
                        placeholder="Любой"
                        min={0}
                        max={18}
                        name="number"
                        value={searchData.minAge}
                      />
                    </div>
                  </div>
                </div>
              )}

              <button
                className="primary-btn yellow"
                onClick={() => {
                  if (reqMode) {
                    find();
                  } else {
                    handleSearch({
                      ...searchData,
                      locationId: searchData.locationId,
                      searchNameId: searchData.searchNameId,
                      dashMode: true,
                    });
                  }
                }}
              >
                Найти
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HotelSearch;
