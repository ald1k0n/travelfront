import React from "react";

import { addClientRoom, removeClientRoom } from "../../features/clientSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useUploadImageMutation } from "../../features/services/upload.service";

import "./Room.scss";
import CheckBtn from "../../components/Filter/CheckBtn";
import AdditionalTag from "./AdditionalTag";
import declOfNum from "../../components/DayConfig";
import { RoomTags } from "../AddHotel/DashRoom";

import green_bed from "../../assets/hotel/green_bed.svg";
import roompic from "../../assets/room.png";
import bed from "../../assets/bed.svg";
import food from "../../assets/food.svg";

const Room = ({
  room,
  active,
  days,
  sum,
  hasExtraPlaces,
  extraPlaces,
  changeExtraFood,
  extraFoodActive,
  isDivided,
}) => {
  const [uploadImage] = useUploadImageMutation();
  const dispatch = useDispatch();
  const [bedCount, setBedCount] = React.useState(
    room?.beds?.largeBeds + room?.beds?.smallBeds
  );

  const [tags] = React.useState([
    `${room?.bathroom?.type === "Ванна" ? "Ванна" : "Душ"}`,
    room?.bathExtras,
    room?.roomServices,
  ]);

  return (
    <div
      className={`room_box  ${
        active ? "active" : isDivided ? "divided_room" : ""
      }`}
      onClick={() => {
        active
          ? dispatch(removeClientRoom(room._id))
          : dispatch(addClientRoom(room));
      }}
    >
      <div className="rooms_top">
        <img src={roompic} pic alt="" />
        <div className="room_top-content">
          {room?.roomName}
          <div className="additional_tag">
            <AdditionalTag text={`${bedCount} кровати`} img={bed} />
            {hasExtraPlaces ? (
              <AdditionalTag
                text={`${extraPlaces} доп. ${declOfNum(extraPlaces, [
                  "место",
                  "места",
                  "мест",
                ])}`}
                img={green_bed}
                green
              />
            ) : null}
          </div>
          <RoomTags tags={tags.flat()} />
        </div>
      </div>

      {hasExtraPlaces && !room?.extraFoodIncluded ? (
        <div className="rooms_mid">
          <div className="rooms_mid-col left">
            <div className="rooms_mid-col-top">
              Этот номер с дополнительными местами.
            </div>
            <div className="rooms_mid-col-bot">
              <div
                className="filter_content"
                onClick={(e) => {
                  e.stopPropagation();
                  changeExtraFood();
                }}
              >
                <CheckBtn isActive={extraFoodActive} />
                Учитывать питание
              </div>
            </div>
          </div>
          <div className="rooms_mid-col">
            <div className="rooms_extraprice-row"></div>
          </div>
        </div>
      ) : null}

      {/* <div className="rooms_bot">
        <div className="room_bot-left">
          <div className="room_bot-row">
            Цена номера на{" "}
            {new Date(+localStorage.getItem("startDate")).toLocaleDateString(
              "en-GB"
            )}
          </div>
          <div className="room_bot-row">{room?.roomPrice} тг/ночь</div>
        </div>
        <div className="room_bot-right">
          <div className="room_bot-row">Итого за отель</div>
          <div className="room_bot-row">{sum} тг</div>
        </div>
      </div> */}
    </div>
  );
};

export default Room;
