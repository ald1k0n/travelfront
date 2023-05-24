import React, { useState } from "react";
import pti4ka from "../../assets/hotel/pti4ka.svg";

import style from "./ClientProgram.module.scss";

const ClientProgramTest = ({ programList }) => {
  const [programIdx, setProgramIdx] = useState(null);
  return (
    <div className={style.program_box}>
      {programList?.map((pl, plIdx) => (
        <div
          className={`${style.program_day_box} ${
            plIdx !== programIdx ? style.close : ""
          }`}
          onClick={() => {
            plIdx === programIdx ? setProgramIdx(null) : setProgramIdx(plIdx);
          }}
        >
          <div className={style.day_title}>
            <span>{pl.day} день</span>
            <button className={style.bird_btn}>
              <svg
                width="14"
                height="7"
                viewBox="0 0 14 7"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12.2802 5.53245L7.93355 1.18578C7.42022 0.672448 6.58022 0.672448 6.06688 1.18578L1.72021 5.53245"
                  stroke="#292D32"
                  stroke-width="1.5"
                  stroke-miterlimit="10"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </button>
          </div>
          <div className={style.points_box}>
            {pl?.points?.map((point, pointIdx) => {
              return (
                <div className={style.day_point}>
                  <div className={style.point_time}>{point.time}</div>
                  <div className={style.point_title}>{point.pointName}</div>
                  <div className={style.point_desc}>
                    {point.pointDescription}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ClientProgramTest;
