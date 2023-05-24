import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getExcursions, reset } from "../../features/excursion/excursionSlice";
import {
  addClientExcursion,
  removeClientExcursion,
  addExcSum,
  removeExcSum,
} from "../../features/clientSlice";
import excphoto from "../../assets/exc.png";

import "./Excursions.scss";

const Excursions = ({ locationId, refetch }) => {
  const dispatch = useDispatch();

  const { excursions, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.excursions
  );

  const { clientExcursions, excSum } = useSelector((state) => state.client);

  useEffect(() => {
    if (isError) {
      console.log(message);
    }
    dispatch(getExcursions(locationId));
    dispatch(reset());
  }, [locationId, dispatch]);

  const handleAddExcursion = (excId, excPrice) => {
    dispatch(addClientExcursion(excId));
    dispatch(addExcSum(excPrice));
    refetch();
  };
  const handleRemoveExcursion = (excId, excPrice) => {
    dispatch(removeClientExcursion(excId));
    dispatch(removeExcSum(excPrice));
    refetch();
  };

  return (
    <>
      {excursions && excursions.length > 0 && (
        <div className="side_exc-box shadowed_box small">
          <div className="body_title-box">
            <div className="body_title">
              Дополните свой отдых яркими впечатлениями!
            </div>
            <div className="body_title-text">
              Просто выберите экскурсию, которую хотели бы добавить с свой тур и
              мы включим его в стоимость
            </div>
          </div>
          <div className="exc_box">
            {excursions &&
              excursions?.map((exc, index) => {
                return (
                  <div
                    key={exc._id}
                    className={`exc_card ${
                      clientExcursions.includes(exc._id) ? "active" : ""
                    }`}
                    onClick={() => {
                      clientExcursions.includes(exc._id)
                        ? handleRemoveExcursion(exc._id, exc.price)
                        : handleAddExcursion(exc._id, exc.price);
                    }}
                  >
                    <div className="exc_top row">
                      <div className="exc_img">
                        <img src={excphoto} alt="" />
                      </div>
                      <div className="exc_content">
                        <div className="exc_title">{exc.name}</div>
                        <div className="exc_desc">{exc.description}</div>
                        <button className="exc_more-btn">Подробнее</button>
                      </div>
                    </div>
                    <div className="exc_bot"></div>
                  </div>
                );
              })}
          </div>
        </div>
      )}
    </>
  );
};

export default Excursions;
