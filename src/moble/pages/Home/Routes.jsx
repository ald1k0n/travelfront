import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import DatePicker from "react-datepicker";
import { Button } from "../../components/Layout";

import style from "./Home.module.scss";
import { tags } from "../../../components/SearchPanel/tags";
import search1 from "../../../assets/search/search1.svg";
import search2 from "../../../assets/search/search2.svg";
import tree from "../../../assets/tags/tag4.svg";

import { useState } from "react";
import { CitySelector } from "../../components/CitySelector/CitySelector";
import { PeopleSelect } from "../../components/PeopleSelect/PeopleSelect";

const Routes = ({
  setStartDate,
  setEndDate,
  startDate,
  endDate,
  handlePeopleSelect,
}) => {
  const [isPeople, setIsPeopleOpen] = useState(false);
  const [locationIdTo, setLocationId] = useState("");
  const [locationNameTo, setLocationName] = useState(
    localStorage.getItem("to") ? localStorage.getItem("to") : ""
  );
  const [isCityOpen, setIsCityOpen] = useState(false);
  const [isCityOpenFrom, setIsCityOpenFrom] = useState(false);

  const [locationNameFrom, setLocationNameFrom] = useState(
    localStorage.getItem("from") ? localStorage.getItem("from") : ""
  );
  const [locationIdFrom, setLocationIdFrom] = useState("");

  const handleClientCount = () => {
    setIsCityOpen(false);
    setIsCityOpenFrom(false);
    setIsPeopleOpen(true);
  };

  const handleCitySelect = (_id, name) => {
    setLocationId(_id);
    setLocationName(name);
    localStorage.setItem("to", name);
    setIsCityOpen(false);
  };

  const handleCityFrom = (_id, name) => {
    setLocationIdFrom(_id);
    setLocationNameFrom(name);
    localStorage.setItem("from", name);
    setIsCityOpenFrom(false);
  };

  return (
    <>
      <div className={style.tour_container}>
        <h3 className={style.tour_title}>Найти подходящий тур</h3>

        <div className={style.nav_btns_container}>
          {tags.map((tag, idx) => (
            <NavLink
              to={tag.path}
              key={idx}
              className={({ isActive }) =>
                isActive
                  ? `${style.active} ${style.nav_btn}`
                  : `${style.nav_btn}`
              }
            >
              <div>{tag.icon}</div>
              {tag.text}
            </NavLink>
          ))}
        </div>

        <div className={style.inputs}>
          <div className={style.input}>
            <div className={style.field}>
              <div>
                <img src={search1} alt="From" />
                <label onClick={() => setIsCityOpenFrom(true)}>
                  {locationNameFrom.length === 0 ? "Откуда" : locationNameFrom}
                </label>
              </div>
            </div>
            <DatePicker
              selected={startDate}
              placeholderText="Выбрать дату"
              onChange={(date) => {
                setStartDate(date);
                localStorage.setItem("startDate", Date.parse(date));
              }}
            />
          </div>
          <div className={style.input}>
            <div className={style.field}>
              <div>
                <img src={search2} alt="To" />
                <label onClick={() => setIsCityOpen(true)}>
                  {locationNameTo.length === 0 ? "Куда" : locationNameTo}
                </label>
              </div>
            </div>
            <DatePicker
              selected={endDate}
              placeholderText="Выбрать дату"
              onChange={(date) => {
                setEndDate(date);
                localStorage.setItem("endDate", Date.parse(date));
              }}
            />
          </div>
        </div>
        <div className={style.input_who}>
          <label onClick={() => setIsPeopleOpen(true)}>Кто поедет</label>
        </div>
        <div className={style.input_who}>
          <div>
            <img src={tree} alt="Отдых" />
            Отдых
          </div>

          <select className={style.holiday}>
            <option value="" selected disabled></option>
            <option value="">Экскурсия</option>
            <option value="">Конные туры</option>
            <option value="">Пляжные туры</option>
            <option value="">Свадебные туры</option>
            <option value="">Необычное туры</option>
            <option value="">Пляжные туры</option>
            <option value="">Свадебные туры</option>
          </select>
        </div>
        <Button btn="secondary">Найти тур</Button>
      </div>
      <CitySelector
        isOpen={isCityOpen}
        setIsCityOpen={setIsCityOpen}
        setLocation={handleCitySelect}
        next={handleClientCount}
      />
      <CitySelector
        isOpen={isCityOpenFrom}
        setIsCityOpen={setIsCityOpenFrom}
        next={handleClientCount}
        setLocation={handleCityFrom}
      />
      <PeopleSelect isPeople={isPeople} setIsPeopleOpen={setIsPeopleOpen} />
      <Outlet />
    </>
  );
};

export default Routes;
