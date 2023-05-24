import React, { useState } from "react";
import { useGetLocationByLetterQuery } from "../../../features/services/base.service";

import style from "./CitySelector.module.scss";

export const CitySelector = ({ setIsCityOpen, setLocation, isOpen, next }) => {
  const [query, setQuery] = useState("");
  const { data, isLoading } = useGetLocationByLetterQuery(query);
  if (isLoading) return <div>Loading...</div>;

  return (
    <>
      {isOpen && (
        <div className={style.container}>
          <div className={style.top}>
            <div
              onClick={() => setIsCityOpen(false)}
              className={style.close_btn}
            >
              X
            </div>
            <div className={style.next} onClick={() => next()}>
              Количество туристов <span className={style.arrow}>{`>`}</span>
            </div>
          </div>
          <div className={style.container_wrapper}>
            <div className={style.container_wrapper_title}>Выберите город</div>
            <input
              type="search"
              className={style.input}
              placeholder="Найти город"
              onChange={(e) => setQuery(e.target.value)}
            />
            <div className={style.location}>Весь Казахстан</div>

            <div className={style.list}>
              {data.map((location) => (
                <div
                  key={location._id}
                  onClick={() =>
                    setLocation(location._id, location.locationName)
                  }
                  className={style.list_item}
                >
                  {location.locationName}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
