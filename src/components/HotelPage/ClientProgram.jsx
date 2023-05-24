import React, { useState } from "react";
import pti4ka from "../../assets/hotel/pti4ka.svg";

const ClientProgram = ({ points }) => {
  const [programIdx, setProgramIdx] = useState(null);
  console.log(points, "points");
  return (
    <>
      {points?.map((point, idx) => (
        <div className="program-tour">
          <div
            onClick={() => {
              if (programIdx === idx) {
                setProgramIdx(null);
              } else {
                setProgramIdx(idx);
              }
            }}
            style={
              programIdx === idx
                ? {
                    borderRadius: "0px",
                    borderTopLeftRadius: "16px",
                    borderTopRightRadius: "16px",
                    boxShadow: "none",
                  }
                : {}
            }
            className="tour-program"
          >
            <div className="tour_day">{idx + 1} день</div>
            <div className="tour_expand">
              <img
                src={pti4ka}
                alt=""
                className={`tour-arrow ${programIdx === idx ? "rotate" : ""}`}
              />
            </div>
          </div>
          {programIdx === idx && (
            <>
              {point &&
                point.points &&
                point.points.map((info, infoIdx) => (
                  <div
                    style={
                      point.points.length - 1 === infoIdx
                        ? {
                            borderBottomLeftRadius: "16px",
                            borderBottomRightRadius: "16px",
                          }
                        : {
                            borderRadius: "0px",
                            boxShadow: "none",
                          }
                    }
                    className="tour_info"
                  >
                    <div
                      className="tour_info-time"
                      style={
                        point.points && point.points.length - 1 === infoIdx
                          ? {
                              boxShadow: "none",
                            }
                          : {}
                      }
                    >
                      {info?.time}
                    </div>
                    <div
                      className="tour_info-title"
                      style={
                        point.points && point.points.length - 1 === infoIdx
                          ? {
                              boxShadow: "none",
                            }
                          : {}
                      }
                    >
                      {info?.pointName}
                    </div>
                    <div
                      className="tour_info-desc"
                      style={
                        point.points && point.points.length - 1 === infoIdx
                          ? {
                              boxShadow: "none",
                            }
                          : {}
                      }
                    >
                      {info?.pointDescription}
                    </div>
                  </div>
                ))}
            </>
          )}
        </div>
      ))}
    </>
  );
};

export default ClientProgram;
