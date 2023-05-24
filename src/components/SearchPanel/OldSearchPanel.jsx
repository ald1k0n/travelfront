import React, { useState, useEffect } from "react";
import axios from "axios";

import SearchTag from "./SearchTag";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useSelector, useDispatch } from "react-redux";
import {
  setStartDate,
  setEndDate,
  setDaysAmount,
  setPeopleAmount,
  setDestination,
  setSearchOptions,
} from "../../features/clientSlice";

import {
  selectHotels,
  setFilterData as setHotelFilterData,
  clearFilterData,
} from "../../features/hotel/hotelSlice";

import { setFilterData as setSanatoriumFilterData } from "../../features/sanatorium/sanatoriumSlice";

import { getCamps } from "../../features/camps/campSlice";

import "./SearchPanel.scss";

import line from "../../assets/hero/line.svg";

import search1 from "../../assets/search/search1.svg";
import search2 from "../../assets/search/search2.svg";
import search3 from "../../assets/search/search3.svg";

import { tags } from "./tags";
import PeopleSelect from "./PeopleSelect";
import { getTours } from "../../features/tour/tourSlice";
import { useLocation } from "react-router-dom";
import { getSearchedSanatoriums } from "../../features/sanatorium/sanatoriumSlice";
import { API_URL_PROXY } from "../../config/config";
import {
  useLazyGetHotelsByFilterQuery,
  useLazyGetSanatoriumsByFilterQuery,
  useLazyGetTourByFilterQuery,
} from "../../features/services/filter.service";
import { setSearchFilter } from "../../features/search/searchSlice";

