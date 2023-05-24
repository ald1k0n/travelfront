import React from "react";
import style from "./Button.module.scss";

const styles = {
  primary: style.btn_primary,
  secondary: style.btn_orange,
  bordered: style.btn_bordered,
};

export const Button = (props) => {
  return (
    <button className={styles[props.btn]} {...props}>
      {props.children}
    </button>
  );
};
