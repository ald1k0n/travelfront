import React from "react";
import { Link } from "react-router-dom";

import tree from "../../../assets/tree.png";
import person from "../../../assets/person.svg";

import style from "./Layout.module.scss";

const Dropdown = () => {
  return (
    <nav className={style.dropdown_container}>
      <div className={style.dropdown}>
        <div className={style.dropdown_links}>
          <Link className={style.dropdown_link} to="/">
            <img src={tree} alt="tree" />
            Главная страница
          </Link>
          <div className={style.dropdown_list}>
            <ul>
              <li>
                <Link to="/tours">Туры</Link>
              </li>
              <li>
                <Link to="">1-3 дневные туры</Link>
              </li>
              <li>
                <Link to="/">Санатории </Link>
              </li>
              <li>
                <Link to="/hotel">Отели</Link>
              </li>
              <li>
                <Link to="/">Лагери</Link>
              </li>
              <li>
                <Link to="/">Экскурсия</Link>
              </li>
            </ul>
          </div>
          <Link className={style.dropdown_link} to="/">
            <img src={person} className={style.person} alt="tree" />
            Корпоративные туры
          </Link>
          <Link className={style.dropdown_link} to="/">
            <img src={person} className={style.person} alt="tree" />О нас
          </Link>
          <Link className={style.dropdown_link} to="/">
            <img src={person} className={style.person} alt="tree" />
            Сотрудничество
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Dropdown;
