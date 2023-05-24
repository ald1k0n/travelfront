import React from "react";

import style from "./Layout.module.scss";

export const Footer = () => {
  const isHome = location.pathname === "/";

  return <>{!isHome && <div className={style.footer_container}>Footer</div>}</>;
};
