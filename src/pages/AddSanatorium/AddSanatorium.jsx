import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

import addhotel from "../../assets/addhotel.png";

import { useNavigate } from "react-router-dom";
import {
  addHotel,
  deletePeriod,
  updateHotel,
  updateHotelPeriods,
} from "../../features/hotel/hotelSlice";
import { addService } from "../../features/hotelService/hotelServSlice";

import ShortUniqueId from "short-unique-id";

import check from "../../assets/check.svg";

import "./AddSanatorium.scss";
import "../AddHotel/Table.scss";
import "../AddHotel/AddHotel.scss";
import { useDispatch, useSelector } from "react-redux";
import { AdminHead } from "../../components/Admin";
import { Input } from "../../components/Form";
import Modal from "../../components/Modal";
import Section from "../../components/Section";
import RoomRow from "../AddHotel/RoomRow";
import ServiceSelector from "../AddHotel/Selector";

import { useUploadImageMutation } from "../../features/services/upload.service";
import GalleryBox from "../../components/Slider/GalleryBox";
import Periods from "../AddHotel/Periods";
import {
  addSanatorium,
  updateSanatorium,
} from "../../features/sanatorium/sanatoriumSlice";
import { API_URL_BASE, API_URL_PROXY } from "../../config/config";

import sanatourimmain from "../../assets/hotel/hotelmain.png";
import secondary from "../../assets/camp/campsecondary.png";

