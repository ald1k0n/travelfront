import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import RatingBox from "../../components/HotelCard/RatingBox";

import geo from "../../assets/geo.svg";
import map from "../../assets/map.svg";
import clock from "../../assets/clock.svg";
import kids from "../../assets/kids.png";
import divider from "../../assets/hotel/divider.svg";

import "./Camp.scss";
import {
  useGetCampByIdQuery,
  useGetHotelsByTagMutation,
} from "../../features/services/base.service";
import GalleryBox from "../../components/Slider/GalleryBox";
import Recommendation from "../../components/Recommendation/Recommendation";
import HotelLoader from "../../components/Loader/HotelLoader";
import CheckBtn from "../../components/Filter/CheckBtn";
import { useGetCampPriceQuery } from "../../features/services/price.service";

import { setRefetch } from "../../features/search/searchSlice";
import { ExpandableText } from "../../components/HotelPage/ExpandableText";
import Sum from "../../components/HotelPage/Sum";
import TopTags from "../../components/HotelPage/TopTags";
import ClientProgram from "../../components/HotelPage/ClientProgram";
import ClientProgramTest from "../../components/HotelPage/ClientProgramTest";

const Camp = () => {
  const dispatch = useDispatch();

  const { campId } = useParams();

  const { data: singleCamp, isLoading, isError } = useGetCampByIdQuery(campId);

  const [sources, setSources] = useState([]);

  useEffect(() => {
    if (singleCamp?.img) {
      setSources(singleCamp.img);
    } else {
      setSources([]);
    }
  }, [singleCamp]);

  const [
    getData,
    // {
    //   data: recommendation,
    //   isLoading: recommendationIsLoading,
    // },
  ] = useGetHotelsByTagMutation();

  const [recommendation, setRecommendation] = useState([]);

  useEffect(() => {
    getData({
      food: singleCamp && singleCamp.food && singleCamp.food._id,
      comforts: singleCamp && singleCamp.comforts && singleCamp.comforts,
      hotelServices:
        singleCamp && singleCamp.hotelServices && singleCamp.hotelServices,
    }).then((res) => setRecommendation(res.data));
  }, [singleCamp]);

  const [orderTerms, setOrderTerms] = useState({
    amount: 1,
    days: 2,
    startDate: null,
    endDate: null,
    name: "",
    room: "",
    sum: null,
    foodIncluded: false,
  });

  const [clientData, setClientData] = useState({
    endDate: 0,
    startDate: 0,
    peopleAmount: 1,
    daysAmount: 2,
  });

  useEffect(() => {
    setClientData({
      ...clientData,
      startDate: window.localStorage.getItem("startDate"),
      endDate: window.localStorage.getItem("endDate"),
      peopleAmount: window.localStorage.getItem("peopleAmount"),
      daysAmount: window.localStorage.getItem("daysAmount"),
    });
  }, []);

  useEffect(() => {
    setOrderTerms({
      ...orderTerms,
      amount: clientData.peopleAmount,
      days: clientData.daysAmount,
      startDate: clientData.startDate,
      endDate: clientData.endDate,
    });
  }, [clientData]);

  const { clientExcursions, clientRoom } = useSelector((state) => state.client);

  const [priceData, setPriceData] = useState({
    addRoomFood: false,
    addExtraFood: false,
    start: localStorage.getItem("startDate")
      ? JSON.parse(localStorage.getItem("startDate"))
      : "",
    daysAmount: localStorage.getItem("daysAmount")
      ? localStorage.getItem("daysAmount")
      : "",
    agesArray: [],
    campId: campId,
    roomId: clientRoom?._id,
    personMode: false,
    excursionsArray: [],
    kidsFoodAmount: 0,
    adultsFoodAmount: 0,
  });

  useEffect(() => {
    setPriceData((prev) => ({
      ...prev,
      roomId: clientRoom?._id,
    }));
  }, [clientRoom]);

  useEffect(() => {
    const storedAgesArray = JSON.parse(localStorage.getItem("agesArray"));
    if (storedAgesArray) {
      setPriceData((prev) => ({
        ...prev,
        agesArray: storedAgesArray,
      }));
    }
  }, [localStorage.getItem("agesArray")]);

  useEffect(() => {
    setPriceData((prev) => ({
      ...prev,
      excursionsArray: localStorage.getItem("excursions")
        ? JSON.parse(localStorage.getItem("excursions"))
        : [],
    }));
  }, [localStorage.getItem("excursions")]);

  useEffect(() => {
    setPriceData((prev) => ({
      ...prev,
      daysAmount: localStorage.getItem("daysAmount")
        ? localStorage.getItem("daysAmount")
        : 1,
    }));
  }, [localStorage.getItem("daysAmount")]);

  const { searchData } = useSelector((state) => state.search);

  useEffect(() => {
    setPriceData((prev) => ({
      ...prev,
      start: searchData.start ? searchData.start : Date.now(),
    }));
  }, [searchData]);

  const {
    data: price,
    isLoading: priceIsLoading,
    isFetching: priceIsFetching,
    refetch,
  } = useGetCampPriceQuery(priceData);

  useEffect(() => {
    window.localStorage.setItem("sum", price?.sum);
    if (clientRoom)
      window.localStorage.setItem("room", JSON.stringify(clientRoom));
    if (singleCamp) window.localStorage.setItem("hotel", singleCamp?._id);
    if (clientExcursions)
      window.localStorage.setItem(
        "excursions",
        JSON.stringify(clientExcursions)
      );
  }, [price, clientRoom, singleCamp, clientExcursions]);

  useEffect(() => {
    dispatch(setRefetch(refetch));
  }, [price]);

  useEffect(() => {
    if (!orderTerms.foodIncluded) {
      setPriceData((prev) => ({
        ...prev,
        adultsFoodAmount: 0,
        kidsFoodAmount: 0,
      }));
    }
  }, [orderTerms.foodIncluded]);

  // const [points, setPoints] = React.useState([]);

  // useEffect(() => {
  //   if (!isLoading) {
  //     const points =
  //       singleCamp?.program &&
  //       singleCamp?.program
  //         ?.map((item) =>
  //           item.days.length > 0 ? item.days.map((day) => day.points) : []
  //         )
  //         .reduce((prev, curr) => prev.concat(curr));

  //     const days = [...new Set(points?.map((point) => point.day))];

  //     const result = days.map((day) => {
  //       const pointsForDay = points.filter((point) => point.day === day);
  //       const totalPoints = pointsForDay.length;
  //       return {
  //         day,
  //         points: pointsForDay,
  //         totalPoints,
  //       };
  //     });

  //     setPoints(result);
  //   }
  // }, [singleCamp]);

  const [programList, setProgramList] = useState([]);
  useEffect(() => {
    if (singleCamp?.program && singleCamp?.program?.length > 0) {
      setProgramList(singleCamp?.program);
    }
  }, [singleCamp]);

  if (isLoading) {
    return <HotelLoader />;
  }

  return (
    <div className="hotel_page page">
      <section className="hotel_section">
        <div className="hotel_container container">
          {singleCamp ? (
            <div className="hotel_page_wrapper wrapper ">
              <div className="hotel_main_wrapper wrapper ver">
                <div className="hotel_page_top shadowed_box">
                  <div className="hotel_img-box">
                    {sources ? <GalleryBox sources={sources} /> : null}
                  </div>
                  <div className="top_content">
                    <div className="top_heading-row row">
                      <div className="hotel_name">{singleCamp?.name}</div>
                      <RatingBox rating={singleCamp?.rating} starMode />
                    </div>
                    <div className="top_location-row row">
                      <div className="top_location-box">
                        <img src={geo} alt="" />
                        {singleCamp?.locationId
                          ? singleCamp?.locationId.locationName
                          : null}
                        ,{" "}
                        {singleCamp?.locationId
                          ? singleCamp?.locationId.locationCountry
                          : null}
                      </div>
                      <a
                        className="top_location-btn primary-btn"
                        href={singleCamp.mapLink}
                      >
                        <img src={map} alt="" />
                        Посмотреть <br /> на карте
                      </a>
                    </div>
                    <div className="top_desc-row">
                      <div className="desc_title">Описание</div>
                      <div className="desc_box">
                        {singleCamp?.description?.slice(0, 200)}...
                      </div>
                      <a href="#anchor" className="hotel_anchor">
                        Подробнее
                      </a>
                    </div>
                    <div className="top_tags-row">
                      <TopTags services={singleCamp?.hotelServices} />
                    </div>
                  </div>
                </div>
                <div className="hotel_page-gen shadowed_box">
                  <div className="gen_info-row" id="anchor">
                    <div className="body_title-box">
                      <div className="body_title">Об отеле</div>
                      <div className="body_title-text">
                        Расположение: {singleCamp?.locationId?.locationName},{" "}
                        {singleCamp?.locationId?.locationCountry}
                      </div>
                    </div>
                    <div className="schedule-row row">
                      <div className="schedule-box">
                        <img src={clock} alt="" />
                        Заезд с {singleCamp?.enterTime}
                      </div>
                      <div className="schedule-box">
                        <img src={clock} alt="" />
                        Выезд до {singleCamp?.leaveTime}
                      </div>
                    </div>
                    <div className="desc-row">{singleCamp?.description}</div>
                  </div>
                  <img src={divider} alt="" />
                  <div className="hotel_food-row">
                    <div className="body_title-box">
                      <div className="body_title">
                        Питание{" "}
                        <div
                          className={`food_tag ${
                            singleCamp?.foodIncluded ? "incl" : "notincl"
                          }`}
                        >
                          {singleCamp?.foodIncluded
                            ? "Включено"
                            : "Не включено"}
                        </div>
                      </div>
                      <div className="body_title-text">
                        <span>
                          Наш отель предлагает гостям уютные номера и
                          великолепный сервис, включая 3-х разовое питание на
                          каждый день пребывания.
                        </span>
                        <span>
                          Мы заботимся о качестве и свежести нашей еды, чтобы
                          гости могли насладиться здоровым и вкусным питанием в
                          течение всего пребывания. Наш шеф-повар готовит блюда
                          из натуральных и свежих ингредиентов, а также
                          учитывает предпочтения и потребности каждого гостя.
                        </span>
                      </div>
                    </div>
                    <div className="food_box">
                      <div className="food_price-box">
                        <div className="food_prices">
                          {singleCamp?.adultFoodPrice ? (
                            <span>Взрослый - {singleCamp?.adultFoodPrice}</span>
                          ) : null}
                          {singleCamp?.kidFoodPrice ? (
                            <span>Детский - {singleCamp?.kidFoodPrice}</span>
                          ) : null}
                          {singleCamp?.babyFoodInfo ? (
                            <span>{singleCamp?.babyFoodInfo}</span>
                          ) : null}
                        </div>
                      </div>
                      <div className="food_price-form">
                        <div
                          className="filter_content"
                          onClick={() => {
                            setOrderTerms({
                              ...orderTerms,
                              foodIncluded: !orderTerms.foodIncluded,
                            });
                            setPriceData((prev) => ({
                              ...prev,
                              addRoomFood: !prev.addRoomFood,
                            }));
                          }}
                        >
                          <CheckBtn
                            isActive={orderTerms.foodIncluded ? true : false}
                          />
                          Добавить питание
                        </div>
                        <div className="input_row">
                          <div className="service-input">
                            <label htmlFor="">Кол-во детс.</label>
                            <select
                              name=""
                              id=""
                              disabled={priceData.addRoomFood ? false : true}
                              className="primary-input"
                              onChange={(e) => {
                                setPriceData((prev) => ({
                                  ...prev,
                                  kidsFoodAmount: Number(e.target.value),
                                }));
                              }}
                            >
                              <option
                                value={0}
                                selected={
                                  orderTerms.foodIncluded ? false : true
                                }
                              >
                                0
                              </option>
                              {new Array(
                                JSON.parse(
                                  localStorage.getItem("agesArray")
                                ).filter((age) => age !== 1000).length
                              )
                                .fill(0)
                                .map((el, idx) => (
                                  <option value={idx + 1} key={idx}>
                                    {idx + 1}
                                  </option>
                                ))}
                            </select>
                          </div>

                          <div className="service-input">
                            <label htmlFor="">Кол-во взр.</label>
                            <select
                              name=""
                              id=""
                              className="primary-input"
                              disabled={priceData.addRoomFood ? false : true}
                              onChange={(e) => {
                                setPriceData((prev) => ({
                                  ...prev,
                                  adultsFoodAmount: Number(e.target.value),
                                }));
                              }}
                            >
                              <option
                                value="0"
                                selected={
                                  orderTerms.foodIncluded ? false : true
                                }
                              >
                                0
                              </option>
                              {new Array(
                                JSON.parse(
                                  localStorage.getItem("agesArray")
                                ).filter((age) => age === 1000).length
                              )
                                .fill(0)
                                .map((el, idx) => (
                                  <option value={idx + 1} key={idx}>
                                    {idx + 1}
                                  </option>
                                ))}
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <img src={divider} alt="" />
                  <ClientProgramTest programList={programList} />
                </div>
              </div>

              <div className="hotel_side_wrapper wrapper ver">
                <Sum
                  price={price}
                  priceData={priceData}
                  priceIsLoading={priceIsFetching}
                  orderTerms={orderTerms}
                  campMode
                />

                {singleCamp?.locationId?.locationDescription ? (
                  <ExpandableText
                    locationName={singleCamp?.locationId?.locationName}
                    locationDescription={
                      singleCamp?.locationId?.locationDescription
                    }
                  />
                ) : null}

                <div className="kids_box">
                  <img src={kids} alt="" />
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </section>
      <Recommendation recommendation={recommendation} singleCamp={singleCamp} />
    </div>
  );
};

export default Camp;
