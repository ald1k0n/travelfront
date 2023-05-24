import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addCampPeriods,
  addPeriods,
  addSanatoriumPeriods,
  addTourPeriods,
  deleteCampPeriod,
  deleteHotelPeriod,
  deleteTourPeriod,
} from "../../features/periods/periodSlice";
import {
  addHotel,
  updateHotel,
  updateHotelPeriods,
} from "../../features/hotel/hotelSlice";
import { getSingleSanatorium } from "../../features/sanatorium/sanatoriumSlice";
import Section from "../../components/Section";
import dateConfig from "../../components/DataConfig";

const Periods = ({
  periods,
  setPeriods,
  updateHotelData,
  hotelId,
  mode,
  refetch,
}) => {
  // console.log(hotelId, "hotel ids");
  const dispatch = useDispatch();
  // console.log(periods);

  const addNewPeriods = () => {
    switch (mode) {
      case "hotel":
        dispatch(addPeriods({ periods: periods })).then(() => {
          updateHotelData();
          console.log("updated hotel periods");
        });
        break;
      case "sanatorium":
        dispatch(addSanatoriumPeriods({ periods: periods })).then(() => {
          updateHotelData();
          console.log("updated sanatorium periods");
        });
        break;
      case "camp":
        dispatch(addCampPeriods({ periods: periods })).then(() => {
          refetch();
          console.log("updated camp periods");
        });
        break;
      case "tour":
        dispatch(addTourPeriods({ periods: periods })).then(() => {
          refetch();
          console.log("updated tour periods");
        });
        break;
      default:
        dispatch(addPeriods({ periods: periods })).then(() => {
          updateHotelData();
          console.log("updated hotel periods");
        });
        break;
    }
  };

  const deletePeriod = (periodId) => {
    switch (mode) {
      case "hotel":
        dispatch(deleteHotelPeriod(periodId)).then(() => {
          updateHotelData();
          console.log("updated hotel periods");
        });
        break;
      case "sanatorium":
        dispatch(deleteSanatoriumPeriod(periodId)).then(() => {
          updateHotelData();
          console.log("updated sanatorium periods");
        });
        break;
      case "camp":
        dispatch(deleteCampPeriod(periodId));
        break;
      case "tour":
        dispatch(deleteTourPeriod(periodId)).then(() => refetch());
        break;
      default:
        dispatch(deleteHotelPeriod(periodId)).then(() => {
          updateHotelData();
          console.log("updated camp periods");
        });
        break;
    }
  };

  return (
    <Section section="periods_section" wrapper="periods_wrapper ver">
      <div className="periods_top">
        <div className="gen_title">Периоды</div>
        <div className="periods_btns">
          <button
            className="primary-btn black clear"
            onClick={() => {
              setPeriods([
                ...periods,
                {
                  startDay: null,
                  startMonth: null,
                  endDay: null,
                  endMonth: null,
                  [mode === "hotel"
                    ? "hotel"
                    : mode === "sanatorium"
                    ? "sanatorium"
                    : mode === "tour"
                    ? "tour"
                    : "camp"]: hotelId,
                },
              ]);
            }}
          >
            + Новый период
          </button>
          <button
            className="primary-btn black"
            onClick={() => {
              addNewPeriods();
            }}
          >
            Сохранить
          </button>
        </div>
      </div>
      <div className="periods_box">
        {periods && periods.length > 0
          ? periods?.map((per, idx) => {
              const newPeriods = periods;
              return (
                <div className="period_card shadowed_box" key={per._id || idx}>
                  <div className="period_title">
                    {`Период ${idx + 1}`}
                    <button
                      onClick={() =>
                        deletePeriod(per._id).then(() => refetch())
                      }
                    >
                      X
                    </button>
                  </div>
                  <div className="inputs_row">
                    <div className="input_col">
                      <span>Начало</span>
                      <div className="inputs_content">
                        <input
                          type="number"
                          min={1}
                          max={31}
                          placeholder="d"
                          value={per.startDay}
                          inputMode="numeric"
                          onChange={(e) => {
                            newPeriods[idx].startDay = e.target.value;
                            setPeriods(newPeriods);
                          }}
                        />
                        /
                        <input
                          type="number"
                          min={1}
                          max={31}
                          inputMode="numeric"
                          placeholder="m"
                          value={per.startMonth}
                          onChange={(e) => {
                            newPeriods[idx].startMonth = e.target.value;
                            setPeriods(newPeriods);
                          }}
                        />
                      </div>
                    </div>
                    <div className="input_col">
                      <span>Конец</span>
                      <div className="inputs_content">
                        <input
                          type="number"
                          min={1}
                          max={12}
                          placeholder="d"
                          value={per.endDay}
                          onChange={(e) => {
                            newPeriods[idx].endDay = e.target.value;
                            setPeriods(newPeriods);
                          }}
                        />
                        /
                        <input
                          type="number"
                          min={1}
                          max={12}
                          value={per.endMonth}
                          placeholder="m"
                          onChange={(e) => {
                            newPeriods[idx].endMonth = e.target.value;
                            setPeriods(newPeriods);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          : null}
      </div>
    </Section>
  );
};

export default Periods;