const AddSanatorium = ({
  fetchedSanatoriumData,
  editMode,
  updateSanatoriumData,
  handleUploadImage,
}) => {
  const uid = new ShortUniqueId({
    dictionary: "number", // the default
    length: 6,
  });

  const imageRef = useRef(null);

  const [hotelData, setHotelData] = useState({
    uid: uid(),
    sanatoriumServices: [
      { serviceType: "644517f32927d86d2f5a7ee7", description: "" },
    ],
    locationId: null,
    name: "",
    locationFeature: "",
    mapLink: "",
    rating: null,
    description: "",
    enterTime: "07:00",
    leaveTime: "07:00",
    food: null,
    kidFoodPrice: null,
    adultFoodPrice: null,
    kids: {
      babyMaxAge: null,
      kidMaxAge: null,
      kidDiscount: {
        discountType: "В тенге",
        discountValue: 2000,
      },
    },
    payment: {
      paymentType: "",
      prepayment: null,
    },
    comforts: [],
    hotelStars: 5,
    searchable: true,
  });

  useEffect(() => {
    let newData = fetchedSanatoriumData;
    setHotelData(newData);
  }, [fetchedSanatoriumData, editMode]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [upload, { data: uploadedImage, isLoading: uploadIsLoading }] =
    useUploadImageMutation();

  const [allLocations, setAllLocations] = useState([]);
  const [allCategories, setAllCategories] = useState([]);
  const [allServices, setAllServices] = useState([]);
  const [allSanServices, setAllSanServices] = useState([]);

  const [servicesObjs, setServicesObjs] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);

  // console.log(selectedOptions);

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    let services = [];
    allServices.map((serv, idx) => {
      services.push({
        value: serv.hotelServiceName,
        label: serv.hotelServiceName,
        category: serv.category.categoryName,
        servId: serv._id,
      });
    });
    setServicesObjs(services);
  }, [allServices]);

  // useEffect(() => {
  //   let services = [];
  //   selectedOptions.map((serv, idx) => {
  //     services.push({ serviceId: serv.servId });
  //   });
  //   setNewServices(services);
  // }, [selectedOptions]);

  // For react-select
  function handleSelect(data) {
    setSelectedOptions(data);
  }

  const [allFoods, setAllFoods] = useState([]);

  // Fetching all categories, services, locations
  useEffect(() => {
    axios
      .get(`${API_URL_PROXY}/locations`)
      .then((response) => {
        setAllLocations(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .get(`${API_URL_PROXY}/categories`)
      .then(({ data }) => {
        setAllCategories(data);
        // console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .get(`${API_URL_PROXY}/foods`)
      .then((response) => {
        setAllFoods(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .get(`${API_URL_PROXY}/hotelServices`)
      .then((response) => {
        setAllServices(response.data);
        setAllSanServices(
          response.data.filter(
            (serv) => serv.category._id === "644516e52927d86d2f5a7ee5"
          )
        );
      })
      .catch((error) => {
        console.log(error);
      });
  }, [axios]);

  const [newSanServices, setNewSanServices] = useState([]);

  useEffect(() => {
    setNewSanServices(
      allSanServices.map((serv) => {
        return { serviceType: serv, description: "" };
      })
    );
  }, [allSanServices]);

  const [addedSanServices, setAddedSanServices] = useState([
    { serviceType: "644517f32927d86d2f5a7ee7", description: "" },
  ]);

  const [fetchedSanatoriumServices, setFetchedSanatoriumServices] = useState();

  useEffect(() => {
    if (fetchedSanatoriumData?.sanatoriumServices?.length > 0 && editMode) {
      setAddedSanServices(fetchedSanatoriumData?.sanatoriumServices);
    }
  }, [fetchedSanatoriumData, editMode]);

  useEffect(() => {
    setHotelData({ ...hotelData, sanatoriumServices: addedSanServices });
  }, [addedSanServices]);

  // comforts: [...JSON.parse(localStorage.getItem("comforts"))],

  const handleSubmit = () => {
    // const values = {
    //   ...hotelData,
    //   comforts: [...JSON.parse(localStorage.getItem("comforts"))],
    // };

    // console.log(values);

    dispatch(addSanatorium(hotelData)).then((res) => {
      navigate(`/dashboard/sanatorium/${res.payload._id}`);
    });
  };

  const [prices, setPrices] = useState([]);

  // const handlePriceChange = (roomId, periodId, price) => {
  //   setPrices((prevPrices) => ({
  //     ...prevPrices,
  //     [roomId]: {
  //       ...prevPrices[roomId],
  //       [periodId]: price,
  //     },
  //   }));
  // };

  const [periods, setPeriods] = useState([]);

  useEffect(() => {
    setPeriods(hotelData?.periods);
  }, [hotelData]);

  const [servs, setServs] = useState();

  // useEffect(() => {
  //   setHotelData({ ...hotelData, hotelServices: servs });
  // }, [servs]);

  // const [newService, setNewService] = useState({
  //   hotelServiceName: null,
  //   category: null,
  // });

  const [sources, setSources] = useState([]);
  useEffect(() => {
    setSources(hotelData?.img ? hotelData?.img : []);
  }, [hotelData]);

  const [searchable, setIsSearchable] = useState(true);

  const clickUpload = () => imageRef.current.click();

  return (
    <>
      <AdminHead
        text={
          !editMode ? "Создание нового санатория" : "Редактирование санатория"
        }
        onClick={() => {
          !editMode ? handleSubmit() : dispatch(updateSanatorium(hotelData));
        }}
      />
      <div className="add_hotel-page">
        <Section
          section="add_gen-section"
          wrapper="add_gen-wrapper wrapper shadowed_box"
        >
          <GalleryBox
            handleUploadImage={clickUpload}
            sources={
              sources.length > 0
                ? sources
                : [sanatourimmain, secondary, secondary, secondary, secondary]
            }
          />
          <div className="gen_content-box">
            <div className="gen_title_checkbox">
              <div className="gen_title">Основное об отеле</div>

              {editMode && (
                <div className="toggler-box">
                  <div>Отображать при поиске</div>
                  <label class="switch">
                    <input
                      type="checkbox"
                      checked={hotelData?.searchable}
                      onChange={() =>
                        setHotelData((prev) => ({
                          ...prev,
                          searchable: !hotelData?.searchable,
                        }))
                      }
                    />
                    <span class="slider round"></span>
                  </label>
                </div>
              )}
            </div>
            <div className="input_row">
              <input
                type="text"
                className="primary-input"
                value={hotelData && hotelData?.name}
                placeholder="Название"
                onChange={(e) =>
                  setHotelData({ ...hotelData, name: e.target.value })
                }
              />
              <input
                type="text"
                className="primary-input"
                placeholder="Особенность местоположения"
                value={hotelData?.locationFeature}
                onChange={(e) =>
                  setHotelData({
                    ...hotelData,
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
                value={hotelData?.locationId}
                onChange={(e) => {
                  setHotelData({
                    ...hotelData,
                    locationId: e.target.value,
                  });
                }}
              >
                {allLocations && allLocations.length >= 0 ? (
                  allLocations.map((location, idx) => {
                    return (
                      <option value={location._id} key={idx}>
                        {location.locationName}
                      </option>
                    );
                  })
                ) : (
                  <p>Locations are loading</p>
                )}
              </select>
              <input
                type="text"
                className="primary-input"
                value={hotelData?.mapLink}
                placeholder="Ссылка на карту"
                onChange={(e) =>
                  setHotelData({ ...hotelData, mapLink: e.target.value })
                }
              />
            </div>
            <div className="input_row">
              <input
                type="number"
                className="primary-input"
                value={hotelData?.rating}
                placeholder="Рейтинг отеля"
                onChange={(e) =>
                  setHotelData({ ...hotelData, rating: e.target.value })
                }
              />
              <select
                className="primary-input"
                type="number"
                placeholder="Местоположение"
                name="hotelStars"
                value={hotelData?.hotelStars}
                onChange={(e) => {
                  setHotelData({
                    ...hotelData,
                    hotelStars: e.target.value,
                  });
                }}
              >
                <option value={5}>5</option>
                <option value={4}>4</option>
                <option value={3}>3</option>
                <option value={2}>2</option>
                <option value={1}>1</option>
              </select>
            </div>
            <div className="input_row">
              <textarea
                className="primary-input"
                name=""
                id=""
                cols="30"
                rows="5"
                value={hotelData?.description}
                placeholder="Описание"
                onChange={(e) =>
                  setHotelData({
                    ...hotelData,
                    description: e.target.value,
                  })
                }
              ></textarea>
              <input
                type="file"
                hidden
                ref={imageRef}
                onChange={handleUploadImage}
                multiple
              />
            </div>
          </div>
        </Section>

        <Section section="add_more-section" wrapper="add_more-wrapper">
          <div className="add_more-col more-col shadowed_box">
            <div className="gen_title">Подробнее</div>
            <div className="input_box">
              <div className="input_title">Время заезда</div>
              <div className="input_row">
                <div className="service-input">
                  <label htmlFor="discountType">Время заезда</label>
                  <select
                    name=""
                    id=""
                    className="primary-input"
                    value={hotelData.enterTime}
                    onChange={(e) =>
                      setHotelData({
                        ...hotelData,
                        enterTime: e.target.value,
                      })
                    }
                  >
                    <option value="" disabled selected>
                      Заезд с
                    </option>
                    <option value="07:00">07:00</option>
                    <option value="08:00">08:00</option>
                    <option value="09:00">09:00</option>
                    <option value="10:00">10:00</option>
                  </select>
                </div>
                <div className="service-input">
                  <label htmlFor="discountType">Время выезда</label>

                  <select
                    name=""
                    id=""
                    className="primary-input"
                    value={hotelData.leaveTime}
                    onChange={(e) =>
                      setHotelData({
                        ...hotelData,
                        leaveTime: e.target.value,
                      })
                    }
                  >
                    <option value="" disabled selected>
                      Выезд с
                    </option>
                    <option value="07:00">07:00</option>
                    <option value="08:00">08:00</option>
                    <option value="09:00">09:00</option>
                    <option value="10:00">10:00</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="input_box">
              <div className="input_title">Дети</div>
              <div className="input_row">
                <select
                  name="babyMaxAge"
                  id=""
                  className="primary-input"
                  value={hotelData?.kids?.babyMaxAge}
                  onChange={(e) =>
                    setHotelData({
                      ...hotelData,
                      kids: {
                        ...hotelData.kids,
                        babyMaxAge: e.target.value,
                      },
                    })
                  }
                >
                  <option value="" disabled selected>
                    Макс. возр. млад.
                  </option>
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                  <option value={4}>4</option>
                </select>
                <select
                  name="kidMaxAge"
                  id=""
                  className="primary-input"
                  value={hotelData?.kids?.kidMaxAge}
                  onChange={(e) =>
                    setHotelData({
                      ...hotelData,
                      kids: {
                        ...hotelData.kids,
                        kidMaxAge: e.target.value,
                      },
                    })
                  }
                >
                  <option value="" disabled selected>
                    Макс. возр. реб.
                  </option>
                  <option value={12}>12</option>
                  <option value={13}>13</option>
                  <option value={14}>14</option>
                </select>
              </div>
              <div className="input_row">
                <div className="service-input">
                  <label htmlFor="discountType">Тип скидки для ребенка</label>

                  <select
                    name="discountType"
                    id=""
                    className="primary-input"
                    value={hotelData?.kids?.kidDiscount?.discountType}
                    onChange={(e) =>
                      setHotelData({
                        ...hotelData,
                        kids: {
                          ...hotelData.kids,
                          kidDiscount: {
                            ...hotelData.kids.kidDiscount,
                            discountType: e.target.value,
                          },
                        },
                      })
                    }
                  >
                    <option value="В тенге">В тенге</option>
                    <option value="В процентах">В процентах</option>
                  </select>
                </div>
                <div className="service-input">
                  <label htmlFor="discount">Скидка</label>
                  <input
                    type="number"
                    name="discount"
                    className="primary-input"
                    placeholder="2000"
                    value={hotelData?.kids?.kidDiscount?.discountValue}
                    onChange={(e) =>
                      setHotelData({
                        ...hotelData,
                        kids: {
                          ...hotelData.kids,
                          kidDiscount: {
                            ...hotelData.kids.kidDiscount,
                            discountValue: e.target.value,
                          },
                        },
                      })
                    }
                  />
                </div>
              </div>
            </div>
            <div className="input_box">
              <div className="input_title">Тип питания</div>
              <select
                name="foodType"
                id=""
                className="primary-input"
                value={hotelData.food}
                onChange={(e) =>
                  setHotelData({ ...hotelData, food: e.target.value })
                }
              >
                {allFoods?.length > 0
                  ? allFoods?.map((food) => {
                      return <option value={food._id}>{food.label}</option>;
                    })
                  : null}
              </select>
              <div className="input_row">
                <input
                  type="number"
                  className="primary-input"
                  name="adultFoodPrice"
                  placeholder="Цена за питание взрослого"
                  value={hotelData.adultFoodPrice}
                  onChange={(e) => {
                    setHotelData({
                      ...hotelData,
                      adultFoodPrice: e.target.value,
                    });
                  }}
                />
                <input
                  type="number"
                  name="kidFoodPrice"
                  className="primary-input"
                  placeholder="Цена за детское питание"
                  value={hotelData.kidFoodPrice}
                  onChange={(e) => {
                    setHotelData({
                      ...hotelData,
                      kidFoodPrice: e.target.value,
                    });
                  }}
                />
              </div>
            </div>
            {/* <div className="input_box">
              <div className="input_title">Удобства</div>
              <select
                name="comforts"
                id=""
                className="primary-input"
                value={hotelData.comforts}
                onChange={(e) =>
                  setHotelData({ ...hotelData, comforts: e.target.value })
                }
              >
                <option value="" disabled selected>
                  Введите значение
                </option>
                <option value="642150a586cfa75278c280b9">Без питания</option>
                <option value="642150a586cfa75278c280b9">Без питания</option>
                <option value="642150a586cfa75278c280b9">Без питания</option>
                <option value="642150a586cfa75278c280b9">Без питания</option>
              </select>
            </div> */}
            <div className="input_box">
              <div className="input_title">Тип оплаты</div>
              <div className="input_row">
                <div className="service-input">
                  <label htmlFor="paymentType">Оплата за</label>
                  <select
                    name=""
                    id=""
                    className="primary-input"
                    value={hotelData?.payment?.paymentType}
                    onChange={(e) => {
                      setHotelData({
                        ...hotelData,
                        payment: {
                          ...hotelData.payment,
                          paymentType: e.target.value,
                        },
                      });
                    }}
                  >
                    <option value="Оплата за номер">Оплата за номер</option>
                    <option value="Оплата за человека">
                      Оплата за человека
                    </option>
                  </select>
                </div>
                <div className="service-input">
                  <label htmlFor="paymentType">Предоплата</label>
                  <select
                    name=""
                    id=""
                    className="primary-input"
                    value={hotelData?.payment?.prepayment}
                    onChange={(e) => {
                      setHotelData({
                        ...hotelData,
                        payment: {
                          ...hotelData.payment,
                          prepayment: e.target.value,
                        },
                      });
                    }}
                  >
                    <option value="30">30%</option>
                    <option value="50">50%</option>
                    <option value="70">70%</option>
                    <option value="100">100%</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div className="add_more-col categ-col shadowed_box">
            <div className="gen_title">Услуги отеля</div>
            {addedSanServices?.map((serv, idx) => {
              return (
                <ServiceCard
                  setIsOpen={setIsOpen}
                  number={idx + 1}
                  setAddedSanServices={setAddedSanServices}
                  addedSanServices={addedSanServices}
                  allCategories={allCategories}
                  allServices={allServices}
                  optionList={servicesObjs}
                  allSanServices={allSanServices}
                  selectedOptions={selectedOptions}
                  handleSelect={handleSelect}
                  setServs={setServs}
                  servs={servs}
                />
              );
            })}
            <button
              className="add_service-btn primary-btn"
              onClick={() => {
                setAddedSanServices([
                  ...addedSanServices,
                  {
                    serviceType: "644517f32927d86d2f5a7ee7",
                    description: "",
                  },
                ]);
              }}
            >
              Добавить услугу
            </button>
          </div>
        </Section>

        {editMode ? (
          <>
            <Periods
              periods={periods}
              setPeriods={setPeriods}
              updateHotelData={updateSanatoriumData}
              hotelId={hotelData?._id}
              mode="sanatorium"
            />
            {fetchedSanatoriumData && fetchedSanatoriumData?.periods ? (
              <Section
                section="tb_section"
                wrapper="tb_wrapper ver shadowed_box"
              >
                <div className="gen_title">Номера</div>
                <div className="table_wrapper">
                  <table className="periods_table">
                    <thead>
                      <tr>
                        <th>Номера и периоды</th>
                        {hotelData &&
                          hotelData?.periods &&
                          hotelData?.periods?.map((period) => (
                            <th key={period._id}>
                              {period.startDay}.{period.startMonth} -{" "}
                              {period.endDay}.{period.endMonth}
                            </th>
                          ))}
                      </tr>
                    </thead>
                    <tbody>
                      {hotelData &&
                        hotelData?.rooms &&
                        hotelData?.periods &&
                        prices &&
                        hotelData?.rooms?.map((room) => (
                          <RoomRow
                            room={room}
                            periodPrices={room.periodPrices}
                          />
                        ))}
                    </tbody>
                  </table>
                </div>
              </Section>
            ) : null}
          </>
        ) : null}
      </div>

      {console.log(hotelData)}
    </>
  );
};

export const ServiceCard = ({
  number,
  allCategories,
  allSanServices,
  allServices,
  deleteService,
  optionList,
  selectedOptions,
  addedSanServices,
  setAddedSanServices,
  fetchedSanatoriumServices,
  setFetchedSanatoriumServices,
  handleSelect,
  setIsOpen,
  setServs,
  servs,
  fetchedService,
  fetchedMode,
}) => {
  const [currCateg, setCurrCateg] = useState("Питание");
  const [currServ, setCurrServ] = useState("64258af02ba7928f871a09cd");
  const [thisCategServices, setThisCategServices] = useState();

  useEffect(() => {
    setThisCategServices(
      selectedOptions.filter((serv) => serv.category === currCateg)
    );
  }, [currCateg]);

  const newAllServices = allServices.map((serv) => {
    return { ...serv, label: serv.hotelServiceName, value: serv._id };
  });

  return (
    <div className="service-card">
      <div className="service-title">
        Услуга {number}{" "}
        <button onClick={() => deleteService(currServ)}>X</button>
      </div>
      <select
        name=""
        id=""
        className="primary-input"
        defaultValue={allSanServices[0]}
        value={
          fetchedService
            ? fetchedService?.serviceType
            : addedSanServices[number - 1]?.serviceType
        }
        onChange={(e) => {
          setAddedSanServices((prevServices) => {
            const updatedServices = [...prevServices];
            updatedServices[number - 1] = {
              ...updatedServices[number - 1],
              serviceType: e.target.value,
            };
            return updatedServices;
          });
        }}
      >
        {allSanServices &&
          allSanServices?.map((serv) => {
            return (
              <option key={serv._id} value={serv._id}>
                {serv.hotelServiceName}
              </option>
            );
          })}
      </select>
      <textarea
        className="primary-input"
        placeholder="Описание..."
        name=""
        id=""
        cols="30"
        rows="10"
        value={addedSanServices[number - 1]?.description || ""}
        onChange={(e) => {
          setAddedSanServices((prevServices) => {
            const updatedServices = [...prevServices];
            updatedServices[number - 1] = {
              ...updatedServices[number - 1],
              description: e.target.value,
            };
            return updatedServices;
          });
        }}
      ></textarea>
    </div>
  );
};

export default AddSanatorium;
