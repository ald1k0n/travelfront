import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addCampPeriods,
  addPeriods,
  addSanatoriumPeriods,
  deleteCampPeriod,
  deleteHotelPeriod,
} from "../../features/periods/periodSlice";
import {
  addHotel,
  updateHotel,
  updateHotelPeriods,
} from "../../features/hotel/hotelSlice";
import { getSingleSanatorium } from "../../features/sanatorium/sanatoriumSlice";
import Section from "../../components/Section";
import { addAge, deleteAge } from "../../features/camps/campSlice";

const Ages = ({ ages, setAges, refetch, campId }) => {
  // console.log(hotelId, "hotel ids");
  const dispatch = useDispatch();
  // console.log(periods);

  const addNewAges = (ageData) => {
    dispatch(addAge(ageData)).then(() => refetch());
  };

  // console.log({ ages: ages, campId: campId }, "ages");

  return (
    <Section section="periods_section" wrapper="periods_wrapper ver">
      <div className="periods_top">
        <div className="gen_title">Возраста</div>
        <div className="periods_btns">
          <button
            className="primary-btn black clear"
            onClick={() => {
              setAges([
                ...ages,
                {
                  minAge: null,
                  maxAge: null,
                },
              ]);
            }}
          >
            + Новый период
          </button>
          <button
            className="primary-btn black"
            onClick={() => {
              addNewAges({ ages: ages, campId: campId });
            }}
          >
            Сохранить
          </button>
        </div>
      </div>
      <div className="periods_box">
        {ages && ages.length > 0
          ? ages?.map((age, idx) => {
              const newAges = ages;
              return (
                <div className="period_card shadowed_box" key={age._id || idx}>
                  <div className="period_title">
                    {`Возраст ${idx + 1}`}
                    <button
                      onClick={() => {
                        dispatch(
                          deleteAge({ ageId: age._id, campId: campId })
                        ).then(() => refetch());
                        console.log({ ageId: age._id });
                      }}
                    >
                      X
                    </button>
                  </div>
                  <div className="inputs_row">
                    <div className="input_col ages">
                      <span>Минимальный</span>
                      <div className="inputs_content">
                        <input
                          type="number"
                          min={1}
                          max={31}
                          placeholder="min age"
                          value={age.minAge}
                          inputMode="numeric"
                          onChange={(e) => {
                            newAges[idx].minAge = +e.target.value;
                            setAges(newAges);
                          }}
                        />
                      </div>
                    </div>
                    <div className="input_col ages">
                      <span>Максимальный</span>
                      <div className="inputs_content">
                        <input
                          type="number"
                          min={1}
                          max={31}
                          inputMode="numeric"
                          placeholder="max age"
                          value={age.maxAge}
                          onChange={(e) => {
                            newAges[idx].maxAge = +e.target.value;
                            setAges(newAges);
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

export default Ages;
