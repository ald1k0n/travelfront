import React, { useEffect, useState } from "react";
import style from "../AddTour/AddTour.module.scss";

import { AdminHead } from "../../components/Admin";
import "../AddHotel/AddHotel.scss";
import { AdminAddForm } from "../../components/Admin/AdminAddForm";
import addhotel from "../../assets/campPhoto.png";
import { Input } from "../../components/Form";
import Selector from "../AddHotel/Select";
import Selector2 from "../AddHotel/Selector";

import {
  useAddCampMutation,
  useGetHotelServiceQuery,
  useGetLocationQuery,
  useGetFoodQuery,
} from "../../features/services/base.service";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ProgramTest from "./ProgramTest";

const AddCamp = () => {
  const navigate = useNavigate();

  const [foodData, setFoodData] = React.useState([]);
  const [services, setServices] = React.useState([]);

  const [campData, setCampData] = React.useState({
    locationId: null,
    name: "",
    locationFeature: "",
    mapLink: "",
    rating: null,
    hotelName: "",
    hotelDescription: "",
    description: "",
    program: [],
    // food: null,
    // comforts: services,
    kids: {
      forWho: "Для детей",
      minCountInGroup: null,
      maxCountInGroup: null,
      minAgeInGroup: null,
      maxAgeInGroup: null,
    },
    payment: {
      paymentType: "",
      prepayment: null,
    },
  });

  const { data: food = [], isLoading: isLoadFood } = useGetFoodQuery();
  const { data: allLocations = [], isLoading } = useGetLocationQuery();
  const { data: service, isLoading: isLoadService } = useGetHotelServiceQuery();

  const [allServices, setAllServices] = React.useState([]);

  const [addedServices, setAddedServices] = React.useState([
    {
      days: [
        {
          points: { day: null, time: "", pointName: "", pointDescription: "" },
        },
      ],
    },
  ]);

  const [createCamp, { isLoading: addLoad, data: camp }] = useAddCampMutation();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isLoadService) {
      setAllServices([]);
    } else {
      let services = [];
      service.map((serv) => {
        services.push({
          value: serv.hotelServiceName,
          label: serv.hotelServiceName,
          category: serv.category.categoryName,
          servId: serv._id,
        });
      });
      setAllServices(services);
    }
  }, [isLoadService]);

  const handleSubmit = async () => {
    const values = {
      ...campData,
      program: [...addedServices],
      token: user.token,
      // food: foodData.map((food) => food._id),
      // comforts: services.map(({ servId }) => servId),
    };
    console.table(values);
    await createCamp(values);
  };

  console.log(addedServices), "program";

  useEffect(() => {
    if (camp) navigate(`/dashboard/camp/${camp._id}`);
  }, [addLoad]);

  const [programList, setProgramList] = useState([
    {
      day: 1,
      points: [
        {
          time: null,
          pointName: null,
          pointDescription: null,
        },
      ],
    },
  ]);

  if (isLoadFood) {
    return <div> Loading...</div>;
  }
  return (
    <>
      <AdminHead text="Создание лагеря" onClick={handleSubmit} />
      <div className="add_hotel-page page">
        <section className="add_gen-section">
          <div className="add_gen-wrapper wrapper shadow_box">
            <AdminAddForm img={addhotel}>
              <div className="gen_content-box">
                <div className="gen_title">Основное о лагере</div>
                <div className="input_row">
                  <Input
                    placeholder="Название"
                    onChange={(e) =>
                      setCampData({ ...campData, name: e.target.value })
                    }
                  />
                  <Input
                    placeholder="Особенность местоположения"
                    onChange={(e) =>
                      setCampData({
                        ...campData,
                        locationFeature: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="input_row">
                  <select
                    className="primary-input"
                    type="text"
                    placeholder="Местоположение"
                    name="destination"
                    value={campData.locationId}
                    onChange={(e) => {
                      setCampData({
                        ...campData,
                        locationId: e.target.value,
                      });
                    }}
                  >
                    {allLocations.map((location, idx) => {
                      return (
                        <option value={location._id} key={idx}>
                          {location.locationName}
                        </option>
                      );
                    })}
                  </select>

                  <Input
                    placeholder="Ссылка на карту"
                    onChange={(e) =>
                      setCampData({ ...campData, mapLink: e.target.value })
                    }
                  />
                </div>
                <div className="input_row">
                  <Input
                    placeholder="Рейтинг лагеря"
                    onChange={(e) =>
                      setCampData({ ...campData, rating: e.target.value })
                    }
                  />
                </div>
                <div className="input_row">
                  <textarea
                    className="primary-input"
                    cols="30"
                    rows="5"
                    placeholder="Описание"
                    onChange={(e) =>
                      setCampData({
                        ...campData,
                        description: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
            </AdminAddForm>
          </div>
        </section>
        <section className="add_more-section">
          <div className="container">
            <div className="add_more-wrapper wrapper">
              <div className="add_more-col more-col shadowed_box">
                <div className="gen_title">Подробнее</div>
                <div className="input_box">
                  <div className="input_title">Отель</div>
                  <Input
                    placeholder="Название"
                    onChange={(e) => {
                      setCampData((prev) => ({
                        ...prev,
                        hotelName: e.target.value,
                      }));
                    }}
                  />
                  <textarea
                    className="primary-input"
                    cols="30"
                    rows="8"
                    placeholder="Описание"
                    onChange={(e) => {
                      setCampData((prev) => ({
                        ...prev,
                        hotelDescription: e.target.value,
                      }));
                    }}
                  />
                  {/* <div className="input_title">Тип питания</div>

                  <Selector2
                    data={food}
                    onChange={setFoodData}
                    placeholder={`Введите значение`}
                    styles={{
                      control: (baseStyles) => ({
                        ...baseStyles,
                        width: `${550}px`,
                      }),
                    }}
                  />

                  <div className="input_title">Удобства</div>

                  <Selector2
                    data={allServices}
                    placeholder={`Введите значение`}
                    onChange={setServices}
                    styles={{
                      control: (baseStyles) => ({
                        ...baseStyles,
                        width: `${550}px`,
                      }),
                    }}
                  /> */}
                  <div className="input_title">Дети</div>
                  <div className="input_row">
                    <select
                      className="primary-input"
                      onChange={(e) => {
                        setCampData({
                          ...campData,
                          kids: {
                            ...kids,
                            forWho: e.target.value,
                          },
                        });
                      }}
                    >
                      <option value={campData.kids.forWho} selected>
                        {campData.kids.forWho}
                      </option>
                      <option value={"Для вожатых"}>Для вожатых</option>
                    </select>

                    <select
                      className="primary-input"
                      onChange={(e) => {
                        setCampData((prev) => ({
                          ...prev,
                          kids: {
                            ...prev.kids,
                            minCountInGroup: e.target.value,
                          },
                        }));
                      }}
                    >
                      <option value="" disabled selected>
                        Мин. кол-во в группе
                      </option>
                      {new Array(20).fill(1).map((age, idx) => (
                        <option value={age + idx}>{age + idx}</option>
                      ))}
                    </select>
                    <select
                      className="primary-input"
                      onChange={(e) => {
                        setCampData((prev) => ({
                          ...prev,
                          kids: {
                            ...prev.kids,
                            maxCountInGroup: e.target.value,
                          },
                        }));
                      }}
                    >
                      <option value="" disabled selected>
                        Макс. кол-во в группе
                      </option>
                      {new Array(18).fill(3).map((age, idx) => (
                        <option value={age + idx}>{age + idx}</option>
                      ))}
                    </select>
                  </div>
                  <div className="input_row">
                    <select
                      name=""
                      id=""
                      className="primary-input"
                      onChange={(e) => {
                        setCampData((prev) => ({
                          ...prev,
                          kids: {
                            ...prev.kids,
                            minAgeInGroup: e.target.value,
                          },
                        }));
                      }}
                    >
                      <option selected disabled>
                        Мин. возраст
                      </option>
                      {new Array(14).fill(1).map((age, idx) => (
                        <option value={age + idx}>{age + idx}</option>
                      ))}
                    </select>

                    <select
                      name=""
                      id=""
                      className="primary-input"
                      onChange={(e) => {
                        setCampData((prev) => ({
                          ...prev,
                          kids: {
                            ...prev.kids,
                            maxAgeInGroup: e.target.value,
                          },
                        }));
                      }}
                    >
                      <option selected disabled>
                        Макс. возраст
                      </option>
                      {new Array(14).fill(1).map((age, idx) => (
                        <option value={age + idx}>{age + idx}</option>
                      ))}
                    </select>
                  </div>
                  <div className="input_title">Оплата</div>
                  <div className="input_row">
                    <select id="payment" className="primary-input">
                      <option value="">Оплата за номер</option>
                      <option value="">Оплата за человека</option>
                    </select>

                    <select id="prepayment" className="primary-input">
                      {new Array(5).fill(10).map((a, idx) => (
                        <option value={a * (idx + 1)}>{a * (idx + 1)}%</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
              <ProgramTest
                programList={programList}
                setProgramList={setProgramList}
              />
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default AddCamp;
