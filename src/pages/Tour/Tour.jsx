import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

import { login, reset } from "../../features/auth/authSlice";
import {
  addHotel,
  getHotels,
  getSingleHotel,
} from "../../features/hotel/hotelSlice";
import RatingBox from "../../components/HotelCard/RatingBox";
import { addOrder } from "../../features/order/orderSlice";

import geo from "../../assets/geo.svg";
import map from "../../assets/map.svg";
import tag from "../../assets/tag.svg";
import clock from "../../assets/clock.svg";
import serv from "../../assets/serv.svg";
import check from "../../assets/check.svg";
import person from "../../assets/person.svg";
import calendar from "../../assets/calendar.svg";
import kids from "../../assets/kids.png";
import media from "../../assets/media.svg";
import media1 from "../../assets/media1.svg";
import media2 from "../../assets/media2.svg";
import ad from "../../assets/ad.png";

import room1 from "../../assets/room/1.jpg";
import room2 from "../../assets/room/2.jpg";
import room3 from "../../assets/room/3.jpg";

import TourImage from "../../assets/tour/tour.png";

import pti4ka from "../../assets/hotel/pti4ka.svg";
// import kids from "../../assets/kids.png";

import hotel from "../../assets/hotel.png";
import "./../Hotel/Hotel.scss";
// import Room from "./Room";
import Excursions from "../../components/Excursions/Excursions";
import {
  useGetHotelsByTagMutation,
  useGetRoomByHotelIdLimitQuery,
  useGetTourByIdQuery,
} from "../../features/services/base.service";
import Card from "../../components/Card";
import Section from "../../components/Section";
import Room from "../Hotel/Room";
import Hotels from "./Hotels";
import { useGetTourByTagMutation } from "../../features/services/edit.service";

import Sum from "../../components/HotelPage/Sum";

import style from "./Hotel.module.scss";
import GalleryBox from "../../components/Slider/GalleryBox";
import { useGetTourPriceQuery } from "../../features/services/price.service";
import Services from "../../components/HotelPage/Services";
import { setRefetch } from "../../features/search/searchSlice";
import { ExpandableText } from "../../components/HotelPage/ExpandableText";
import ClientProgram from "../../components/HotelPage/ClientProgram";
import ClientProgramTest from "../../components/HotelPage/ClientProgramTest";

