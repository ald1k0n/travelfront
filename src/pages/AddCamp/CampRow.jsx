import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { updateRoom } from "../../features/room/roomSlice";
import { Link } from "react-router-dom";
import { updateAgePriceById } from "../../features/camps/campSlice";

const CampRow = ({ age, campId }) => {
  const dispatch = useDispatch();

  const [newPeriodPrices, setNewPeriodPrices] = useState(age?.periodPrices);

  useEffect(() => {
    setNewPeriodPrices(age?.periodPrices);
  }, [age]);

  return (
    <>
      <tr key={age.minAge} style={{ margin: "5px" }}>
        <td className="first_col">
          Возраст {age?.minAge} - {age?.maxAge}
          <button
            className="price-btn"
            onClick={() => {
              dispatch(
                updateAgePriceById({
                  campId: campId,
                  periodPrices: newPeriodPrices,
                  agePriceId: age._id,
                })
              ).then(() => dispatch(getSingleCamp(campId)));
            }}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"
                stroke="#2569D7"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M7.75 11.9999L10.58 14.8299L16.25 9.16992"
                stroke="#2569D7"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
        </td>
        {newPeriodPrices &&
          newPeriodPrices?.map((period, idx) => {
            return (
              <td key={period._id} style={{}}>
                <input
                  type="number"
                  value={period.campPrice}
                  onChange={(e) => {
                    const newPrice = e.target.value;
                    setNewPeriodPrices((prevPrices) =>
                      prevPrices.map((prevPeriod) =>
                        prevPeriod._id === period._id
                          ? { ...prevPeriod, campPrice: +newPrice }
                          : prevPeriod
                      )
                    );
                  }}
                />
              </td>
            );
          })}
      </tr>
    </>
  );
};

export default CampRow;
