import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
// import axios from "axios";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import addhotel from "../../assets/addhotel.png";

import { useUploadImageMutation } from "../../features/services/upload.service";

import "./AddRoom.scss";
import { useDispatch, useSelector } from "react-redux";
import { addRoom, updateRoom } from "../../features/room/roomSlice";
import { AdminHead } from "../../components/Admin";
import Section from "../../components/Section";
import RoomRow from "../AddHotel/RoomRow";
import GalleryBox from "../../components/Slider/GalleryBox";

import secondary from "../../assets/camp/campsecondary.png";
import room from "../../assets/hotel/hotelmain.png";
import dateConfig from "../../components/DataConfig";

const AddRoom = ({ fetchedRoomData, editMode }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { hotelId } = useParams();

  const [hotelPeriods, setHotelPeriods] = useState();

  useEffect(() => {
    if (fetchedRoomData?.hotel?.periods) {
      setHotelPeriods(fetchedRoomData?.hotel?.periods);
    } else if (fetchedRoomData?.sanatorium?.periods) {
      setHotelPeriods(fetchedRoomData?.sanatorium?.periods);
    }
  }, [fetchedRoomData]);

  const [uploadImage] = useUploadImageMutation();

  const [roomData, setRoomData] = useState({
    hotel: hotelId,
    roomName: "",
    roomType: "",
    capacity: null,
    extraPlaces: [],
    roomPrice: null,
    area: null,
    smokingPolicy: "",
    roomsNumber: null,
    totalExtraPlacesAmount: null,
    freeBabyPlaces: null,
    capacity: null,
    roomType: "",
    beds: {
      bedsType: "",
      largeBeds: null,
      smallBeds: null,
    },
    people: {
      adultMax: null,
      babyMax: null,
      kidsMax: null,
    },
    restroom: "",
    bathroom: {
      availablity: "",
      type: "",
      features: [],
    },
    comforts: [],
    comment: "",
    prices: [],
    roomServices: [],
    roomDescription: "",
    bathExtras: "",
    periodPrices: [],
  });

  useEffect(() => {
    let newData = fetchedRoomData;
    if (fetchedRoomData && editMode) setRoomData(newData);
  }, [fetchedRoomData, editMode]);

  const roomServiceOpts = [
    {
      value: "Кондиционер",
      label: "Кондиционер",
    },
    {
      value: "Кондиционер2",
      label: "Кондиционер3",
    },
    {
      value: "Кондиционер3",
      label: "Кондиционер3",
    },
    {
      value: "Кондиционер4",
      label: "Кондиционер4",
    },
    {
      value: "Кондиционер5",
      label: "Кондиционер5",
    },
    {
      value: "Кондиционер6",
      label: "Кондиционер6",
    },
  ];

  const extraOpts = [
    {
      value: "Полотенца",
      label: "Полотенца",
    },
    {
      value: "Полотенца2",
      label: "Полотенца2",
    },
    {
      value: "Полотенца3",
      label: "Полотенца3",
    },
  ];

  const [options, setOptions] = useState([]);
  const [extras, setExtras] = useState([]);

  useEffect(() => {
    let roomServices = [];
    // let bathExtras = []
    // extras.forEach(extr => bathExtras.push(extr.value))
    options.forEach((serv) => roomServices.push(serv.value));
    setRoomData({ ...roomData, roomServices: roomServices });
  }, [options]);

  useEffect(() => {
    let bathExtras = [];
    extras.forEach((extr) => bathExtras.push(extr.value));
    setRoomData({ ...roomData, bathExtras: bathExtras });
  }, [extras]);

  const handleSubmit = () => {
    editMode
      ? dispatch(updateRoom(roomData))
      : dispatch(addRoom(roomData)).then((res) =>
          navigate(`/dashboard/room/${res.payload._id}`)
        );
  };

  const [servicesToRender, setServicesToRender] = useState([]);

  useEffect(() => {
    let services = [];
    if (roomData?.roomServices?.length > 0)
      roomData.roomServices.forEach((tag) =>
        services.push({ value: tag, label: tag })
      );
    setServicesToRender(services);
  }, [roomData.roomServices]);

  const [periods, setPeriods] = useState([]);
  const [newPeriods, setNewPeriods] = useState([]);
  const [extraPlaces, setExtraPlaces] = useState([]);

  useEffect(() => {
    if (fetchedRoomData?.extraPlaces) {
      setExtraPlaces(fetchedRoomData?.extraPlaces);
    }
  }, [fetchedRoomData]);

  useEffect(() => {
    if (
      fetchedRoomData?.hotel?.periods &&
      fetchedRoomData?.hotel?.periods?.length > 0
    ) {
      setPeriods(fetchedRoomData?.hotel?.periods);
    }
    // if (fetchedRoomData.periodPrices.length > 0) {
    //   setPeriods(fetchedRoomData.periodPrices);
    // }
  }, [fetchedRoomData]);
  console.log(fetchedRoomData?.periodPrices);

  const fileRef = React.useRef(null);

  useEffect(() => {
    if (fetchedRoomData && fetchedRoomData?.periodPrices?.length > 0) {
      setNewPeriods(fetchedRoomData?.periodPrices);
    } else {
      setNewPeriods(
        periods?.map((per) => {
          return { ...per, periodId: per._id, roomPrice: 0 };
        })
      );
    }
  }, [periods]);

  useEffect(() => {
    setRoomData({
      ...roomData,
      periodPrices: newPeriods,
    });
  }, [newPeriods]);

  useEffect(() => {
    setRoomData({
      ...roomData,
      extraPlaces: extraPlaces,
    });
  }, [extraPlaces]);

  console.log(roomData, "room data");

  const handleUploadImage = (e) => {
    const files = e.target.files;
    const formData = new FormData();

    for (let i = 0; i < files.length; i++) {
      formData.append("images", files[i]);
    }
    const values = {
      id: fetchedRoomData._id,
      formData,
      name: "rooms",
    };
    uploadImage(values).then((res) => console.log(res));
  };

  const [sources, setSources] = useState([]);
  useEffect(() => {
    setSources(roomData?.img ? roomData?.img : []);
  }, [roomData]);

  // console.log(fetchedRoomData._id, "roomData");

  const clickUpload = () => fileRef.current.click();

  const [hotelIdLink, setHotelIdLink] = useState();

  useEffect(() => {
    if (hotelId) setHotelIdLink(hotelId);
    else if (roomData?.hotel?._id) setHotelIdLink(roomData?.hotel?._id);
  }, [hotelId, roomData]);

  return (
    <>
      <AdminHead
        text={editMode ? "Редактирование номера" : "Создание нового номера"}
        onClick={() => handleSubmit()}
        headBack={() => {
          navigate(-1);
        }}
      />
      <div className="add_hotel-page page">
        <section>
          <div className="container">
            <div section="top_btns">
              {hotelIdLink ? (
                <Link
                  to={`/dashboard/hotel/${hotelIdLink}`}
                  className={"back_link primary-btn blue clear"}
                >
                  {"<"} Вернуться к отелю
                </Link>
              ) : null}
            </div>
          </div>
        </section>
        <Section
          section="add_gen-section"
          wrapper="add_gen-wrapper shadowed_box"
        >
          <GalleryBox
            handleUploadImage={clickUpload}
            sources={
              sources.length > 0
                ? sources
                : [room, secondary, secondary, secondary, secondary]
            }
          />
          <div className="gen_content-box">
            <div className="gen_title">Основное о номере</div>
            <div className="input_row">
              <div className="service-input full">
                <label htmlFor="roomName">Название</label>
                <input
                  type="text"
                  className="primary-input"
                  name="roomName"
                  placeholder="Например, 4-х местный люкс"
                  value={roomData.roomName}
                  onChange={(e) =>
                    setRoomData({ ...roomData, roomName: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="input_row">
              <div className="service-input">
                <label htmlFor="">Класс номера</label>
                <input
                  name=""
                  id=""
                  type="text"
                  className="primary-input"
                  value={roomData?.roomType}
                  onChange={(e) => {
                    setRoomData({ ...roomData, roomType: e.target.value });
                  }}
                />
              </div>
              <div className="service-input">
                <label htmlFor="">Вместимость</label>
                <input
                  name=""
                  id=""
                  type="number"
                  className="primary-input"
                  value={roomData?.capacity}
                  onChange={(e) => {
                    setRoomData({ ...roomData, capacity: e.target.value });
                  }}
                />
              </div>
              <div className="service-input">
                <label htmlFor="">Бесплатные места для младенцев</label>
                <input
                  name=""
                  id=""
                  type="number"
                  className="primary-input"
                  value={roomData?.freeBabyPlaces}
                  onChange={(e) => {
                    setRoomData({
                      ...roomData,
                      freeBabyPlaces: e.target.value,
                    });
                  }}
                />
              </div>
            </div>
            <div className="input_row">
              <div className="service-input w-30">
                <label htmlFor="roomsNumber">Количество комнат</label>
                <input
                  name="roomsNumber"
                  className="primary-input"
                  value={roomData.roomsNumber}
                  type="number"
                  onChange={(e) =>
                    setRoomData({
                      ...roomData,
                      roomsNumber: e.target.value,
                    })
                  }
                />
              </div>
              <div className="service-input w-30">
                <label htmlFor="roomsNumber">Тип кровати</label>
                <select
                  name="roomsNumber"
                  className="primary-input"
                  value={roomData?.beds?.bedsType}
                  onChange={(e) =>
                    setRoomData({
                      ...roomData,
                      beds: { ...roomData.beds, bedsType: e.target.value },
                    })
                  }
                >
                  <option value="двуспальные">двуспальные</option>
                  <option value="односпальные">односпальные</option>
                  <option value="двуспальные и односпальные">
                    двуспальные и односпальные
                  </option>
                  <option value="двухъярусные">двухъярусные</option>
                  <option value="двуспальные и двухъярусные">
                    двуспальные и двухъярусные
                  </option>
                  <option value="односпальная и двухъярусные">
                    односпальная и двухъярусные
                  </option>
                </select>
              </div>
              <div className="service-input w-20">
                <label htmlFor="roomsNumber">Больших</label>
                <select
                  name="roomsNumber"
                  className="primary-input"
                  value={roomData?.beds?.largeBeds}
                  onChange={(e) =>
                    setRoomData({
                      ...roomData,
                      beds: { ...roomData.beds, largeBeds: e.target.value },
                    })
                  }
                >
                  <option value={3}>3</option>
                  <option value={2}>2</option>
                  <option value={1}>1</option>
                  <option value={0}>Нет</option>
                </select>
              </div>
              <div className="service-input w-20">
                <label htmlFor="roomsNumber">Односп.</label>
                <select
                  name="roomsNumber"
                  className="primary-input"
                  value={roomData?.beds?.smallBeds}
                  onChange={(e) =>
                    setRoomData({
                      ...roomData,
                      beds: { ...roomData.beds, smallBeds: e.target.value },
                    })
                  }
                >
                  <option value={3}>3</option>
                  <option value={2}>2</option>
                  <option value={1}>1</option>
                  <option value={0}>Нет</option>
                </select>
              </div>
            </div>
            <div className="input_row">
              <div className="service-input w-40">
                <label htmlFor="">Площадь номера</label>
                <input
                  type="number"
                  className="primary-input"
                  placeholder="Размер номера в кв. метрах"
                  value={roomData.area}
                  onChange={(e) =>
                    setRoomData({ ...roomData, area: e.target.value })
                  }
                />
              </div>
            </div>
            {/* <div className="input_row">
              <div className="service-input">
                <select
                  name="roomsNumber"
                  className="primary-input"
                  placeholder="Макс. кол-во взрослых"
                  value={roomData?.people?.adultMax}
                  onChange={(e) =>
                    setRoomData({
                      ...roomData,
                      people: {
                        ...roomData.people,
                        adultMax: e.target.value,
                      },
                    })
                  }
                >
                  <option selected disabled value="">
                    Макс. кол-во взрослых
                  </option>
                  <option value={3}>3</option>
                  <option value={2}>2</option>
                  <option value={1}>1</option>
                </select>
              </div>
              <div className="service-input">
                <select
                  name="roomsNumber"
                  className="primary-input"
                  placeholder="Макс. кол-во взрослых"
                  value={roomData?.people?.babyMax}
                  onChange={(e) =>
                    setRoomData({
                      ...roomData,
                      people: {
                        ...roomData.people,
                        babyMax: e.target.value,
                      },
                    })
                  }
                >
                  <option selected disabled value="">
                    Макс. кол-во младенцев
                  </option>
                  <option value={3}>3</option>
                  <option value={2}>2</option>
                  <option value={1}>1</option>
                </select>
              </div>
              <div className="service-input">
                <select
                  name="roomsNumber"
                  className="primary-input"
                  placeholder="Макс. кол-во взрослых"
                  value={roomData?.people?.kidsMax}
                  onChange={(e) =>
                    setRoomData({
                      ...roomData,
                      people: {
                        ...roomData.people,
                        kidsMax: e.target.value,
                      },
                    })
                  }
                >
                  <option selected disabled value="">
                    Макс. кол-во детей
                  </option>
                  <option value={3}>3</option>
                  <option value={2}>2</option>
                  <option value={1}>1</option>
                </select>
              </div>
            </div> */}
            <div className="input_row">
              <div className="service-input">
                <div className="service-title">Дополнительные места</div>
                <select
                  name=""
                  id=""
                  type="number"
                  className="primary-input"
                  value={roomData?.totalExtraPlacesAmount}
                  onChange={(e) => {
                    setRoomData({
                      ...roomData,
                      totalExtraPlacesAmount: e.target.value,
                    });
                  }}
                >
                  <option value="" selected disabled>
                    Макс. кол-во в номере
                  </option>
                  <option value={3}>3</option>
                  <option value={2}>2</option>
                  <option value={1}>1</option>
                </select>
              </div>
              <div className="service-input w-30">
                <div className="service-title">Политика курения</div>
                <select
                  name="roomsNumber"
                  className="primary-input"
                  value={roomData?.smokingPolicy}
                  onChange={(e) =>
                    setRoomData({
                      ...roomData,
                      smokingPolicy: e.target.value,
                    })
                  }
                >
                  <option value="Для НЕкурящих" selected>
                    Для НЕкурящих
                  </option>
                  <option value="Для курящих">Для курящих</option>
                </select>
              </div>
              <div className="service-input w-20">
                <div className="service-title">Санузел</div>
                <select
                  name="roomsNumber"
                  className="primary-input"
                  value={roomData.restroom}
                  onChange={(e) =>
                    setRoomData({
                      ...roomData,
                      restroom: e.target.value,
                    })
                  }
                >
                  <option value="Есть" selected>
                    Есть
                  </option>
                  <option value="Нет">Нет</option>
                </select>
              </div>
              {/* <div className="service-input w-20">
                <div className="service-title">Ванная</div>
                <select
                  name="roomsNumber"
                  className="primary-input"
                  value={roomData ? roomData?.bathroom?.availablity : null}
                  onChange={(e) =>
                    setRoomData({
                      ...roomData,
                      bathroom: {
                        ...roomData.bathroom,
                        availablity: e.target.value,
                      },
                    })
                  }
                >
                  <option value="Есть" selected>
                    Есть
                  </option>
                  <option value="Нет">Нет</option>
                </select>
              </div> */}
            </div>
            <div className="input_row">
              <textarea
                className="primary-input"
                name=""
                id=""
                cols="30"
                rows="5"
                placeholder="Описание"
                value={roomData.roomDescription}
                onChange={(e) =>
                  setRoomData({
                    ...roomData,
                    roomDescription: e.target.value,
                  })
                }
              ></textarea>
            </div>
            <input
              type="file"
              multiple
              hidden
              ref={fileRef}
              onChange={handleUploadImage}
            />
            {/* {editMode && (
              <div className="input_row">
                <button
                  className="primary-btn"
                  onClick={() => fileRef.current.click()}
                >
                  Добавить фото
                </button>
              </div>
            )} */}
          </div>
        </Section>
        {editMode ? (
          <>
            <Section section="test_section" wrapper="test_wrapper shadowed_box">
              <div className="table_wrapper">
                <table className="periods_table">
                  <thead>
                    <tr>
                      <th>Номер</th>
                      {console.log(fetchedRoomData, "fetchedRoomData")}
                      {hotelPeriods?.map((period) => (
                        <th key={period._id}>
                          {dateConfig(period.startDay)}/
                          {dateConfig(period.startMonth)} -{" "}
                          {dateConfig(period.endDay)}/
                          {dateConfig(period.endMonth)}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <RoomRow
                      room={fetchedRoomData}
                      periodPrices={fetchedRoomData?.periodPrices}
                      roomMode
                    />
                  </tbody>
                </table>
              </div>
            </Section>
            <Section
              section={"extraplaces_section"}
              wrapper={"extraplaces_wrapper wrapper ver"}
            >
              <div className="periods_top">
                <div className="gen_title">Дополнительные места</div>
                <div className="periods_btns">
                  <button
                    className="primary-btn black"
                    onClick={() => {
                      setExtraPlaces([
                        ...extraPlaces,
                        {
                          minAge: 0,
                          maxAge: 17,
                          priceWithFood: 0,
                          priceNoFood: 0,
                          foodPrice: 0,
                          maxAmount: 1,
                        },
                      ]);
                    }}
                  >
                    Добавить
                  </button>
                </div>
              </div>

              <div className="extraplaces_box ">
                {extraPlaces?.length > 0
                  ? extraPlaces?.map((xp, idx) => {
                      return (
                        <div className="extraplace_card shadowed_box" key={idx}>
                          <div className="extraplace_card-title">
                            Доп. место #{idx + 1}
                          </div>
                          <div className="service-input">
                            <label htmlFor="">Мин. возраст</label>
                            <input
                              className="primary-input"
                              type="number"
                              name=""
                              id=""
                              value={xp.minAge}
                              onChange={(e) => {
                                const updatedExtraPlaces = [...extraPlaces];
                                updatedExtraPlaces[idx] = {
                                  ...updatedExtraPlaces[idx],
                                  minAge: +e.target.value,
                                };
                                setExtraPlaces(updatedExtraPlaces);
                              }}
                            />
                          </div>
                          <div className="service-input">
                            <label htmlFor="">Макс. возраст</label>
                            <input
                              className="primary-input"
                              type="number"
                              name=""
                              id=""
                              value={xp.maxAge}
                              onChange={(e) => {
                                const updatedExtraPlaces = [...extraPlaces];
                                updatedExtraPlaces[idx] = {
                                  ...updatedExtraPlaces[idx],
                                  maxAge: +e.target.value,
                                };
                                setExtraPlaces(updatedExtraPlaces);
                              }}
                            />
                          </div>
                          <div className="service-input">
                            <label htmlFor="">С учетом питания</label>
                            <input
                              className="primary-input"
                              type="number"
                              name=""
                              id=""
                              value={xp.priceWithFood}
                              onChange={(e) => {
                                const updatedExtraPlaces = [...extraPlaces];
                                updatedExtraPlaces[idx] = {
                                  ...updatedExtraPlaces[idx],
                                  priceWithFood: +e.target.value,
                                };
                                setExtraPlaces(updatedExtraPlaces);
                              }}
                            />
                          </div>
                          <div className="service-input">
                            <label htmlFor="">Без учета питания</label>
                            <input
                              className="primary-input"
                              type="number"
                              name=""
                              id=""
                              value={xp.priceNoFood}
                              onChange={(e) => {
                                const updatedExtraPlaces = [...extraPlaces];
                                updatedExtraPlaces[idx] = {
                                  ...updatedExtraPlaces[idx],
                                  priceNoFood: +e.target.value,
                                };
                                setExtraPlaces(updatedExtraPlaces);
                              }}
                            />
                          </div>
                          <div className="service-input">
                            <label htmlFor="">Стоимость питания</label>
                            <input
                              className="primary-input"
                              type="number"
                              name=""
                              id=""
                              value={xp.foodPrice}
                              onChange={(e) => {
                                const updatedExtraPlaces = [...extraPlaces];
                                updatedExtraPlaces[idx] = {
                                  ...updatedExtraPlaces[idx],
                                  foodPrice: +e.target.value,
                                };
                                setExtraPlaces(updatedExtraPlaces);
                              }}
                            />
                          </div>
                          <div className="service-input">
                            <label htmlFor="">Макс. кол-во</label>
                            <input
                              className="primary-input"
                              type="number"
                              name=""
                              id=""
                              value={xp.maxAmount}
                              onChange={(e) => {
                                const updatedExtraPlaces = [...extraPlaces];
                                updatedExtraPlaces[idx] = {
                                  ...updatedExtraPlaces[idx],
                                  maxAmount: +e.target.value,
                                };
                                setExtraPlaces(updatedExtraPlaces);
                              }}
                            />
                          </div>
                        </div>
                      );
                    })
                  : null}
                {console.log(extraPlaces, "extra places")}
              </div>
            </Section>
          </>
        ) : null}
        <Section section="add_more-section" wrapper="add_more-wrapper">
          <div className="add_more-col more-col shadowed_box">
            <div className="gen_title">Подробнее</div>
            <div className="input_box">
              <div className="input_row">
                <div className="service-input full">
                  <label htmlFor="service">Удобства</label>
                  {!editMode ? (
                    <Select
                      options={roomServiceOpts}
                      placeholder="Введите значение"
                      value={options}
                      onChange={(option) => {
                        setOptions(option);
                      }}
                      isSearchable={true}
                      isMulti
                      useDragHandle
                      axis="xy"
                      styles={{
                        control: (baseStyles) => ({
                          ...baseStyles,
                          width: `${550}px`,
                          border: "none",
                          "background-color": "rgb(249, 249, 249)",
                          outline: "none",
                        }),
                      }}
                    />
                  ) : (
                    <Select
                      options={roomServiceOpts}
                      placeholder="Введите значение"
                      value={servicesToRender}
                      onChange={(option) => {
                        setOptions(option);
                      }}
                      isSearchable={true}
                      isMulti
                      useDragHandle
                      axis="xy"
                      styles={{
                        control: (baseStyles) => ({
                          ...baseStyles,
                          width: `${550}px`,
                          border: "none",
                          "background-color": "rgb(249, 249, 249)",
                          outline: "none",
                        }),
                      }}
                    />
                  )}
                </div>
              </div>
            </div>

            <div className="input_box">
              <div className="input_row">
                <div className="service-input">
                  <div className="service-title">Содержимое ванной</div>
                  <label htmlFor="">Ванна или душ</label>
                  <select
                    name=""
                    id=""
                    className="primary-input"
                    value={roomData?.bathroom?.type}
                    onChange={(e) => {
                      setRoomData({
                        ...roomData,
                        bathroom: {
                          ...roomData.bathroom,
                          type: e.target.value,
                        },
                      });
                    }}
                  >
                    <option value="Душ">Душ</option>
                    <option value="Ванна">Ванна</option>
                  </select>
                </div>
              </div>
              <div className="input_row">
                <div className="service-input">
                  <label htmlFor="">Дополнительное содержимое</label>
                  <Select
                    options={extraOpts}
                    placeholder="Введите значение"
                    value={extras}
                    onChange={(option) => {
                      setExtras(option);
                    }}
                    isSearchable={true}
                    isMulti
                    useDragHandle
                    axis="xy"
                    styles={{
                      control: (baseStyles) => ({
                        ...baseStyles,
                        width: `${550}px`,
                        border: "none",
                        "background-color": "rgb(249, 249, 249)",
                        outline: "none",
                      }),
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="add_more-col categ-col shadowed_box">
            <div className="gen_title">Примечания</div>
            <div className="input_row">
              <textarea
                className="primary-input"
                name=""
                id=""
                cols="30"
                rows="5"
                placeholder="Примечание"
                value={roomData.comment}
                onChange={(e) =>
                  setRoomData({
                    ...roomData,
                    comment: e.target.value,
                  })
                }
              ></textarea>
            </div>
          </div>
        </Section>
      </div>
    </>
  );
};

export default AddRoom;