const SearchPanel = ({ isUserLook, style }) => {
  const dispatch = useDispatch();

  const { chosenTag } = useSelector((state) => state.client);

  const [allLocations, setAllLocations] = useState(null);

  const { refetch } = useSelector((state) => state.search);

  useEffect(() => {
    axios
      .get(`${API_URL_PROXY}/locations`)
      .then((response) => {
        setAllLocations(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const [startingDate, setStartingDate] = useState(
    localStorage.getItem("startDate") !== "NaN"
      ? new Date(+JSON.parse(localStorage.getItem("startDate")))
      : new Date()
  );
  const [endingDate, setEndingDate] = useState(
    localStorage.getItem("endDate") !== "NaN"
      ? new Date(+JSON.parse(localStorage.getItem("endDate")))
      : new Date(Date.now() + 3600 * 1000 * 24)
  );
  const [searchTerms, setSearchTerms] = useState({
    tag: "Туры",
    origin: "Астана",
    destination: allLocations?._id ? allLocations[0]._id : null,
    peopleAmount: 1,
    adultsAmount: 1,
    kidsAmount: 0,
  });

  const [agesArray, setAgesArray] = useState(
    localStorage.getItem("agesArray")
      ? JSON.parse(localStorage.getItem("agesArray"))
      : [1000]
  );

  useEffect(() => {
    localStorage.setItem(
      "agesArray",
      JSON.stringify(agesArray.filter((ages) => ages !== null))
    );
    dispatch(setSearchFilter({ ...searchFilter, agesArray: agesArray }));
  }, [agesArray]);

  const [clientData, setClientData] = useState({
    endDate: Date.parse(endingDate),
    startDate: Date.parse(startingDate),
    peopleAmount: 1,
    adultsAmount: 1,
    kidsAmount: 0,
    agesArray: [1000],
    daysAmount: localStorage.getItem("daysAmount")
      ? JSON.parse(localStorage.getItem("daysAmount"))
      : 2,
    destination: "",
  });

  const [ages, setAges] = useState([]);

  const onChange = (dates) => {
    const [start, end] = dates;
    setStartingDate(start);
    setEndingDate(end);
    if (start && end) {
      setClientData({
        ...clientData,
        startDate: Date.parse(start),
        endDate: Date.parse(end),
        daysAmount:
          (Date.parse(end) - Date.parse(start)) / 1000 / 60 / 60 / 24 + 1,
      });

      dispatch(setStartDate(Date.parse(start)));
      dispatch(
        setSearchFilter({
          ...searchFilter,
          daysAmount:
            (Date.parse(end) - Date.parse(start)) / 1000 / 60 / 60 / 24 + 1,
        })
      );
      dispatch(setEndDate(Date.parse(end)));
      dispatch(
        setDaysAmount(
          (Date.parse(end) - Date.parse(start)) / 1000 / 60 / 60 / 24 + 1
        )
      );
    }
  };

  const [trigger, { data }] = useLazyGetTourByFilterQuery();

  useEffect(() => {
    setClientData({
      ...clientData,
      startDate: localStorage.getItem("startDate"),
      endDate: localStorage.getItem("endDate"),
      peopleAmount: +localStorage.getItem("peopleAmount"),
      kidsAmount: +localStorage.getItem("kidsAmount"),
      adultsAmount: +localStorage.getItem("adultsAmount"),
      daysAmount: +localStorage.getItem("daysAmount"),
      locationId: +localStorage.getItem("locationId"),
    });
  }, []);

  useEffect(() => {
    localStorage.setItem("locationId", clientData.locationId);
    localStorage.setItem("startDate", clientData.startDate);
    localStorage.setItem("endDate", clientData.endDate);
    localStorage.setItem("daysAmount", +clientData.daysAmount);
    localStorage.setItem("peopleAmount", +clientData.peopleAmount);
    localStorage.setItem("kidsAmount", +clientData.kidsAmount);
    localStorage.setItem("adultsAmount", +clientData.adultsAmount);
  }, [clientData]);

  const location = useLocation();

  const [searchHotels, { isLoading: hotelsIsLoading }] =
    useLazyGetHotelsByFilterQuery();
  const [searchSanatoriums, { isLoading: sanatoriumsIsLoading }] =
    useLazyGetSanatoriumsByFilterQuery();

  const handleSearch = ({
    locationId,
    daysAmount,
    startDate,
    adultsAmount,
    kidsAmount,
  }) => {
    switch (location.pathname) {
      case "/hotels":
        searchHotels({
          locationId,
          agesArray: agesArray,
          daysAmount,
          startDate,
        }).then(({ data }) => {
          dispatch(setHotelFilterData(data));
        });
      case "/sanatoriums":
        searchSanatoriums({
          locationId,
          agesArray: agesArray,
          daysAmount,
          startDate,
        }).then(({ data }) => {
          dispatch(setSanatoriumFilterData(data));
        });
    }
  };

  useEffect(() => {
    dispatch(
      setSearchOptions({
        peopleAmount: clientData.peopleAmount,
        kidsAmount: clientData.kidsAmount,
        adultsAmount: clientData.adultsAmount,
      })
    );
  }, [clientData]);

  const { searchFilter } = useSelector((state) => state.search);

  return (
    <div className="search_box" style={style && { ...style }}>
      {!isUserLook && (
        <div className="search_top">
          {tags.map((tag, id) => {
            const isActive = chosenTag === tag.text;
            return (
              <SearchTag
                key={id}
                icon={tag.icon}
                text={tag.text}
                path={tag.path}
                active={isActive}
              />
            );
          })}
        </div>
      )}

      <div className={`search_bot ${isUserLook ? "min" : ""}`}>
        {!isUserLook ? (
          <>
            <div className="search_col">
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
            <img src={line} className="line" alt="" />
            <div className="search_col">
              <img src={search2} alt="" className="search_bot-icon" />
              <div className="search_col-content">
                <div className="search_col-top">Куда?</div>
                <div className="search_col-bot">
                  <select
                    type="text"
                    placeholder="Астана"
                    name="destination"
                    value={searchTerms.destination}
                    onChange={(e) => {
                      dispatch(
                        setSearchFilter({
                          ...searchFilter,
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
        <div className="search_col">
          <img src={search3} alt="" className="search_bot-icon" />
          <div className="search_col-content">
            <div className="search_col-top">Когда?</div>
            <div className="search_col-bot">
              <DatePicker
                dateFormat="dd/MM/yy"
                selected={startingDate}
                onChange={onChange}
                startDate={startingDate}
                endDate={endingDate}
                selectsRange
              />
            </div>
          </div>
        </div>
        <img src={line} className="line" alt="" />
        <PeopleSelect
          setAgesArray={setAgesArray}
          agesArray={agesArray}
          refetch={refetch}
        />
        <button
          className={`primary-btn ${isUserLook ? "blue" : "yellow"}`}
          onClick={() => {
            handleSearch({
              locationId: searchTerms.destination,
              peopleAmount: clientData.peopleAmount,
              daysAmount: clientData.daysAmount,
              startDate: clientData.startDate,
              agesArray: clientData.agesArray,
              adultsAmount: agesArray.filter((age) => age === 1000).length,
              kidsAmount: agesArray.filter((age) => age !== 1000).length,
            });
          }}
        >
          Найти
        </button>
      </div>
    </div>
  );
};

export default SearchPanel;
