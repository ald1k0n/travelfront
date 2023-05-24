import React from "react";

export const AdminHead = (props) => {
  return (
    <div className="header_bot">
      <div className="container">
        <div className="header_bot-wrapper wrapper">
          <div className="header_bot-left wrapper">
            <div className="header_bot-left-text">{props.text}</div>
          </div>
          <div className="header_bot-right wrapper">
            <button className="cancel-btn" onClick={props.headBack}>
              Отмена
            </button>
            <button className="primary-btn white" onClick={props.onClick}>
              Сохранить изменения
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
