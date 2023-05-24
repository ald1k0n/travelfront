import React from "react";

import styles from "./BodyTitle.module.scss";

const BodyTitle = ({ title, text }) => {
  return (
    <div className="body_title-box">
      <div className="body_title">{title}</div>
      {text ? <div className="body_title-text">{text}</div> : null}
    </div>
  );
};

export default BodyTitle;
