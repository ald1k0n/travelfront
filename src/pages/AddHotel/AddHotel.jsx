import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

import { useNavigate } from "react-router-dom";
import { addHotel, updateHotel } from "../../features/hotel/hotelSlice";
import { addService } from "../../features/hotelService/hotelServSlice";

import ShortUniqueId from "short-unique-id";

import "./AddHotel.scss";
import "./Table.scss";
import { useDispatch, useSelector } from "react-redux";
import { AdminHead } from "../../components/Admin";
import { Input } from "../../components/Form";
import Modal from "../../components/Modal";
import Section from "../../components/Section";
import RoomRow from "./RoomRow";
import ServiceCard from "./ServiceCard";

import { useUploadImageMutation } from "../../features/services/upload.service";
import GalleryBox from "../../components/Slider/GalleryBox";
import { setCurrServices } from "../../features/adminSlice";
import Periods from "./Periods";
import { API_URL_PROXY } from "../../config/config";

import hotelmain from "../../assets/hotel/hotelmain.png";
import secondary from "../../assets/camp/campsecondary.png";
import dateConfig from "../../components/DataConfig";
const AddHotel = ({
  fetchedHotelData,
  editMode,
  updateHotelData,
  handleUploadImage,
}) => {
  const uid = new ShortUniqueId({
    dictionary: "number", // the default
    length: 6,
  });

  const imageRef = useRef(null);

  const { currServices } = useSelector((state) => state.admin);

  // console.log(currServices, "currServices");

  const [hotelData, setHotelData] = useState({
    uid: uid(),
    hotelServices: [],
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
  });

  console.log(hotelData, "hoteldata");

  const buttonRef = useRef(null);

  function handleClick() {
    buttonRef.current.click();
  }

  const [fetchedOptions, setFetchedOptions] = useState([]);

  useEffect(() => {
    if (
      fetchedHotelData?.hotelServices &&
      fetchedHotelData?.hotelServices.length > 0
    ) {
      setFetchedOptions(fetchedHotelData?.hotelServices);
    }
  }, [fetchedHotelData]);

  useEffect(() => {
    let newData = fetchedHotelData;
    setHotelData(newData);
  }, [fetchedHotelData, editMode]);

  const { singleHotel } = useSelector((state) => state.hotels);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [upload, { data: uploadedImage, isLoading: uploadIsLoading }] =
    useUploadImageMutation();

  const [allLocations, setAllLocations] = useState([]);
  const [allCategories, setAllCategories] = useState([]);
  const [allServices, setAllServices] = useState([]);
  const [allFoods, setAllFoods] = useState([]);

  const [servicesObjs, setServicesObjs] = useState([]);

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
      .get(`${API_URL_PROXY}/hotelServices`)
      .then((response) => {
        setAllServices(response.data);
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
  }, []);

  const [servicesToRender, setServicesToRender] = useState();
  const [fetchedOptionsToRender, setFetchedOptionsToRender] = useState([]);

  useEffect(() => {
    const result = allServices?.reduce((acc, cur) => {
      const category = cur.category.categoryName;
      const service = {
        _id: cur._id,
        hotelServiceName: cur.hotelServiceName,
      };

      if (!acc[category]) {
        acc[category] = {
          category,
          services: [service],
        };
      } else {
        acc[category].services.push(service);
      }

      return acc;
    }, {});

    const arrayResult = result ? Object.values(result) : [];

    if (allServices) setServicesToRender(arrayResult);
  }, [allServices]);

  useEffect(() => {
    const result = fetchedOptions?.reduce((acc, cur) => {
      const category = cur?.category?.categoryName;
      const service = {
        _id: cur._id,
        hotelServiceName: cur?.hotelServiceName,
        label: cur?.hotelServiceName,
        value: cur?._id,
      };

      if (!acc[category]) {
        acc[category] = {
          category,
          services: [service],
        };
      } else {
        acc[category]?.services?.push(service);
      }

      return acc;
    }, {});

    const arrayResult = result ? Object.values(result) : [];

    if (fetchedOptions) setFetchedOptionsToRender(arrayResult);
  }, [fetchedOptions]);

  // console.log(fetchedOptionsToRender, "fetched options to rendre");

  // comforts: [...JSON.parse(localStorage.getItem("comforts"))],

  const handleSubmit = () => {
    // const values = {
    //   ...hotelData,
    //   comforts: [...JSON.parse(localStorage.getItem("comforts"))],
    // };

    // console.log(values);

    dispatch(addHotel({ ...hotelData, hotelServices: currServices })).then(
      (res) => {
        navigate(`/dashboard/hotel/${res.payload._id}`);
      }
    );
  };

  const [prices, setPrices] = useState([]);

  const handlePriceChange = (roomId, periodId, price) => {
    setPrices((prevPrices) => ({
      ...prevPrices,
      [roomId]: {
        ...prevPrices[roomId],
        [periodId]: price,
      },
    }));
  };

  const [periods, setPeriods] = useState([]);

  useEffect(() => {
    if (hotelData?.periods && hotelData?.periods?.length > 0) {
      setPeriods(hotelData.periods);
    }
  }, [hotelData]);

  // console.log(hotelData.periods, "hotelData.periods");

  const [servs, setServs] = useState();

  useEffect(() => {
    setHotelData({ ...hotelData, hotelServices: servs });
  }, [servs]);

  const [newService, setNewService] = useState({
    hotelServiceName: null,
    category: null,
  });

  const [sources, setSources] = useState([]);
  useEffect(() => {
    setSources(hotelData?.img ? hotelData?.img : []);
  }, [hotelData]);

  const [totChosenServices, setTotChosenServices] = useState([]);

  const [searchable, setIsSearchable] = useState(true);

  const clickUpload = () => imageRef.current.click();

  return (
    <>
      <AdminHead
        text={!editMode ? "Создание нового отеля" : "Редактирование отеля"}
        onClick={() => {
          !editMode
            ? handleSubmit()
            : dispatch(
                updateHotel({
                  ...hotelData,
                  hotelServices: currServices,
                  searchable,
                })
              );
        }}
        headBack={() => {
          navigate(-1);
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
                : [hotelmain, secondary, secondary, secondary, secondary]
            }
          />
          <div className="gen_content-box">
            <div className="gen_title_checkbox">
              <div className="gen_title">Основное об отеле</div>

              {editMode && (
                <div
                  className="toggler-box"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <div
                    style={{
                      fontSize: "14px",
                      marginRight: "5px",
                      fontWeight: "500",
                      width: "fit-content",
                      whiteSpace: "nowrap",
                    }}
                  >
                    Отображать при поиске
                  </div>
                  <label class="switch">
                    <input
                      type="checkbox"
                      checked={searchable}
                      onChange={() => setIsSearchable(!searchable)}
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
                value={hotelData && hotelData.name}
                placeholder="Название"
                onChange={(e) =>
                  setHotelData({ ...hotelData, name: e.target.value })
                }
              />
              <input
                type="text"
                className="primary-input"
                placeholder="Особенность местоположения"
                value={hotelData.locationFeature}
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
                value={hotelData.locationId}
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
                  <>Locations are loading</>
                )}
              </select>
              <input
                type="text"
                className="primary-input"
                value={hotelData.mapLink}
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
                value={hotelData.rating}
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
                value={hotelData.hotelStars}
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
                rows="15"
                style={{ height: "100%" }}
                value={hotelData.description}
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
              {/* {editMode && (
                <>
                  
                  <button
                    onClick={() => imageRef.current.click()}
                    className={`primary-btn`}
                  >
                    Изменить фото
                  </button>
                </>
              )} */}
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
                    <option value="11:00">11:00</option>
                    <option value="12:00">12:00</option>
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
                    <option value="11:00">11:00</option>
                    <option value="12:00">12:00</option>
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
                  <option value={5}>5</option>
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
                  <option value={15}>15</option>
                  <option value={16}>16</option>
                  <option value={17}>17</option>
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
              {allFoods ? (
                <select
                  name="foodType"
                  id=""
                  className="primary-input"
                  value={hotelData?.food?._id}
                  onChange={(e) =>
                    setHotelData({ ...hotelData, food: e.target.value })
                  }
                >
                  {allFoods?.length > 0
                    ? allFoods?.map((food) => {
                        return <option value={food?._id}>{food?.label}</option>;
                      })
                    : null}
                </select>
              ) : null}
              <div className="input_row">
                <input
                  type="number"
                  className="primary-input"
                  name="adultFoodPrice"
                  placeholder="Цена за питание взрослого"
                  value={hotelData?.adultFoodPrice}
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
                  value={hotelData?.kidFoodPrice}
                  onChange={(e) => {
                    setHotelData({
                      ...hotelData,
                      kidFoodPrice: e.target.value,
                    });
                  }}
                />
              </div>
            </div>
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
                          ...hotelData?.payment,
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
            {/* {console.log(fetchedOptions)}
            {console.log(servicesToRender)} */}
            {servicesToRender?.length > 0
              ? servicesToRender?.map((serv, idx) => {
                  return (
                    <ServiceCard
                      onChange={setTotChosenServices}
                      setIsOpen={setIsOpen}
                      number={idx + 1}
                      editMode
                      allServices={allServices}
                      setCurrServices={setCurrServices}
                      necCategory={serv.category}
                      necServices={serv.services.map((el) => {
                        return {
                          ...el,
                          label: el.hotelServiceName,
                          value: el._id,
                        };
                      })}
                      fetchedOptions={
                        fetchedOptionsToRender?.filter(
                          (service) => service.category === serv.category
                        )[0]?.services
                      }
                    />
                  );
                })
              : null}
          </div>
        </Section>

        {editMode ? (
          <>
            <Periods
              periods={periods}
              setPeriods={setPeriods}
              updateHotelData={updateHotelData}
              hotelId={hotelData._id}
              mode="hotel"
            />
            {fetchedHotelData &&
            fetchedHotelData?.periods?.length > 0 &&
            fetchedHotelData?.rooms?.length > 0 ? (
              <Section
                section="tb_section"
                wrapper="tb_wrapper ver shadowed_box"
              >
                <div className="periods_top">
                  <div className="gen_title">Цены на номера</div>
                  <div className="periods_btns">
                    <button className="primary-btn black">Сохранить</button>
                  </div>
                </div>
                <div className="table_wrapper">
                  <table className="periods_table">
                    <thead>
                      <tr>
                        <th>Номера и периоды</th>
                        {hotelData &&
                          hotelData.periods &&
                          hotelData?.periods?.map((period) => (
                            <th key={period._id}>
                              {dateConfig(period.startDay)}.
                              {dateConfig(period.startMonth)} -{" "}
                              {dateConfig(period.endDay)}.
                              {dateConfig(period.endMonth)}
                            </th>
                          ))}
                      </tr>
                    </thead>
                    <tbody>
                      {fetchedHotelData &&
                        fetchedHotelData.rooms &&
                        fetchedHotelData.periods &&
                        prices &&
                        fetchedHotelData?.rooms?.map((room) => (
                          <RoomRow
                            buttonRef={buttonRef}
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

      <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
        <div className="modal-content">
          <div className="modal-title">
            Хотите добавить новую <br /> услугу?
          </div>
          <div className="modal-body">
            <span className="modal-select-text">Название новой услуги</span>
            <select
              name=""
              id=""
              className="primary-input"
              style={{ width: "100%", marginTop: "22px" }}
              onChange={(e) =>
                setNewService({ ...newService, category: e.target.value })
              }
            >
              {allCategories?.map((categ) => {
                return <option value={categ._id}>{categ.categoryName}</option>;
              })}
            </select>
            <Input
              style={{ width: "100%", marginTop: "22px" }}
              placeholder="Услуга"
              onChange={(e) =>
                setNewService({
                  ...newService,
                  hotelServiceName: e.target.value,
                })
              }
            />
            <div className="modal-button">
              <button
                style={{ width: "100%", marginTop: "10px" }}
                className="primary-btn"
                onClick={() => dispatch(addService(newService))}
              >
                <span>Добавить услугу</span>
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default AddHotel;
