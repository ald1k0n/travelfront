import { useState, lazy } from "react";
import DatePicker from "react-datepicker";

import style from "./Home.module.scss";
import search1 from "../../../assets/search/search1.svg";
import search2 from "../../../assets/search/search2.svg";
import tree from "../../../assets/tags/tag4.svg";

import { tags } from "../../../components/SearchPanel/tags";
import PeopleSelect from "../../../components/SearchPanel/PeopleSelect";
import { Button } from "../../components/Layout";
import Tour from "../../components/Tour/TourCard";
import Hotel from "../../components/Hotel/Hotel";
import Hot from "../../components/Hot/Hot";
import Routes from "./Routes";
import { CitySelector } from "../../components/CitySelector/CitySelector";

const MobileHome = () => {
  const [searchTag, setSearchTag] = useState("Hotel");
  const [isActive, setIsActive] = useState(4);
  const [startDate, setStartDate] = useState(
    localStorage.getItem("startDate") !== "NaN"
      ? new Date(+JSON.parse(localStorage.getItem("startDate")))
      : new Date()
  );
  const [endDate, setEndDate] = useState(
    localStorage.getItem("endDate") !== "NaN"
      ? new Date(+JSON.parse(localStorage.getItem("endDate")))
      : new Date(Date.now() + 3600 * 1000 * 24)
  );

  const [from, setFrom] = useState(
    localStorage.getItem("from") ? localStorage.getItem("from") : ""
  );
  const [to, setTo] = useState(
    localStorage.getItem("to") ? localStorage.getItem("to") : ""
  );

  const handleFromChange = (e) => {
    setFrom(e.target.value);
    localStorage.setItem("from", e.target.value);
  };

  const handleToChange = (e) => {
    setTo(e.target.value);
    localStorage.setItem("to", e.target.value);
  };
  const handlePeopleSelect = (num) => {
    console.log(num);
  };

  return (
    <>
      <div className={style.container}>
        <div className={style.preview} />
        <Routes
          setEndDate={setEndDate}
          setIsActive={setIsActive}
          setSearchTag={setSearchTag}
          setStartDate={setStartDate}
          from={from}
          to={to}
          handleFromChange={handleFromChange}
          startDate={startDate}
          handleToChange={handleToChange}
          endDate={endDate}
          handlePeopleSelect={handlePeopleSelect}
        />
      </div>
      <CitySelector />
    </>
  );
};
export default MobileHome;
