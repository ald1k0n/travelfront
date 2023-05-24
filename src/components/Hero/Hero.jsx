import React, { useState } from "react";

import SearchPanel from "../SearchPanel/SearchPanel";

import logo from "../../assets/hero/Logo.png";

import "./Hero.scss";

const Hero = ({ changeAmount, changeDaysAmount, changeDate, handleSearch }) => {
  return (
    <section className="hero_section">
      <div className="container hero">
        <div className="wrapper hero_wrapper ver">
          <img src={logo} alt="" className="hero_img" />
          <SearchPanel
            changeAmount={changeAmount}
            changeDaysAmount={changeDaysAmount}
            changeDate={changeDate}
            handleSearch={handleSearch}
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
