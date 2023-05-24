import React, { useState, useEffect } from "react";

import style from "./Program.module.scss";

const ProgramTest = ({ programList, setProgramList }) => {
  return (
    <div className="add_more-col categ-col shadowed_box">
      <div className="gen_title">Программа лагеря</div>
      {programList.map((pl, plIdx) => {
        return (
          <div className={style.day_card} key={plIdx}>
            <div>
              <div className={style.day_title}>День {pl.day}</div>
              <div className={style.points_box}>
                {pl.points.map((point, pointIdx) => {
                  return (
                    <div className={style.point_card} key={pointIdx}>
                      <div className="input_title">Пункт {pointIdx + 1}</div>
                      <div className="input_row">
                        <select
                          className="primary-input"
                          value={point?.time}
                          onChange={(e) => {
                            setProgramList((prevProgramList) => {
                              return prevProgramList.map((program, index) => {
                                if (index !== plIdx) {
                                  return program;
                                }

                                const updatedPoints = [...program.points];
                                updatedPoints[pointIdx] = {
                                  ...updatedPoints[pointIdx],
                                  time: e.target.value,
                                };

                                return { ...program, points: updatedPoints };
                              });
                            });
                          }}
                        >
                          <option value="" disabled>
                            Время
                          </option>
                          <option value="07:00">07:00</option>
                          <option value="08:00">08:00</option>
                          <option value="09:00">09:00</option>
                          <option value="10:00">10:00</option>
                        </select>
                        <input
                          value={point?.pointName}
                          placeholder="Название пункта"
                          className="primary-input"
                          onChange={(e) => {
                            setProgramList((prevProgramList) => {
                              return prevProgramList.map((program, index) => {
                                if (index !== plIdx) {
                                  return program;
                                }

                                const updatedPoints = [...program.points];
                                updatedPoints[pointIdx] = {
                                  ...updatedPoints[pointIdx],
                                  pointName: e.target.value,
                                };

                                return { ...program, points: updatedPoints };
                              });
                            });
                          }}
                        />
                      </div>
                      <div className="input_row">
                        <textarea
                          className="primary-input"
                          cols="30"
                          rows="5"
                          placeholder="Описание"
                          value={point?.pointDescription}
                          onChange={(e) => {
                            setProgramList((prevProgramList) => {
                              return prevProgramList.map((program, index) => {
                                if (index !== plIdx) {
                                  return program;
                                }

                                const updatedPoints = [...program.points];
                                updatedPoints[pointIdx] = {
                                  ...updatedPoints[pointIdx],
                                  pointDescription: e.target.value,
                                };

                                return { ...program, points: updatedPoints };
                              });
                            });
                          }}
                        />
                      </div>
                      <button
                        onClick={() => {
                          setProgramList((prevProgramList) => {
                            return prevProgramList.map((program, index) => {
                              if (index !== plIdx) {
                                return program;
                              }

                              const updatedPoints = [
                                ...program.points,
                                { time: "", exercise: "", sets: "", reps: "" },
                              ];

                              return { ...program, points: updatedPoints };
                            });
                          });
                        }}
                        className={`primary-btn clear ${style.add_point_btn}`}
                      >
                        Добавить пункт
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        );
      })}
      <button
        onClick={() => {
          setProgramList([
            ...programList,
            {
              day: programList.length + 1,
              points: [{ time: "", exercise: "", sets: "", reps: "" }],
            },
          ]);
        }}
        className="primary-btn"
      >
        Добавить день
      </button>
    </div>
  );
};

export default ProgramTest;
