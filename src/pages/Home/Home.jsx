import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import "react-range-slider-input/dist/style.css";
import Hero from "../../components/Hero/Hero";

import "./Home.scss";

import Filter from "../../components/Filter/Filter";
import { API_URL_PROXY } from "../../config/config";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const location = useLocation();
  const [mode, setMode] = useState("");

  useEffect(() => {
    switch (location.pathname) {
      case "/hotels":
        setMode("hotel");
        break;
      case "/sanatoriums":
        setMode("sanatorium");
        break;
      case "/tours":
        setMode("tour");
        break;
      case "/camp":
        setMode("camp");
        break;
      default:
        setMode("hotel");
        break;
    }
  }, [location.pathname]);

  console.log(location.pathname);

  useEffect(() => {
    if (location.pathname === "/") {
      navigate("/hotels", { replace: true });
    }
  }, [location]);

  return (
    <div className="main_page">
      <Hero />
      <section className="all_hotels_section">
        <div className="home_container container">
          <div className="main_wrapper wrapper">
            <div className="main_side">
              <Filter mode={mode} />
            </div>
            <div className="container main_container">
              <Outlet />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
