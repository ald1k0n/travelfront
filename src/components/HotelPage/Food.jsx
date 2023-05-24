import React from "react";
import CheckBtn from "../Filter/CheckBtn";

const Food = ({
  singleHotel,
  orderTerms,
  setOrderTerms,
  priceData,
  setPriceData,
}) => {
  return (
    <div className="hotel_food-row">
      <div className="body_title-box">
        <div className="body_title">
          Питание{" "}
          <div
            className={`food_tag ${
              singleHotel?.foodIncluded ? "incl" : "notincl"
            }`}
          >
            {singleHotel?.foodIncluded ? "Включено" : "Не включено"}
          </div>
        </div>
        <div className="body_title-text">
          <span>
            Наш отель предлагает гостям уютные номера и великолепный сервис,
            включая 3-х разовое питание на каждый день пребывания.
          </span>
          <span>
            Мы заботимся о качестве и свежести нашей еды, чтобы гости могли
            насладиться здоровым и вкусным питанием в течение всего пребывания.
            Наш шеф-повар готовит блюда из натуральных и свежих ингредиентов, а
            также учитывает предпочтения и потребности каждого гостя.
          </span>
        </div>
      </div>
      <div className="food_box">
        <div className="food_price-box">
          <div className="food_prices">
            {singleHotel?.adultFoodPrice ? (
              <span>Взрослый - {singleHotel?.adultFoodPrice}</span>
            ) : null}
            {singleHotel?.kidFoodPrice ? (
              <span>Детский - {singleHotel?.kidFoodPrice}</span>
            ) : null}
            {singleHotel?.babyFoodInfo ? (
              <span>{singleHotel?.babyFoodInfo}</span>
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
            <CheckBtn isActive={orderTerms.foodIncluded ? true : false} />
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
                  selected={orderTerms.foodIncluded ? false : true}
                >
                  0
                </option>
                {new Array(
                  JSON.parse(localStorage.getItem("agesArray")).filter(
                    (age) => age !== 1000
                  ).length
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
                  selected={orderTerms.foodIncluded ? false : true}
                >
                  0
                </option>
                {new Array(
                  JSON.parse(localStorage.getItem("agesArray")).filter(
                    (age) => age === 1000
                  ).length
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
  );
};

export default Food;
