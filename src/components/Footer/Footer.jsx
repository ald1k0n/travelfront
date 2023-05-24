import React from "react";

import "./Footer.scss";

import inst from "../../assets/insta.svg";
import fb from "../../assets/facebook.svg";
import wa from "../../assets/whatsapp.svg";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer>
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
                <li>
                  <div className="media_box">
                    <a href="" className="media_link">
                      <img src={inst} alt="" />
                    </a>
                    <a href="" className="media_link">
                      <img src={fb} alt="" />
                    </a>
                    <a href="" className="media_link">
                      <img src={wa} alt="" />
                    </a>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
