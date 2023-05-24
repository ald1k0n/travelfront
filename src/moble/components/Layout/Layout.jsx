import React from "react";
import { NavBar } from "./NavBar";
import { Footer } from "./Footer";

import style from "./Layout.module.scss";

const MobileLayout = ({ children }) => {
  return (
    <>
      <NavBar />
      <main className={style.layout}>{children}</main>
      <Footer />
    </>
  );
};

export default MobileLayout;
