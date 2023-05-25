import React, { useState, useEffect } from "react";
import { addOrder, reset } from "../../features/order/orderSlice";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import {
  addHotel,
  getHotels,
  getSingleHotel,
} from "../../features/hotel/hotelSlice";
import yes from "../../assets/orderpage/yes.svg";
import no from "../../assets/orderpage/no.svg";
import arrow from "../../assets/orderpage/arrow-left.svg";
import check from "../../assets/check.svg";

import { PatternFormat } from "react-number-format";

import "./Order.scss";
import { useNavigate } from "react-router-dom";
import { getSingleRoom } from "../../features/room/roomSlice";
import ShortUniqueId from "short-unique-id";
import { API_URL_PROXY } from "../../config/config";

const Order = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const uid = new ShortUniqueId({
    dictionary: "number", // the default
    length: 6,
  });
  const [orderTerms, setOrderTerms] = useState({
    uid: uid(),
    peopleAmount: 1,
    daysAmount: 1,
    startDate: null,
    endDate: null,
    hotel: null,
    room: null,
    sum: 0,
    clientName: "",
    clientEmail: "",
    clientPhone: "",
    clientDateOfBirth: "",
    clientOtherPhone: "",
    extraInfo: "",
  });

  const [clientData, setClientData] = useState({
    endDate: 0,
    startDate: 0,
    peopleAmount: 1,
    daysAmount: 1,
    hotel: null,
    room: null,
    excursions: [],
  });

  useEffect(() => {
    setClientData({
      ...clientData,
      startDate: window.localStorage.getItem("start"),
      endDate: window.localStorage.getItem("end"),
      peopleAmount: window.localStorage.getItem("peopleAmount"),
      daysAmount: window.localStorage.getItem("daysAmount"),
      hotel: window.localStorage.getItem("hotel"),
      room: JSON.parse(window.localStorage.getItem("room")),
      sum: window.localStorage.getItem("sum"),
      excursions: JSON.parse(window.localStorage.getItem("excursions")),
    });
  }, []);

  console.log(clientData, "clientData");

  useEffect(() => {
    setOrderTerms({
      ...orderTerms,
      peopleAmount: +clientData.peopleAmount,
      daysAmount: +clientData.daysAmount,
      excursions: clientData.excursions,
      startDate: clientData.startDate,
      endDate: clientData.endDate,
      hotel: clientData.hotel,
      room: clientData?.room?._id,
      sum: clientData.sum,
    });
  }, [clientData]);

  console.log(orderTerms);

  const [firstFull, setFirstFull] = useState(true);
  const [secondFull, setSecondFull] = useState(true);

  const { singleHotel, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.hotels
  );

  useEffect(() => {
    if (isError) {
      console.log(message);
    }
    if (clientData?.hotel) dispatch(getSingleHotel(clientData?.hotel));
    dispatch(reset());
  }, [clientData.hotel, isError, isSuccess, message, dispatch]);

  const { singleRoom } = useSelector((state) => state.rooms);

  // console.log(clientData.rooms);

  const handleSendOrderEmail = () => {
    if (orderTerms) {
      axios
        .post(`${API_URL_PROXY}/send-order-email`, {
          phone: orderTerms.clientPhone,
          email: orderTerms.clientEmail,
          name: orderTerms.clientName,
          hotel: singleHotel?.name,
          rooms: orderTerms.rooms,
          sum: clientData?.sum,
          startDate: orderTerms?.startDate,
          endDate: orderTerms?.endDate,
          dateOfBirth: orderTerms?.clientDateOfBirth,
        })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const handleSendClientEmail = () => {
    if (orderTerms.clientName && orderTerms.clientEmail) {
      axios
        .post(`${API_URL_PROXY}/send-client-email`, {
          email: orderTerms.clientEmail,
          name: orderTerms.clientName,
        })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const handleOrder = (e) => {
    dispatch(addOrder(orderTerms)).catch((error) => {
      console.log(error);
    });
  };
  console.log(orderTerms);
  return (
    <div className="order_page page">
      <section className="order_section">
        <div className="container order_container">
          <div className="order_all_wrapper wrapper">
            <div className="order_main_wrapper wrapper ver shadowed_box">
              <div className="order_title">Оформление заявки</div>
              <form
                action=""
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendOrderEmail();
                  handleSendClientEmail();
                  handleOrder();
                }}
              >
                <div className="contacts_form">
                  <div className="body_title">Контактные данные</div>
                  <div className="input_row row">
                    <div className="input_box">
                      <div className="input_title">Ваше имя</div>
                      <input
                        type="text"
                        className="order_input icon"
                        placeholder="Кайрат Алтынбеков"
                        required
                        onChange={(e) =>
                          setOrderTerms({
                            ...orderTerms,
                            clientName: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="input_box">
                      <div className="input_title">Эл. почта</div>
                      <input
                        type="text"
                        className="order_input icon"
                        required
                        placeholder="Введите адрес эл. почты"
                        onChange={(e) =>
                          setOrderTerms({
                            ...orderTerms,
                            clientEmail: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="input_box">
                      <div className="input_title">Дата рождения</div>
                      <input
                        type="date"
                        className="order_input icon"
                        required
                        placeholder="Дата рождения"
                        onChange={(e) =>
                          setOrderTerms({
                            ...orderTerms,
                            clientDateOfBirth: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                  <div className="input_row row">
                    <div className="input_box">
                      <div className="input_title">Номер</div>
                      {/* <input
                        type="phone"
                        className="order_input"
                        required
                        placeholder="+7 (...)"
                        onChange={(e) =>
                          setOrderTerms({
                            ...orderTerms,
                            clientPhone: e.target.value,
                          })
                        }
                      /> */}
                      <PatternFormat
                        className="order_input"
                        placeholder="+7 (...)"
                        format="+7 (###) ### ## ##"
                        allowEmptyFormatting={false}
                        mask="."
                        required
                        onChange={(e) =>
                          setOrderTerms({
                            ...orderTerms,
                            clientPhone: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="input_box">
                      <div className="input_title">
                        Второй номер (опционально)
                      </div>
                      {/* <input
                        type="phone"
                        className="order_input"
                        placeholder="+7 (...)"
                        onChange={(e) =>
                          setOrderTerms({
                            ...orderTerms,
                            clientOtherPhone: e.target.value,
                          })
                        }
                      /> */}
                      <PatternFormat
                        className="order_input"
                        placeholder="+7 (...)"
                        format="+7 (###) ### ## ##"
                        allowEmptyFormatting={false}
                        mask="."
                        required
                        onChange={(e) =>
                          setOrderTerms({
                            ...orderTerms,
                            clientOtherPhone: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                  <div className="input_row row">
                    <div className="input_box textarea">
                      <div className="input_title">Особые пожелания</div>
                      <textarea
                        name=""
                        id=""
                        cols="30"
                        rows="10"
                        placeholder="Наш менеджер позвонит вам, чтобы добавить это в ваш заказ"
                        onChange={(e) => {
                          setOrderTerms({
                            ...orderTerms,
                            extraInfo: e.target.value,
                          });
                        }}
                      ></textarea>
                    </div>
                  </div>
                </div>
                <div className="contacts_form note_form">
                  <div className="body_title">На заметку</div>
                  <div className="note_wrapper wrapper">
                    <div
                      className={`note_box shadowed_box ${
                        firstFull ? "full" : ""
                      }`}
                      onClick={() => setFirstFull(!firstFull)}
                    >
                      <div className="note_title">
                        Включено в стоимость{" "}
                        <img src={arrow} alt="" className="arrow" />
                      </div>
                      <div className="note_content">
                        <div className="note_row row">
                          <img src={yes} alt="" /> Заголовок
                        </div>
                        <div className="note_row row">
                          <img src={yes} alt="" /> Заголовок
                        </div>
                        <div className="note_row row">
                          <img src={yes} alt="" /> Заголовок
                        </div>
                        <div className="note_row row">
                          <img src={yes} alt="" /> Заголовок
                        </div>
                        <div className="note_row row">
                          <img src={yes} alt="" /> Заголовок
                        </div>
                      </div>
                    </div>
                    <div
                      className={`note_box shadowed_box ${
                        secondFull ? "full" : ""
                      }`}
                      onClick={() => setSecondFull(!secondFull)}
                    >
                      <div className="note_title">
                        Не включено в стоимость{" "}
                        <img src={arrow} alt="" className="arrow" />
                      </div>
                      <div className="note_content">
                        <div className="note_row row">
                          <img src={no} alt="" /> Заголовок
                        </div>
                        <div className="note_row row">
                          <img src={no} alt="" /> Заголовок
                        </div>
                        <div className="note_row row">
                          <img src={no} alt="" /> Заголовок
                        </div>
                        <div className="note_row row">
                          <img src={no} alt="" /> Заголовок
                        </div>
                        <div className="note_row row">
                          <img src={no} alt="" /> Заголовок
                        </div>
                        <div className="note_row row">
                          <img src={no} alt="" /> Заголовок
                        </div>
                        <div className="note_row row">
                          <img src={no} alt="" /> Заголовок
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="contact_form order_form wrapper">
                  <button className="primary-btn yellow" type="submit">
                    Отправить заявку
                  </button>
                  <div className="agree_box">
                    Все ваши данные под сохранностью благодаря нашей политики
                    обработки персональных данных и пользовательскому соглашению
                  </div>
                </div>
              </form>
            </div>
            <div className="order_side_wrapper wrapper ver shadowed_box">
              <div className="how_title">Как купить?</div>
              <div className="how_content">
                <div className="how_box">
                  <div className="input_title">Заявка</div>
                  <div className="how_text">
                    Выберите тур, который вам нравится и оформите заявку
                  </div>
                </div>
                <div className="how_box">
                  <div className="input_title">Заявка</div>
                  <div className="how_text">
                    Выберите тур, который вам нравится и оформите заявку
                  </div>
                </div>
                <div className="how_box">
                  <div className="input_title">Заявка</div>
                  <div className="how_text">
                    Выберите тур, который вам нравится и оформите заявку
                  </div>
                </div>
                <div className="how_box">
                  <div className="input_title">Заявка</div>
                  <div className="how_text">
                    Выберите тур, который вам нравится и оформите заявку
                  </div>
                </div>
                <div className="how_box">
                  <div className="input_title">Заявка</div>
                  <div className="how_text">
                    Выберите тур, который вам нравится и оформите заявку
                  </div>
                </div>
                <div className="side-top-bot">
                  <div className="check row">
                    <img src={check} alt="" />У нас самые выгодные цены!
                  </div>
                  <div className="check row">
                    <img src={check} alt="" />У нас самые выгодные цены!
                  </div>
                  <div className="check row">
                    <img src={check} alt="" />У нас самые выгодные цены!
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const NoteBox = ({ items }) => {
  const [isFull, setIsFull] = useState(false);
  return (
    <div className="note_box shadowed_box" onClick={() => setIsFull}>
      <div className="note_title">Включено в стоимость</div>
      <div className="note_content">
        <div className="note_row row">
          <img src={no} alt="" /> Заголовок
        </div>
        <div className="note_row row">
          <img src={no} alt="" /> Заголовок
        </div>
        <div className="note_row row">
          <img src={no} alt="" /> Заголовок
        </div>
        <div className="note_row row">
          <img src={no} alt="" /> Заголовок
        </div>
        <div className="note_row row">
          <img src={no} alt="" /> Заголовок
        </div>
        <div className="note_row row">
          <img src={no} alt="" /> Заголовок
        </div>
        <div className="note_row row">
          <img src={no} alt="" /> Заголовок
        </div>
      </div>
    </div>
  );
};

export default Order;
