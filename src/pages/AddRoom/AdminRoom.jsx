import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { getSingleRoom } from "../../features/room/roomSlice";

import AddRoom from "./AddRoom";

import { useUploadImageMutation } from "../../features/services/upload.service";

const AdminRoom = () => {
  const [uploadImage] = useUploadImageMutation();
  const { roomId } = useParams();
  const dispatch = useDispatch();

  const { singleRoom, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.rooms
  );

  useEffect(() => {
    dispatch(getSingleRoom(roomId));
    console.log("refetched room");
  }, [roomId]);

  return (
    <>
      <AddRoom fetchedRoomData={singleRoom} editMode />
    </>
  );
};

export default AdminRoom;
