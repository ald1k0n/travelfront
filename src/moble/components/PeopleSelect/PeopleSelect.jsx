import React, { useState } from "react";

import style from "./PeopleSelect.module.scss";
import { Button } from "../Layout";

export const PeopleSelect = ({
  handleAdultCount,
  handleKidCount,
  setIsPeopleOpen,
  isPeople,
}) => {
  const [adultCount, setAdultCount] = useState(0);
  const [kidCount, setKidCount] = useState(0);

  const [people, setPeople] = useState({
    adultCount,
    kidCount: null,
  });

  return (
    <>
      {isPeople && (
        <div className={style.container}>
          <div className={style.top}>
            <div
              onClick={() => setIsPeopleOpen(false)}
              className={style.close_btn}
            >
              X
            </div>
            <div className={style.next}>
              Даты <span className={style.arrow}>{`>`}</span>
            </div>
          </div>
          <div className={style.wrapper}>
            <div className={style.wrapper_title}>Количество туристов</div>

            <div className={style.wrapper_body}>
              <div className={style.wrapper_adult}>
                <div>Взрослых</div>
                <div className={style.btn_container}>
                  <button
                    onClick={() => {
                      if (adultCount === 0) {
                        return;
                      }
                      setAdultCount((prev) => prev - 1);
                    }}
                    className={style.btn_count}
                  >
                    -
                  </button>
                  <div className={style.counter}>{adultCount}</div>
                  <button
                    className={style.btn_count}
                    onClick={() => setAdultCount((prev) => prev + 1)}
                  >
                    +
                  </button>
                </div>
              </div>
              {people.kidCount !== null && (
                <div className={style.wrapper_adult}>
                  <div>Детей</div>
                  <div className={style.btn_container}>
                    <button
                      onClick={() => {
                        if (kidCount === 0) {
                          return;
                        }
                        setKidCount((prev) => prev - 1);
                      }}
                      className={style.btn_count}
                    >
                      -
                    </button>
                    <div className={style.counter}>{kidCount}</div>
                    <button
                      className={style.btn_count}
                      onClick={() => setKidCount((prev) => prev + 1)}
                    >
                      +
                    </button>
                  </div>
                </div>
              )}
              <div className={style.info}>
                <div className={style.info_block}>i</div>
                <div className={style.info_title}>
                  Подростки до 14 лет считаются детьми
                </div>
              </div>
              <div className={style.btn_container_people}>
                <Button
                  btn="bordered"
                  onClick={() =>
                    setPeople((prev) => ({
                      ...prev,
                      kidCount,
                    }))
                  }
                >
                  <span>
                    Добавить ребенка
                    <span style={{ marginLeft: "10px" }}>+</span>
                  </span>
                </Button>
                <Button btn="primary">
                  <span style={{ fontWeight: 500 }}>Сохранить</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
