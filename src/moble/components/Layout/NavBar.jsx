import { useState } from "react";

import style from "./Layout.module.scss";
import loupe from "../../../assets/loupe.svg";
import burger from "../../../assets/burger.svg";
import Dropdown from "./Dropdown";
import krest from "../../../assets/kres.svg";
import Searchbar from "./Searchbar";

export const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearch, setIsSearch] = useState(false);

  return (
    <>
      <nav className={style.nav_container}>
        <div
          className={style.nav_burger}
          onClick={() => {
            if (isSearch) {
              setIsSearch(false);
            }
            setIsOpen(!isOpen);
          }}
        >
          <img src={!isOpen ? burger : krest} alt="Menu Toggle" />
        </div>
        <div className={style.nav_title}>Uly Dala</div>
        <div
          className={style.nav_search}
          onClick={() => {
            if (isOpen) {
              setIsOpen(false);
            }
            setIsSearch(!isSearch);
          }}
        >
          <img src={!isSearch ? loupe : krest} alt="Search" />
        </div>
      </nav>
      {isOpen && <Dropdown />}
      {isSearch && <Searchbar />}
    </>
  );
};
