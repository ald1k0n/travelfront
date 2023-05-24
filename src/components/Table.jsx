import React, { useState, useEffect, useMemo } from "react";

// @type data: Array

import style from "./Table.module.scss";
import calendar from "../assets/tableCalendar.svg";

const Table = ({ data, isUploading }) => {
  const format = new Intl.NumberFormat("ru-RU", {
    style: "decimal",
  });
  const [prices, setPrices] = useState([]);

  useEffect(() => {
    let p = [];
    if (data) {
      data &&
        data.forEach((price) => {
          p.push(price.prices);
        });
    }
    setPrices(p.flat());
  }, [data]);

  return (
    <div className={style.container}>
      <table className={style.info}>
        <tr className={style.tr_th}>
          <th className={style.tr_th}>
            <img src={calendar} alt="calendar" /> <span>Номера и периоды</span>
          </th>
        </tr>
        <tr className={style.tr_th}>
          <th className={style.tr_th}>Стандарт одноместный</th>
        </tr>
        <tr className={style.tr_th}>
          <th className={style.tr_th}>Эконом 1 комн. 2-х мест.</th>
        </tr>
        <tr className={style.tr_th}>
          <th className={style.tr_th}>Эконом 1 комн. 3-х мест.</th>
        </tr>
        <tr className={style.tr_th}>
          <th className={style.tr_th}>Эконом 1 комн. 4-х мест.</th>
        </tr>
        <tr className={style.tr_th}>
          <th className={style.tr_th}>Стандарт 1 комн. 2-х мест.</th>
        </tr>
        <tr className={style.tr_th}>
          <th className={style.tr_th}>Стандарт 1 комн. 3-х мест.</th>
        </tr>
        <tr className={style.tr_th}>
          <th className={style.tr_th}>Комфорт 1 комн. 3-х мест.</th>
        </tr>
        <tr className={style.tr_th}>
          <th className={style.tr_th}>Люкс</th>
        </tr>
      </table>
      {/* Period */}

      {isUploading ? (
        <div className={style.noData}>
          <span class={style.loader}></span>
        </div>
      ) : (
        <>
          {prices.length > 0 ? (
            prices.map((price) => (
              <table className={style.period}>
                <tr className={style.tr_th}>
                  <th className={style.tr_th}>
                    {price.startDay}.{price.startMonth} - {price.endDay}.
                    {price.endMonth}
                  </th>
                </tr>
                <tr className={style.tr_th}>
                  <th className={style.tr_th}>
                    {format.format(price.stanOnePlace)}
                  </th>
                </tr>
                <tr className={style.tr_th}>
                  <th className={style.tr_th}>
                    {format.format(price.ecoOneRoomTwoPlace)}
                  </th>
                </tr>
                <tr className={style.tr_th}>
                  <th className={style.tr_th}>
                    {format.format(price.ecoOneRoomThreePlace)}
                  </th>
                </tr>
                <tr className={style.tr_th}>
                  <th className={style.tr_th}>
                    {format.format(price.ecoOneRoomFourPlace)}
                  </th>
                </tr>
                <tr className={style.tr_th}>
                  <th className={style.tr_th}>
                    {format.format(price.stanOneRoomTwoPlace)}
                  </th>
                </tr>
                <tr className={style.tr_th}>
                  <th className={style.tr_th}>
                    {format.format(price.stanOneRoomThreePlace)}
                  </th>
                </tr>
                <tr className={style.tr_th}>
                  <th className={style.tr_th}>
                    {format.format(price.comfOneRoomThreePlace)}
                  </th>
                </tr>
                <tr className={style.tr_th}>
                  <th className={style.tr_th}>{format.format(price.Luxe)}</th>
                </tr>
              </table>
            ))
          ) : (
            <div className={style.noData}>Нет данных</div>
          )}
        </>
      )}
    </div>
  );
};

export default Table;
