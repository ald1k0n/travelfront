import React, { useState } from "react";
import { Link } from "react-router-dom";

import eye from "../../assets/room/eye.svg";
import roomphoto from "../../assets/room/room.png";
import bed from "../../assets/room/bed.svg";

import greencheck from "../../assets/room/greencheck.svg";
import declOfNum from "../../components/DayConfig";

const DashRoom = ({ room }) => {
  return (
    <div className="admin_room-card">
      {room ? (
        <>
          <div className="admin_room-card-top">
            <div className="admin_room-img-box">
              <img src={roomphoto} alt="" />
            </div>
            <div className="admin_room-content">
              <div className="admin_room-title">{room.roomName}</div>
              <div className="admin_room-bed row">
                <img src={bed} alt="" />
                {room?.beds?.largeBeds}{" "}
                {declOfNum(room?.beds?.largeBeds, [
                  "большая кровать",
                  "большие кровати",
                ])}
              </div>
              {room?.roomServices ? (
                <RoomTags tags={room?.roomServices} />
              ) : null}
              {room?.totalExtraPlacesAmount ? (
                <ExtraTag extraPlace={room?.totalExtraPlacesAmount} />
              ) : null}
              {console.log(room?.totalExtraPlacesAmount, "total xp")}
            </div>
          </div>
          <div className="admin_room-bot">
            {/* <Link
              to={`/dashboard/room/${room._id}`}
              target={"_blank"}
              className="bottom-btn clear"
            >
              Подробнее <img src={eye} alt="" />
            </Link> */}
            <Link
              to={`/dashboard/room/${room._id}`}
              target={"_blank"}
              className="bottom-btn grey"
            >
              Редактировать
            </Link>
          </div>
        </>
      ) : null}
    </div>
  );
};

export const RoomTags = ({ tags }) => {
  return (
    <div className="admin_room-tags">
      {tags.map((tag, idx) => {
        return idx < 2 ? (
          <div className="room_tag-card">
            <img src={greencheck} alt="" />
            {tag}
          </div>
        ) : null;
      })}
      {tags.length > 2 ? (
        <div className="room_tag-card">
          <img src={greencheck} alt="" />
          {tags.length - 2}
        </div>
      ) : null}
    </div>
  );
};

export const ExtraTag = ({ extraPlace }) => {
  return (
    <div className="extra_place-card filter_title">
      Есть {extraPlace} доп. {declOfNum(extraPlace, ["место", "места"])}
    </div>
  );
};

export default DashRoom;
