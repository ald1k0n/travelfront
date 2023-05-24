import React, { useEffect, useState } from "react";
import axios from "axios";
import { NavLink, Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout, reset } from "../../features/auth/authSlice";
import { PatternFormat } from "react-number-format";
import { setCurrentTab } from "../../features/adminSlice";
// import { Link } from "react-router-dom";
import logo from "../../assets/logo.svg";
import phone from "../../assets/phone.svg";
import photo from "../../assets/photo.png";

import media1 from "../../assets/media.svg";
import media2 from "../../assets/media1.svg";
import media3 from "../../assets/media2.svg";

import menu from "../../assets/menu.svg";

import "./Navbar.scss";
import SearchPanel from "../SearchPanel/SearchPanel";
import { API_URL_PROXY } from "../../config/config";

const Navbar = ({ isSearch }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const handleLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/login");
  };
  const handleRegister = () => {
    navigate("/register");
  };

  const handleLogin = () => {
    navigate("/login");
  };

  const [phone, setPhone] = useState();

  const handleSendPhone = () => {
    axios
      .post(`${API_URL_PROXY}/send-phone-email`, { phone: phone })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });

    setPhone("");

    console.log({ phone: phone });
  };

  const [isOpen, setIsOpen] = useState(false);

  const { currentTab } = useSelector((state) => state.admin);

  const tabsContent = [
    { id: 0, label: "Заявки", path: "/dashboard/requests" },
    { id: 1, label: "Отели", path: "/dashboard/hotels" },
    { id: 2, label: "1-3 туры", path: "/dashboard/tours" },
    { id: 3, label: "Лагеря", path: "/dashboard/camps" },
    { id: 4, label: "Санатории", path: "/dashboard/sanatoriums" },
    { id: 5, label: "Менеджеры", path: "/dashboard/managers" },
  ];

  const renderTabs = () => {
    return tabsContent
      .filter((tabs) => {
        if (user?.role !== "Admin") {
          return tabs.id !== 5;
        } else {
          return tabs;
        }
      })
      .map((tab, index) => {
        const isActive = location.pathname === tab.path;
        return (
          <Link
            to={tab.path}
            className={`tab-btn ${isActive ? "active" : ""}`}
            onClick={() => dispatch(setCurrentTab(index))}
            key={tab.label}
          >
            {tab.label}
          </Link>
        );
      });
  };

  const location = useLocation();

  // Check if the current url is "/dashboard"
  const [showMainCta] = useState(
    location.pathname === "/hotels" ||
      location.pathname === "/sanatoriums" ||
      location.pathname === "/camps" ||
      location.pathname === "/tours" ||
      location.pathname === "/add-order"
  );

  const [showSearchPanel] = useState(
    location.pathname.includes("/hotels/") ||
      location.pathname.includes("/sanatoriums/") ||
      location.pathname.includes("/camps/") ||
      location.pathname.includes("/tour/")
  );

  const [showDashNav] = useState(location.pathname.includes("/dashboard"));

  const isDashboard =
    location.pathname === "/dashboard" || location.pathname === "/dashboard/";
  const containsDashboard = location.pathname.includes("/dashboard");
  const isHotels = location.pathname.includes("/hotels/");
  const [isHome] = useState(location.pathname === "/");
  const [isOrder] = useState(location.pathname === "/orders/new-order");

  return (
    <>
      <header>
        <div className="container">
          <div className="nav_wrapper wrapper">
            <div className="nav_left">
              <div className="menu" onClick={() => setIsOpen(!isOpen)}>
                <img src={menu} alt="" />
              </div>
              <img
                onClick={() => {
                  navigate("/");
                }}
                src={logo}
                alt=""
                className="header_logo"
              />
            </div>
            {showDashNav ? (
              <div className="nav_tabs">{renderTabs()}</div>
            ) : null}
            <div className="nav_right">
              <div className="tel_box">
                <img src={phone} alt="" className="phone_icon" />
                <div className="tel_box-content">
                  <div className="tel_box-top">Работаем с 10:00 до 19:00</div>
                  <a href="tel:+77007007700" className="tel_box-link">
                    +7 (700) 700-77-00
                  </a>
                </div>
              </div>
              <div className="social_box">
                <img src={media1} alt="" />
                <img src={media2} alt="" />
                <img src={media3} alt="" />
              </div>
            </div>
          </div>
        </div>
      </header>
      {!showDashNav ? (
        <>
          <div className="header_bot">
            <div className="container">
              <div className="header_bot-wrapper wrapper">
                <div className="header_bot-left wrapper">
                  {showMainCta ? (
                    <>
                      <img src={photo} alt="" className="header_bot-photo" />
                      <div className="header_bot-left-text">
                        Хотите найти тур мечты?
                      </div>
                    </>
                  ) : null}

                  {showSearchPanel && <SearchPanel isUserLook />}
                </div>
                {!showDashNav ? (
                  <form
                    className="header_bot-right wrapper"
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleSendPhone();
                    }}
                  >
                    <PatternFormat
                      className="header_bot-input"
                      placeholder="+7 (...)"
                      format="+7 (###) ### ## ##"
                      allowEmptyFormatting={false}
                      value={phone}
                      mask="."
                      required
                      onChange={(e) => setPhone(e.target.value)}
                    />
                    <button className="primary-btn yellow" type="submit">
                      Заказать звонок
                    </button>
                  </form>
                ) : null}
              </div>
            </div>
          </div>
          {/* <div className="search-panel">
            {isHotels && (
              <SearchPanel
                style={{ marginBottom: "0px !important" }}
                isUserLook
              />
            )}
          </div> */}
        </>
      ) : null}
      <div className={`mobile_menu ${isOpen ? "" : "hidden"}`}>
        <div className="container">
          <div className="footer_wrapper wrapper">
            <div className="footer_col footer_1">
              <div className="footer_title">Туристам</div>
              <div className="footer_box">
                <ul>
                  <li>
                    <Link to="/tours">Туры</Link>
                  </li>
                  <li>
                    <a href="">Корпоративные туры</a>
                  </li>
                  <li>
                    <a href="">Экскурсии </a>
                  </li>
                  <li>
                    <Link to="/camps">Лагеря</Link>
                  </li>
                  <li>
                    <Link to="/sanatoriums">Санатории</Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="footer_col footer_2">
              <div className="footer_title">Компания</div>
              <div className="footer_box">
                <ul>
                  <li>
                    <a href="">О нас</a>
                  </li>
                  <li>
                    <a href="">Сотрудничество</a>
                  </li>
                  <li>
                    <a href="">Политика конфиденциальности </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="footer_col footer_3">
              <div className="footer_title">Контакты</div>
              <div className="footer_box">
                <ul>
                  <li>
                    <a href="tel:+77387477744">+7 738 747 77 44</a>
                  </li>
                  <li>
                    <a href="tel:+77387477744">+7 738 747 77 44</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
