import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Loader from "../Loader";

import check from "../../assets/check.svg";
import person from "../../assets/person.svg";
import SumLoader from "../SumLoader";
import { addOrder } from "../../features/order/orderSlice";

const Sum = ({
  price,
  priceData,
  clientRoom,
  priceIsLoading,
  orderTerms,
  campMode,
  priceError,
  priceHasError,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formatter = Intl.NumberFormat("ru-RU");
  const handleOrder = (e) => {
    e.preventDefault();
    const values = {
      ...orderTerms,
      room: clientRoom?._id,
    };
    dispatch(addOrder(values));
    navigate("/orders/new-order");
    console.log(values);
  };
  return (
    <div className="hotel_side-top shadowed_box">
      <div className="hotel_side-title">Бронирование</div>

      <div
        style={{
          position: "relative",
        }}
      >
        <div
          style={{
            opacity: `${priceIsLoading ? "0.2" : "1"}`,
            position: "relative",
          }}
        >
          <div>
            {!priceError?.data?.error ? (
              <>
                {!campMode && clientRoom?._id ? (
                  <>
                    {price?.roomSum ? (
                      <div className="hotel_side-checksum">
                        <span>{clientRoom.roomName}</span>
                        <span className="price_span">
                          {formatter.format(price?.roomSum)} тг.
                        </span>
                      </div>
                    ) : null}
                    {price?.livingSum ? (
                      <>
                        <div className="hotel_side-checksum">
                          <span>Проживание</span>
                          <span className="price_span">
                            {formatter.format(price?.livingSum)} тг.
                          </span>
                        </div>
                        <div className="hotel_side-extraPlace">
                          для{" "}
                          {price?.adultsAmount > 0 ? (
                            <>{price?.adultsAmount} взр.</>
                          ) : null}
                          {price?.kidsAmount > 0 ? (
                            <>, {price?.kidsAmount} дет.</>
                          ) : null}{" "}
                        </div>
                      </>
                    ) : null}
                    {price?.extraPlacesSum && price?.extraPlacesSum !== 0 ? (
                      <div className="hotel_side-extraPlace">
                        <span>
                          +{" "}
                          {JSON.parse(localStorage.getItem("agesArray"))
                            .length - clientRoom.capacity}{" "}
                          доп. места
                        </span>
                        <span className="price_span">
                          {price && formatter.format(price?.extraPlacesSum)}
                          тг
                        </span>
                      </div>
                    ) : null}
                    {priceData?.excursionsArray.length > 0 && (
                      <>
                        <div className="hotel_side-checksum">
                          <div>Экскурсия</div>
                          <span className="price_span">
                            {price && formatter.format(price?.excursionsSum)}{" "}
                            тг.
                          </span>
                        </div>
                        <div className="hotel_side-extraPlace">
                          {JSON.parse(localStorage.getItem("agesArray")).reduce(
                            (acc, current) => {
                              if (current === 1000) {
                                return acc + 1;
                              }
                              return acc;
                            },
                            0
                          )}{" "}
                          взр.{" "}
                          {JSON.parse(localStorage.getItem("agesArray")).reduce(
                            (acc, current) => {
                              if (current !== 1000) {
                                return acc + 1;
                              }
                              return acc;
                            },
                            0
                          )}{" "}
                          дет.
                        </div>
                      </>
                    )}
                    {price?.foodSum && price?.foodSum !== 0 ? (
                      <>
                        <div className="hotel_side-checksum">
                          <div>Питание</div>
                          <span className="price_span">
                            {price && formatter.format(price?.foodSum)} тг.
                          </span>
                        </div>
                        <div className="hotel_side-extraPlace">
                          для{" "}
                          {price?.adultsFoodAmount > 0 ? (
                            <>{price?.adultsFoodAmount} взр.</>
                          ) : null}
                          {price?.kidsFoodAmount > 0 ? (
                            <>, {price?.kidsFoodAmount} дет.</>
                          ) : null}{" "}
                        </div>
                      </>
                    ) : null}
                    {/* {price?.margeSum && price?.margeSum !== 0 ? (
                  <>
                    <div className="hotel_side-checksum">
                      <div>Маржа</div>
                      <span className="price_span">
                        {price && formatter.format(price?.margeSum)} тг.
                      </span>
                    </div>
                    <div className="hotel_side-extraPlace">
                      <span>10 %</span>
                    </div>
                  </>
                ) : null} */}
                  </>
                ) : null}

                {campMode ? (
                  <>
                    <>
                      <div className="hotel_side-checksum">
                        <span>Проживание</span>
                        <span className="price_span">
                          {formatter.format(price?.livingSum)} тг.
                        </span>
                      </div>
                      <div className="hotel_side-extraPlace">
                        для{" "}
                        {price?.kidsAmount > 0 ? (
                          <>{price?.kidsAmount} дет.</>
                        ) : null}
                      </div>
                      {price?.margeSum && price?.margeSum !== 0 ? (
                        <>
                          <div className="hotel_side-checksum">
                            <div>Маржа</div>
                            <span className="price_span">
                              {price && formatter.format(price?.margeSum)} тг.
                            </span>
                          </div>
                          <div className="hotel_side-extraPlace">
                            <span>10 %</span>
                          </div>
                        </>
                      ) : null}
                    </>
                  </>
                ) : null}
                <div className="hotel_side-row total">
                  Итого:
                  <div>
                    <span>
                      {price?.sum ? formatter.format(price?.sum) : "0"}
                      тг.
                    </span>
                  </div>
                </div>
              </>
            ) : (
              <div className="price_error">{priceError.data.error}</div>
            )}
          </div>
        </div>
        {priceIsLoading ? <SumLoader /> : null}
      </div>

      <Link
        to="/orders/new-order"
        className="primary-btn yellow"
        onClick={handleOrder}
      >
        Оставить заявку
      </Link>
      <div className="side-top-bot">
        <div>
          <img src={check} alt="" /> У нас самые выгодные цены!
        </div>
        <div>
          <img src={check} alt="" /> Официальный турагент
        </div>
      </div>
    </div>
  );
};

export default Sum;
