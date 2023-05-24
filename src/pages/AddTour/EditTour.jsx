import React, { Fragment, useEffect, useState } from "react";
import style from "./AddTour.module.scss";
import "./AddTour.scss";

import { AdminHead } from "../../components/Admin";
import "../AddHotel/AddHotel.scss";
import { AdminAddForm } from "../../components/Admin/AdminAddForm";
import addhotel from "../../assets/addhotel.png";
import { Input } from "../../components/Form";
import Selector2 from "../AddHotel/Selector";
import Section from "../../components/Section";

import {
  useGetHotelServiceQuery,
  useGetHotelsQuery,
  useGetLocationQuery,
  useGetFoodQuery,
} from "../../features/services/base.service";
import { useSelector } from "react-redux";
import {
  useEditTourByIdMutation,
  useGetTourByIdQuery,
  useLazyGetTourByIdQuery,
} from "../../features/services/edit.service";

import tourmain from "../../assets/tour/tour.png";
import secondary from "../../assets/camp/campsecondary.png";

import { useParams, useNavigate } from "react-router-dom";
import Modal from "../../components/Modal";
import { useUploadImageMutation } from "../../features/services/upload.service";
import GalleryBox from "../../components/Slider/GalleryBox";
import ProgramTest from "../AddCamp/ProgramTest";
import TourTable from "./TourTable";
import Periods from "../AddHotel/Periods";

