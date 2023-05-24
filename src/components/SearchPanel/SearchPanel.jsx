import React, { useState, useEffect } from "react";
import axios from "axios";

import SearchTag from "./SearchTag";
import { useSelector, useDispatch } from "react-redux";

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

import "./SearchPanel.scss";

import line from "../../assets/hero/line.svg";

import search2 from "../../assets/search/search2.svg";

import { tags } from "./tags";
import PeopleSelect from "./PeopleSelect";
import { useLocation } from "react-router-dom";
import { API_URL_PROXY } from "../../config/config";

import { useGetLocationQuery } from "../../features/services/base.service";
import DateSelect from "./DateSelect";

const SearchPanel = ({ isUserLook, style }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { refetch } = useSelector((state) => state.search);

  // Importing all locations for location select
  const { data: allLocations = [], isLoading } = useGetLocationQuery();

  // Importing searchData from searchSlice
  const { searchData } = useSelector((state) => state.search);

  // PeopleSelect functionality
  const [agesArray, setAgesArray] = useState([1000]); // Initially
  useEffect(() => {
    dispatch(setSearchData({ ...searchData, agesArray: agesArray }));
  }, [agesArray]);

  // remove

  console.log(searchData, "searchdata");

  // Search functionality
  const [searchHotels, { isLoading: hotelsIsLoading }] =
    useLazyGetHotelsByFilterQuery();
  const [searchSanatoriums, { isLoading: sanatoriumsIsLoading }] =
    useLazyGetSanatoriumsByFilterQuery();
  const [searchCamps, { isLoading: campsIsLoading }] =
    useLazyGetCampsByFilterQuery();
  const [searchTours, { isLoading: toursIsLoading }] =
    useLazyGetTourByFilterQuery();

  const goTo = () => {
    const sectionElement = document.querySelector(".hero_section");
    const computedStyle = window.getComputedStyle(sectionElement);
    const sectionHeight = computedStyle.getPropertyValue("height");
    window.scrollTo({
      top: parseInt(sectionHeight),
      behavior: "smooth",
    });
  };

  const handleSearch = (searchObj) => {
    switch (location.pathname) {
      case "/hotels":
        searchHotels(searchObj).then(({ data }) => {
          dispatch(setHotelFilterData(data));
        });
        goTo();
        break;
      case "/sanatoriums":
        searchSanatoriums(searchObj).then(({ data }) => {
          dispatch(setSanatoriumFilterData(data));
        });
        goTo();
        break;
      case "/camps":
        searchCamps(searchObj).then(({ data }) => {
          dispatch(setCampFilterData(data));
        });
        goTo();
        break;
      case "/tours":
        searchTours(searchObj).then(({ data }) => {
          dispatch(setTourFilterData(data));
        });
        goTo();
        break;
    }
  };

  // On first render, fill searchData with localStorage data
  useEffect(() => {
    const storedLocationId = localStorage.getItem("locationId") || "";
    const storedDaysAmount = localStorage.getItem("daysAmount") || 1;
    const storedStart = localStorage.getItem("start");
    const storedEnd = localStorage.getItem("end");
    const storedAgesArray = JSON.parse(localStorage.getItem("agesArray")) || [
      1000,
    ];

    dispatch(
      setSearchData({
        ...searchData,
        locationId: storedLocationId,
        daysAmount: storedDaysAmount,
        start: storedStart,
        end: storedEnd,
        agesArray: storedAgesArray,
      })
    );
  }, []);

  // Saving the searchData to localStorage on change
  useEffect(() => {
    localStorage.setItem("start", searchData.start);
    localStorage.setItem("end", searchData.end);
    localStorage.setItem("locationId", searchData.locationId);
    localStorage.setItem("locationName", searchData.locationName);
    localStorage.setItem("daysAmount", searchData.daysAmount);
    localStorage.setItem("agesArray", JSON.stringify(searchData.agesArray));
  }, [searchData]);

  return (
    <div className="search_box" style={style && { ...style }}>
      {!isUserLook && (
        <div className="search_top">
          {tags.map((tag, id) => {
            return (
              <SearchTag
                key={id}
                icon={tag.icon}
                text={tag.text}
                path={tag.path}
              />
            );
          })}
        </div>
      )}

      <div className={`search_bot ${isUserLook ? "min" : ""}`}>
        {!isUserLook ? (
          <>
            {/* <div className="search_col">
              <img src={search1} alt="" className="search_bot-icon" />
              <div className="search_col-content">
                <div className="search_col-top">Откуда?</div>
                <div className="search_col-bot">
                  <input
                    type="text"
                    placeholder="Астана"
                    name="origin"
                    value={searchTerms.origin}
                    onChange={(e) => {
                      setSearchTerms({
                        ...searchTerms,
                        origin: e.target.value,
                      });
                    }}
                  />
                </div>
              </div>
            </div>
            <img src={line} className="line" alt="" /> */}
            <div className="search_col">
              <img src={search2} alt="" className="search_bot-icon" />
              <div className="search_col-content">
                <div className="search_col-top">Куда?</div>
                <div className="search_col-bot">
                  <select
                    type="text"
                    placeholder="Астана"
                    name="destination"
                    value={searchData.locationId}
                    onChange={(e) => {
                      dispatch(
                        setSearchData({
                          ...searchData,
                          locationId: e.target.value,
                          locationName: allLocations.find(
                            (loc) => loc._id === e.target.value
                          )?.locationName
                            ? allLocations.find(
                                (loc) => loc._id === e.target.value
                              )?.locationName
                            : "Весь Казахстан",
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
                          <option value={location._id} key={location._id}>
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
            <img src={line} className="line" alt="" />
          </>
        ) : null}
        <DateSelect />
        <img src={line} className="line" alt="" />
        <PeopleSelect
          setAgesArray={setAgesArray}
          agesArray={searchData.agesArray}
          refetch={refetch}
        />
        <button
          className={`primary-btn ${isUserLook ? "blue" : "yellow"}`}
          onClick={() => handleSearch(searchData)}
        >
          Найти
        </button>
      </div>
    </div>
  );
};

export default SearchPanel;
