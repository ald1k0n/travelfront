import React from "react";
import style from "./Input.module.scss";

export const Input = (props) => {
  return (
    <>
      {props.label && <label htmlFor={props.id}>{props.label}</label>}
      <input id={props.id} {...props} className={style.primary_input} />
    </>
  );
};

export default Input;
