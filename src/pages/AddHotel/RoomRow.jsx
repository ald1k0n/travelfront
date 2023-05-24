import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { updateRoom } from "../../features/room/roomSlice";
import { Link } from "react-router-dom";

const RoomRow = ({
  room,
  handlePriceChange,
  periodPrices,
  prices,
  roomMode,
  buttonRef,
}) => {
  const dispatch = useDispatch();

  const oldPeriodPrices = periodPrices;

  const [newPeriodPrices, setNewPeriodPrices] = useState(periodPrices);

  useEffect(() => {
    setNewPeriodPrices(periodPrices);
  }, [periodPrices]);

  const [isChanged, setIsChanged] = useState();
  useEffect(() => {
    if (
      JSON.stringify(newPeriodPrices?.map((el) => el.roomPrice)) !==
      JSON.stringify(oldPeriodPrices?.map((el) => el.roomPrice))
    )
      setIsChanged(true);
  }, [newPeriodPrices, oldPeriodPrices]);

  // console.log(
  //   JSON.stringify(newPeriodPrices?.map((el) => el.roomPrice)),
  //   JSON.stringify(oldPeriodPrices.map((el) => el.roomPrice)),
  //   "change"
  // );

  return (
    <>
      {room ? (
        <tr key={room._id} style={{ margin: "5px" }}>
          <td className="first_col">
            <Link to={`/dashboard/room/${room?._id}`}>{room?.roomName} </Link>

            {room._id && isChanged ? (
              <button
                className="price-btn"
                ref={buttonRef}
                onClick={() => {
                  dispatch(
                    updateRoom({
                      _id: room._id,
                      periodPrices: newPeriodPrices,
                    })
                  );
                }}
              >
                <svg
                  width="11"
                  height="8"
                  viewBox="0 0 11 8"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1 3.83L3.83 6.66L9.5 1"
                    stroke="#2569D7"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </button>
            ) : (
              <button className="price-btn transparent"></button>
            )}
          </td>
          {newPeriodPrices &&
            newPeriodPrices?.map((period, idx) => {
              return (
                <td key={period._id} style={{}}>
                  <input
                    type="number"
                    value={period.roomPrice}
                    onChange={(e) => {
                      const newPrice = +e.target.value;
                      setNewPeriodPrices((prevPrices) =>
                        prevPrices.map((prevPeriod) =>
                          prevPeriod._id === period._id
                            ? { ...prevPeriod, roomPrice: newPrice }
                            : prevPeriod
                        )
                      );
                    }}
                  />
                </td>
              );
            })}
        </tr>
      ) : (
        <>
          <tr key={room._id} style={{ margin: "5px" }}>
            <td className="first_col">
              <Link to={`/dashboard/room/${room?._id}`}>Детский </Link>

              {room._id && isChanged ? (
                <button
                  className="price-btn"
                  ref={buttonRef}
                  onClick={() => {
                    dispatch(
                      updateRoom({
                        _id: room._id,
                        periodPrices: newPeriodPrices,
                      })
                    );
                  }}
                >
                  <svg
                    width="11"
                    height="8"
                    viewBox="0 0 11 8"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1 3.83L3.83 6.66L9.5 1"
                      stroke="#2569D7"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </button>
              ) : (
                <button className="price-btn transparent"></button>
              )}
            </td>
            {newPeriodPrices &&
              newPeriodPrices?.map((period, idx) => {
                return (
                  <td key={period._id} style={{}}>
                    <input
                      type="number"
                      value={period.kidPrice}
                      onChange={(e) => {
                        const newPrice = e.target.value;
                        setNewPeriodPrices((prevPrices) =>
                          prevPrices.map((prevPeriod) =>
                            prevPeriod._id === period._id
                              ? { ...prevPeriod, kidPrice: +newPrice }
                              : prevPeriod
                          )
                        );
                      }}
                    />
                  </td>
                );
              })}
          </tr>
          <tr key={room._id + "q"} style={{ margin: "5px" }}>
            <td className="first_col">
              <Link to={`/dashboard/room/${room?._id}`}>Взрослый </Link>

              {room._id && isChanged ? (
                <button
                  className="price-btn"
                  ref={buttonRef}
                  onClick={() => {
                    dispatch(
                      updateRoom({
                        _id: room._id,
                        periodPrices: newPeriodPrices,
                      })
                    );
                  }}
                >
                  <svg
                    width="11"
                    height="8"
                    viewBox="0 0 11 8"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1 3.83L3.83 6.66L9.5 1"
                      stroke="#2569D7"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </button>
              ) : (
                <button className="price-btn transparent"></button>
              )}
            </td>
            {newPeriodPrices &&
              newPeriodPrices?.map((period, idx) => {
                return (
                  <td key={period._id} style={{}}>
                    <input
                      type="number"
                      value={period.adultPrice}
                      onChange={(e) => {
                        const newPrice = e.target.value;
                        setNewPeriodPrices((prevPrices) =>
                          prevPrices.map((prevPeriod) =>
                            prevPeriod._id === period._id
                              ? { ...prevPeriod, adultPrice: +newPrice }
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
      )}
    </>
  );
};

export default RoomRow;
