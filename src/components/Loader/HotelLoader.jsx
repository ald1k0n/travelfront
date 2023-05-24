import React from "react";

import styles from "./Loader.module.scss";

import Loader from "../../components/Loader";

const HotelLoader = () => {
  return (
    <div className={styles.hotel_loader}>
      <Loader />
    </div>
  );
};

export default HotelLoader;