const Tour = () => {
  const navigate = useNavigate();
  const [activeId, setIsActiveId] = useState(null);

  const [points, setPoints] = React.useState([]);
  const { tourId } = useParams();
  const { data: singleTour, isLoading, isError } = useGetTourByIdQuery(tourId);

  const [roomCount, setRoomCount] = useState(3);
  const { clientRoom } = useSelector((state) => state.client);
  const [recommendation, setRecommendation] = useState([]);
  const [getTour, { isLoading: recommendationIsLoading }] =
    useGetTourByTagMutation();

  useEffect(() => {
    if (!isLoading)
      getTour({
        food: singleTour?.food && singleTour?.food,
        locationId: singleTour?.locationId && singleTour?.locationId._id,
        duration: singleTour?.duration && singleTour?.duration,
      }).then(({ data }) => setRecommendation(data));
  }, [singleTour, isLoading]);

  useEffect(() => {
    if (!isLoading) {
      const points =
        singleTour?.program &&
        singleTour?.program
          ?.map((item) =>
            item?.days?.length > 0 ? item?.days?.map((day) => day?.points) : []
          )
          .reduce((prev, curr) => prev.concat(curr));

      const days = [...new Set(points?.map((point) => point?.day))];

      const result = days.map((day) => {
        const pointsForDay = points.filter((point) => point?.day === day);
        const totalPoints = pointsForDay.length;
        return {
          day,
          points: pointsForDay,
          totalPoints,
        };
      });

      setPoints(result);
    }
  }, [singleTour]);

  const [programIdx, setProgramIdx] = useState(null);
  const [priceData, setPriceData] = useState({
    tourId,
    agesArray: localStorage.getItem("agesArray")
      ? JSON.parse(localStorage.getItem("agesArray"))
      : [1000],
    daysAmount: singleTour && singleTour.duration ? singleTour.duration : 1,
    start: localStorage.getItem("startDate")
      ? JSON.parse(localStorage.getItem("startDate"))
      : Date.now(),
  });

  useEffect(() => {
    setPriceData((prev) => ({
      ...prev,
      agesArray: JSON.parse(localStorage.getItem("agesArray")),
    }));
  }, [localStorage.getItem("agesArray")]);

  const dispatch = useDispatch();

  const { searchData } = useSelector((state) => state.search);

  useEffect(() => {
    setPriceData((prev) => ({
      ...prev,
      start: searchData.start ? searchData.start : Date.now(),
    }));
  }, [searchData]);

  const {
    data: price,
    isFetching,
    isLoading: priceIsLoading,
    refetch,
  } = useGetTourPriceQuery(priceData);

  useEffect(() => {
    dispatch(setRefetch(refetch));
  }, [price]);

  const [programList, setProgramList] = useState([]);
  useEffect(() => {
    if (singleTour?.program && singleTour?.program?.length > 0) {
      setProgramList(singleTour?.program);
    }
  }, [singleTour]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="hotel_page page">
      <section className="hotel_section">
        <div className="hotel_container container">
          {singleTour ? (
            <div className="hotel_page_wrapper wrapper ">
              <div className="hotel_main_wrapper wrapper ver">
                <div className="hotel_page_top shadowed_box">
                  <div className="top_img-box">
                    <img src={TourImage} alt="" className="hotel_img-main" />
                  </div>
                  <div className="top_content">
                    <div className="top_heading-row row">
                      <div className="hotel_name">
                        {singleTour && singleTour?.name}
                      </div>
                      <RatingBox rating={singleTour?.rating} />
                    </div>
                    <div className="top_location-row row">
                      <div className="top_location-box">
                        <img src={geo} alt="" />
                        {singleTour?.locationId
                          ? singleTour?.locationId.locationName
                          : null}
                        ,{" "}
                        {singleTour?.locationId
                          ? singleTour?.locationId.locationCountry
                          : null}
                      </div>
                      <button className="top_location-btn primary-btn">
                        <img src={map} alt="" />
                        Посмотреть <br /> на карте
                      </button>
                    </div>
                    <div className="top_desc-row">
                      <div className="desc_title">Описание</div>
                      <div className="desc_box">{singleTour?.description}</div>
                      <a href="#anchor" className="hotel_anchor">
                        Подробнее
                      </a>
                    </div>
                    <div className="top_tags-row">
                      {singleTour && singleTour?.tourServices
                        ? singleTour?.tourServices
                            ?.filter((serv) => serv?.priority === 1)
                            .map((serv) => {
                              return (
                                <div className="hotel_tag" key={serv?._id}>
                                  {serv?.icon ? (
                                    <div
                                      dangerouslySetInnerHTML={{
                                        __html: serv.icon,
                                      }}
                                    />
                                  ) : null}
                                  {serv?.hotelServiceName}
                                </div>
                              );
                            })
                        : null}
                    </div>
                  </div>
                </div>
                <div className="hotel_page-price shadowed_box">
                  <div className="body_title-box">
                    <div className="body_title">Цена</div>
                    <div className="body_title-text">
                      Выберите что хотите добавить в свой тур, чтобы рассчитать
                      стоимость и сравните периоды
                    </div>
                  </div>
                </div>
                <div className="hotel_page-gen shadowed_box">
                  {/* <div className="gen_chosen-row">
                    <div className="body_title-box">
                      {singleTour.hotelId && (
                        <>
                          <div className="body_title" id="anchor">
                            Ваш отель
                          </div>
                          <div className="body_title">
                            <div className={style.hotelTour}>
                              <div className={style.hotelTitleBox}>
                                <div className={style.hotelImage}>
                                  <img src="https://alterainvest.ru/upload/iblock/606/6068fc0ed88b9d6f995d3f1d073cce37.jpg" />
                                </div>
                                <div className={style.hotelTitle}>
                                  <div className={style.hotelName}>
                                    {singleTour.hotelId.name}
                                  </div>
                                  <div className={style.info}>
                                    <div>
                                      Заезд с {singleTour.hotelId.enterTime}
                                    </div>
                                    <div>
                                      Выезд до {singleTour.hotelId.leaveTime}
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <hr />
                              <div className={style.btn_container}>
                                <button
                                  className="load-more-btn"
                                  style={{
                                    padding: "4px",
                                    width: "100%",
                                    color: "black",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                  }}
                                  disabled
                                >
                                  Выбрано
                                </button>
                              </div>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </div> */}
                  <div className="gen_info-row">
                    <div className="body_title-box">
                      <div className="body_title">О туре</div>
                      <div className="body_title-text">
                        Расположение: {singleTour?.locationId?.locationName},{" "}
                        {singleTour?.locationId?.locationCountry}
                      </div>
                    </div>
                    {/* <div className="schedule-row row">
                      <div className="schedule-box">
                        <img src={clock} alt="" />
                        Заезд с {singleTour?.enterTime}
                      </div>
                      <div className="schedule-box">
                        <img src={clock} alt="" />
                        Выезд до {singleTour?.leaveTime}
                      </div>
                    </div> */}
                    <div className="desc-row">
                      {singleTour && singleTour?.description}
                    </div>
                  </div>
                  <div className="hotel_services-row">
                    <div className="body_title-box">
                      <div className="body_title">Услуги тура</div>
                    </div>

                    <Services
                      hotelServices={singleTour && singleTour.tourServices}
                    />
                  </div>

                  <div className="hotel_food-row">
                    <div className="body_title-box">
                      <div className="body_title">
                        Питание{" "}
                        <div className={`food_tag allIn`}>3-х разовое </div>
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
                  </div>
                  <div className="hotel_services-row">
                    <ClientProgramTest programList={programList} />
                    {/* {points.map((point, idx) => (
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
                              className={`tour-arrow ${
                                programIdx === idx ? "rotate" : ""
                              }`}
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
                                      point.points &&
                                      point.points.length - 1 === infoIdx
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
                                      point.points &&
                                      point.points.length - 1 === infoIdx
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
                                      point.points &&
                                      point.points.length - 1 === infoIdx
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
                    ))} */}
                  </div>
                  {/* {console.log(activeId, "active Id")} */}
                  <div className="hotel_page-rooms">
                    {singleTour &&
                      singleTour.hotels.map((hotels, idx) => (
                        <div
                          className={`hotel_page-rooms_hotel `}
                          onClick={() => setIsActiveId(hotels.hotel._id)}
                        >
                          <div className="hotel_page-rooms_counter">
                            Отель {idx + 1}
                          </div>
                          <div className="slider_rooms">
                            <GalleryBox
                              sources={[room1, room2, room3]}
                              isSmall
                            />
                          </div>

                          <Room
                            active={
                              hotels &&
                              hotels.room &&
                              clientRoom &&
                              clientRoom?._id === hotels?.room?._id
                            }
                            isDivided
                            key={hotels && hotels._id}
                            room={hotels && hotels.room}
                          />
                        </div>
                      ))}
                  </div>
                </div>
              </div>
              <div className="hotel_side_wrapper wrapper ver">
                {/* {console.log(
                  singleTour?.hotels[0].hotel._id,
                  activeId,
                  "hotels"
                )} */}
                {/* {console.log(activeId)} */}

                <Sum
                  priceIsLoading={isFetching}
                  price={price && price}
                  clientRoom={
                    singleTour &&
                    singleTour?.hotels &&
                    singleTour?.hotels?.find(
                      (hotel) => hotel?.hotel?._id === activeId
                    )?.room
                  }
                  orderTerms={{
                    mode: "tour",
                    days: singleTour && singleTour.duration,
                    startDate: priceData && priceData.start,
                    name: singleTour && singleTour.name,
                    room:
                      singleTour &&
                      singleTour.hotels &&
                      singleTour?.hotels?.find(
                        (hotel) => hotel?.hotel?._id === activeId
                      )?.room?._id,
                    sum: price && price?.sum,
                    foodIncluded: true,
                    hotel:
                      singleTour &&
                      singleTour?.hotels?.find(
                        (hotel) => hotel?.hotel?._id === activeId
                      )?.hotel?._id,
                    tourId,
                    endDate:
                      priceData.start +
                      singleTour.duration * 60 * 24 * 60 * 1000,
                  }}
                />

                <ExpandableText
                  locationName={singleTour?.locationId?.locationName}
                  locationDescription={
                    singleTour?.locationId?.locationDescription
                  }
                />
                <div className="kids_box">
                  <img src={kids} alt="" />
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </section>
      <Section section="similar_section" wrapper="hotel_similar-wrapper ver">
        <div className="hotel_similar-tour">Похожие туры</div>
        <div className="hotel_similar_text">
          Мы подобрали вам похожие туры. Взгляните, чтобы сравнить
        </div>
        <div className="hotel_similar-body">
          {recommendation?.map((recomm, idx) => (
            <>
              {recomm._id !== tourId && (
                <Card
                  comforts={recomm && recomm.comforts.map((c) => c.name)}
                  id={recomm && recomm._id}
                  isTour
                  stars={recomm && recomm.rating}
                  key={recomm && recomm._id}
                  name={recomm && recomm.name}
                  description={recomm.description}
                  location={`${
                    recomm.locationId && recomm.locationId.locationName
                  }, ${recomm.locationId && recomm.locationId.locationCountry}`}
                  duration={recomm.duration}
                  image={
                    "https://www.state.gov/wp-content/uploads/2019/04/Kazakhstan-2426x1406.jpg"
                  }
                  food={recomm.food[0] && recomm.food[0].label}
                />
              )}
            </>
          ))}
        </div>
      </Section>
    </div>
  );
};

// export const ExpandableText = ({ text }) => {
//   const [isExpanded, setIsExpanded] = useState(true);

//   const truncatedText = text?.slice(0, 200);
//   const displayText = isExpanded ? text : truncatedText;

//   return (
//     <div className={`side_about-box shadowed_box small`}>
//       <div className="body_title-box">
//         <div className="body_title">Про Туркестан </div>
//         <div className="body_title-text">
//           {displayText}
//           {!isExpanded ? "..." : ""}
//         </div>
//         <button className="more-btn" onClick={() => setIsExpanded(!isExpanded)}>
//           {isExpanded ? "Свернуть" : "Больше"}
//         </button>
//       </div>
//     </div>
//   );
// };

export default Tour;