const EditTour = () => {
  const { data: food = [], isLoading: isLoadFood } = useGetFoodQuery();
  console.log(food, "food");
  const { id } = useParams("id");
  const [dayIDX, setDayIdx] = React.useState(0);

  const [tourData, setTourData] = React.useState({});
  const [isOpen, setIsOpen] = React.useState(false);

  const [fetchTourById, { isLoading: IdTourLoaded }] =
    useLazyGetTourByIdQuery();

  const refetchTour = () => {
    fetchTourById(id).then(({ data }) => setTourData(data));
  };

  const [uploadImage, { isLoading: uploadLoading, isError }] =
    useUploadImageMutation();

  useEffect(() => {
    fetchTourById(id).then(({ data }) => setTourData(data));
  }, []);
  console.log(tourData.hotels, "tour data");
  const handleDelPoint = (idx, dayIdx) => {
    let newProgram = [...addedServices];
    if (idx !== 0) {
      newProgram[dayIdx].days.splice(idx, 1);
      setAddedServices(newProgram);
    }
  };

  const handleDelDay = () => {
    let newProgram = [...addedServices];
    if (newProgram.length > 1) {
      newProgram.splice(dayIDX, 1);
      setAddedServices(newProgram);
    }
    setIsOpen(false);
  };
  const { data: hotels = [], isLoading: isHotelLoaded } = useGetHotelsQuery();
  const { data: allLocations = [], isLoading } = useGetLocationQuery();
  const { data: service, isLoading: isLoadService } = useGetHotelServiceQuery();
  const [allServices, setAllServices] = React.useState([]);
  const [withKid, setWithKid] = React.useState(false);

  const [foodData, setFoodData] = React.useState([]);
  const [comfortsData, setComfortsData] = React.useState([]);

  const [addedServices, setAddedServices] = React.useState([
    {
      days: [
        {
          points: { day: null, time: "", pointName: "", pointDescription: "" },
        },
      ],
    },
  ]);

  const [editTour, { isLoading: addLoad }] = useEditTourByIdMutation();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isLoadService) {
      setAllServices([]);
    } else {
      let services = [];
      service?.map((serv) => {
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

  const [roomId, setRoomId] = React.useState(null);

  const handleSubmit = async () => {
    const values = {
      ...tourData,
      token: user.token,
      comforts: comfortsData.map(({ value }) => ({
        name: value,
      })),
      food: foodData.map(({ _id }) => _id),
      id,
      img: tourData?.img ? tourData?.img : [],
      price: tourData?.price ? tourData?.price : [],
      rooms: tourData?.rooms ? tourData?.rooms : [],
      locationId: tourData?.locationId,
      tourServices: comfortsData.map(({ servId }) => servId),
      hotels: hotelsArray.map((hotels) => ({
        hotel: hotels.hotelId,
        room: hotels.roomId,
      })),
      program: programList,
      searchable,
      periods: periods,
    };
    await editTour(values);
  };

  const fileRef = React.useRef(null);

  const handleUpload = async (e) => {
    const formData = new FormData();
    const files = e.target.files;
    for (let i = 0; i < files.length; i++) {
      formData.append("images", files[i]);
    }
    const values = {
      id,
      name: "tour",
      formData,
    };
    await uploadImage(values)
      .then((response) => console.log(response))
      .finally((fileRef.current = null))
      .catch((err) => console.error(err));
  };

  const [sources, setSources] = useState([]);

  useEffect(() => {
    setSources(tourData.img ? tourData.img : []);
  }, [tourData]);

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

  useEffect(() => {
    if (tourData?.program && tourData?.program?.length > 0) {
      setProgramList(tourData?.program);
    }
  }, [tourData]);

  const [searchable, setIsSearchable] = useState(true);

  const [periods, setPeriods] = useState([]);

  useEffect(() => {
    if (tourData?.periods && tourData?.periods?.length > 0) {
      setPeriods(tourData?.periods);
    }
  }, [tourData]);

  const [hotelsArray, setHotelsArray] = useState([
    {
      hotelId: "",
      roomId: "",
    },
  ]);

  const clickUpload = () => fileRef.current.click();

  return (
    <>
      <AdminHead text="Создание 1-3 тура" onClick={() => handleSubmit()} />
      <div className="add_hotel-page page">
        <Section
          section="add_gen-section"
          wrapper="ass_gen-wrapper shadowed_box"
        >
          <GalleryBox
            handleUploadImage={clickUpload}
            sources={
              sources.length > 0
                ? sources
                : [tourmain, secondary, secondary, secondary, secondary]
            }
          />
          <div className="gen_content-box">
            <div className="gen_title_checkbox">
              <div className="gen_title">Основное о туре</div>

              <div className="toggler-box">
                <div>Отображать при поиске</div>
                <label class="switch">
                  <input
                    type="checkbox"
                    checked={searchable}
                    onChange={() => setIsSearchable(!searchable)}
                  />
                  <span class="slider round"></span>
                </label>
              </div>
            </div>
            <div className="input_row">
              <Input
                placeholder="Название"
                value={tourData && tourData.name && tourData.name}
                onChange={(e) =>
                  setTourData({ ...tourData, name: e.target.value })
                }
              />
              <Input
                placeholder="Особенность местоположения"
                value={
                  tourData &&
                  tourData.locationFeature &&
                  tourData.locationFeature
                }
                onChange={(e) =>
                  setTourData({
                    ...tourData,
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
                value={tourData && tourData.locationId && tourData.locationId}
                onChange={(e) => {
                  console.log(e.target.value);
                  setTourData({
                    ...tourData,
                    locationId: e.target.value,
                  });
                }}
                // onSelect={(e) => console.log(e.target.value)}
              >
                {allLocations.map((location, idx) => (
                  <option
                    value={location._id}
                    // selected={
                    //   tourIdData &&
                    //   tourIdData.locationId &&
                    //   tourIdData.locationId._id &&
                    //   location._id === tourIdData.locationId._id
                    // }
                    key={location._id}
                  >
                    {location.locationName}
                  </option>
                ))}
              </select>
              <Input
                placeholder="Город вылета"
                value={
                  tourData && tourData.departureCity && tourData.departureCity
                }
                onChange={(e) =>
                  setTourData({
                    ...tourData,
                    departureCity: e.target.value,
                  })
                }
              />
              <Input
                placeholder="Ссылка на карту"
                value={tourData && tourData.mapLink && tourData.mapLink}
                onChange={(e) =>
                  setTourData({
                    ...tourData,
                    mapLink: e.target.value,
                  })
                }
              />
            </div>
            <div className="input_row">
              <Input
                placeholder="Рейтинг тура"
                value={tourData && tourData.rating && tourData.rating}
                type="number"
                onChange={(e) =>
                  setTourData({
                    ...tourData,
                    rating: e.target.value,
                  })
                }
              />
              <select
                className="primary-input"
                type="number"
                placeholder="Продолжительность тура"
                onChange={(e) =>
                  setTourData({
                    ...tourData,
                    duration: e.target.value,
                  })
                }
              >
                <option
                  // selected={
                  //   tourIdData && 1 === Number(tourIdData.duration)
                  // }
                  value={1}
                >
                  1 день
                </option>
                <option
                  // selected={
                  //   tourIdData && 2 === Number(tourIdData.duration)
                  // }
                  value={2}
                >
                  2 дня
                </option>
                <option
                  // selected={
                  //   tourIdData && 3 === Number(tourIdData.duration)
                  // }
                  value={3}
                >
                  3 дня
                </option>
              </select>
            </div>
            <div className="input_row">
              <textarea
                className="primary-input"
                cols="30"
                rows="5"
                value={tourData && tourData.description && tourData.description}
                placeholder="Описание"
                onChange={(e) =>
                  setTourData({
                    ...tourData,
                    description: e.target.value,
                  })
                }
              />
            </div>
            <input
              onChange={handleUpload}
              type="file"
              hidden
              ref={fileRef}
              multiple
            />
            {/* <button
              className={`primary-btn`}
              onClick={() => fileRef.current.click()}
            >
              Изменить фото
            </button> */}
          </div>
        </Section>
        <section className="add_more-section">
          <div className="container">
            <div className="add_more-wrapper wrapper">
              <div className="add_more-col more-col shadowed_box">
                <div className="gen_title">Подробнее</div>
                <div className="input_box">
                  <div className="input_title">Отель</div>

                  {hotelsArray?.map((h, idx) => (
                    <Fragment key={h._id}>
                      <select
                        className="primary-input"
                        onChange={(e) =>
                          setHotelsArray((prev) => {
                            const hotelId = e.target.value;
                            const updatedArray = [...prev];
                            updatedArray[idx] = { hotelId };
                            return updatedArray;
                          })
                        }
                      >
                        <option value="" disabled selected>
                          Выбрать из списка
                        </option>
                        {isHotelLoaded ? (
                          <p>Hotels aren't loaded</p>
                        ) : (
                          <>
                            {hotels.map((hotel) => (
                              <option value={hotel._id} key={hotel._id}>
                                {hotel.name}
                              </option>
                            ))}
                          </>
                        )}
                      </select>
                      <select
                        onChange={(e) =>
                          setHotelsArray((prev) => {
                            const roomId = e.target.value;
                            const updatedArray = [...prev];
                            updatedArray[idx] = {
                              ...updatedArray[idx],
                              roomId,
                            };
                            return updatedArray;
                          })
                        }
                        className="primary-input"
                      >
                        <option value="" selected disabled>
                          Номер
                        </option>

                        {hotels?.find((hotel) => hotel._id === h.hotelId)?.rooms
                          ?.length > 0 ? (
                          <>
                            {hotels
                              .find((hotel) => hotel._id === h.hotelId)
                              .rooms.map((rooms) => (
                                <>
                                  <option value={rooms._id}>
                                    {rooms.roomName}
                                  </option>
                                </>
                              ))}
                          </>
                        ) : (
                          <option>В данном отеле нету номеров</option>
                        )}
                      </select>
                    </Fragment>
                  ))}
                  <button
                    className="add_service-btn primary-btn"
                    onClick={() => {
                      setHotelsArray((prev) => [
                        ...prev,
                        {
                          hotelId: "",
                          roomId: "",
                        },
                      ]);
                    }}
                  >
                    Добавить отель
                  </button>
                  <div className="input_title">Тип питания</div>
                  {!isLoadFood && (
                    <Selector2
                      food
                      data={food}
                      value={foodData}
                      placeholder={`Введите значение`}
                      onChange={setFoodData}
                      styles={{
                        control: (baseStyles) => ({
                          ...baseStyles,
                          width: `${550}px`,
                        }),
                      }}
                    />
                  )}

                  <div className="input_title">Удобства</div>

                  <Selector2
                    isServ
                    data={allServices}
                    placeholder={`Введите значение`}
                    value={comfortsData}
                    onChange={setComfortsData}
                    styles={{
                      control: (baseStyles) => ({
                        ...baseStyles,
                        width: `${550}px`,
                      }),
                    }}
                  />
                  <div className="input_title">Дети</div>
                  <div className="input_row">
                    <select
                      className="primary-input"
                      onChange={(e) => {
                        setWithKid(Boolean(e.target.value));
                        setTourData({
                          ...tourData,
                          kids: {
                            withKids: !e.target.value,
                          },
                        });
                      }}
                    >
                      <option
                        // selected={
                        //   tourIdData &&
                        //   tourIdData.kids &&
                        //   tourIdData.kids.withKids &&
                        //   false === tourIdData.kids.withKids
                        // }
                        value={false}
                      >
                        Можно с детьми
                      </option>
                      <option
                        // selected={
                        //   tourIdData &&
                        //   tourIdData.kids &&
                        //   tourIdData.kids.withKids &&
                        //   true === tourIdData.kids.withKids
                        // }
                        value={true}
                      >
                        Без детей
                      </option>
                    </select>

                    <select
                      disabled={withKid}
                      className="primary-input"
                      onChange={(e) => {
                        setTourData((prev) => ({
                          ...prev,
                          kids: {
                            ...prev.kids,
                            babyMaxAge: e.target.value,
                          },
                        }));
                      }}
                    >
                      <option value="" disabled selected>
                        Мин. возр.
                      </option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                    </select>

                    <select
                      disabled={withKid}
                      className="primary-input"
                      onChange={(e) => {
                        setTourData((prev) => ({
                          ...prev,
                          kids: {
                            ...prev.kids,
                            kidMaxAge: e.target.value,
                          },
                        }));
                      }}
                    >
                      <option value="" disabled selected>
                        Макс. возр.
                      </option>
                      <option value="12">12</option>
                      <option value="13">13</option>
                      <option value="14">14</option>
                    </select>
                  </div>
                  <div className="input_title">Оплата</div>
                  <div className="input_row">
                    {/* TODO!Чисто для показа */}
                    {/* <label className={style.info_label} htmlFor="payment">
                      Оплата за
                    </label> */}
                    <select id="payment" className="primary-input">
                      <option value="">Оплата за номер</option>
                      <option value="">Оплата за человека</option>
                    </select>
                    {/* <label className={style.info_label} htmlFor="prepayment">
                      Предоплата
                    </label> */}
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
                style={style}
              />
            </div>
          </div>
        </section>
        <Periods
          periods={periods}
          setPeriods={setPeriods}
          hotelId={tourData?._id}
          refetch={refetchTour}
          mode="tour"
        />
        <TourTable
          periodPrices={tourData?.periodPrices}
          tourId={tourData?._id}
          tourData={tourData}
        />
      </div>
      <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
        <div className="modal-content">
          <div className="modal-title">
            Вы хотите удалить день из <br />
            программы?
          </div>
          <div className="modal-body">
            <span className="modal-select-text">При удалении дня</span>, будут
            удалены пункты <br /> программы, хранящиеся в нем. Если вы <br />
            точно хотите удалить день, то напишите
            <br />
            <span className="modal-select-text">“День {dayIDX + 1}”</span>
          </div>

          <div className="modal-button">
            <button onClick={() => handleDelDay()} className="del-btn">
              <span>Удалить день из программы</span>
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default EditTour;
