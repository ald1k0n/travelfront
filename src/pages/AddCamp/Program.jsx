import React, { useState, useEffect } from "react";

const Program = ({ addedServices, setAddedServices, style }) => {
  const [program, setProgram] = useState([]);

  useEffect(() => {
    if (addedServices && addedServices.length > 0) {
      setProgram(addedServices);
    }
  }, [addedServices]);

  console.log(JSON.stringify(program), "program");
  return (
    <>
      {program.map((serv, idx) => (
        <div className="input_box" key={idx}>
          <div className={style.days}>День {idx + 1}</div>
          {serv.days.map((points, pointIdx) => {
            const point = serv?.days[pointIdx]?.points;
            const pointKey = `day-${idx + 1}-point-${pointIdx + 1}`;

            const handleTimeChange = (e) => {
              const newProgram = program.map((serv, servIdx) => {
                if (servIdx === idx) {
                  const newDays = serv?.days?.map((points, pointIdx) => {
                    if (pointIdx === idx) {
                      const newPoints = {
                        ...points?.points,
                        time: e.target.value,
                      };
                      return { points: newPoints };
                    }
                    return points;
                  });
                  return { days: newDays };
                }
                return serv;
              });
              setProgram(newProgram);
            };

            const handleNameChange = (e) => {
              const newProgram = addedServices.map((serv, servIdx) => {
                if (servIdx === idx) {
                  const newDays = serv.days.map((day) => {
                    const newPoints = day?.points?.map((point, pointIdx) => {
                      if (pointIdx === idx) {
                        return {
                          ...point,
                          pointName: e.target.value,
                        };
                      }
                      return point;
                    });
                    return { ...day, points: newPoints };
                  });
                  return { ...serv, days: newDays };
                }
                return serv;
              });
              setProgram(newProgram);
            };

            const handleDescriptionChange = (e) => {
              const newProgram = addedServices.map((serv, servIdx) => {
                if (servIdx === idx) {
                  const newDays = serv.days.map((day) => {
                    const newPoints = day?.points?.map((point, pointIdx) => {
                      if (pointIdx === idx) {
                        return {
                          ...point,
                          pointDescription: e.target.value,
                        };
                      }
                      return point;
                    });
                    return { ...day, points: newPoints };
                  });
                  return { ...serv, days: newDays };
                }
                return serv;
              });
              setProgram(newProgram);
            };

            return (
              <React.Fragment key={pointKey}>
                <div className="input_title">Пункт {pointIdx + 1}</div>
                <div className="input_row">
                  <select
                    className="primary-input"
                    value={point?.time}
                    onChange={handleTimeChange}
                    key={`${pointKey}-time`}
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
                    onChange={handleNameChange}
                    key={`${pointKey}-name`}
                  />
                </div>
                <div className="input_row">
                  <textarea
                    className="primary-input"
                    cols="30"
                    rows="5"
                    placeholder="Описание"
                    value={point?.pointDescription}
                    onChange={handleDescriptionChange}
                    key={`${pointKey}-description`}
                  />
                </div>
                <button
                  className={`add_service-btn ${style.bordered_btn}`}
                  onClick={() => {
                    setProgram((prev) => {
                      const newProgram = [...prev];
                      newProgram[idx] = {
                        ...newProgram[idx],
                        days: [
                          ...newProgram[idx].days,
                          {
                            points: {
                              day: idx + 1,
                              time: "",
                              pointName: "",
                              pointDescription: "",
                            },
                          },
                        ],
                      };
                      console.log(newProgram);
                      return newProgram;
                    });
                  }}
                >
                  Добавить пункт
                </button>
              </React.Fragment>
            );
          })}
        </div>
      ))}
    </>
  );
};

export default Program;
