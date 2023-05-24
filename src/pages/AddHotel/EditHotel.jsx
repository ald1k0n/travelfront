import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import {
  getSingleHotel,
  updateHotel,
  reset,
} from "../../features/hotel/hotelSlice";

import { setNewHotelData } from "../../features/adminSlice";

import "./AddHotel.scss";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { AdminHead } from "../../components/Admin";

import { useUploadImageMutation } from "../../features/services/upload.service";

import AddHotel from "./AddHotel";
import DashRoom from "./DashRoom";
import Table from "../../components/Table";
import {
  useGetRoomsQuery,
  useUploadCsvMutation,
} from "../../features/services/csv.service";

const EditHotel = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { hotelId } = useParams();
  const { singleHotel, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.hotels
  );

  const { data, isLoading: isRoomLoaded } = useGetRoomsQuery(hotelId);

  const [upload, { isLoading: isUploading }] = useUploadCsvMutation();

  const [uploadImage, { data: imageUrls, isLoading: imgIsLoading }] =
    useUploadImageMutation();

  const handleFile = async (e) => {
    let formData = new FormData();
    formData.append("file", e.target.files[0]);
    let obj = {
      id: hotelId,
      file: formData,
    };
    await upload(obj)
      .then((response) => console.log(response))
      .catch((err) => console.error(err))
      .finally(() => (importRef.current.value = null));
  };

  const handleUpload = (e) => {
    const files = e.target.files;

    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append("images", files[i]);
    }

    const values = {
      id: hotelId,
      formData,
      name: "hotels",
    };

    upload(values)
      .then((response) => console.log(response))
      .then((importRef.current.value = null))
      .catch((err) => console.error(err));
  };

  const importRef = useRef(null);

  useEffect(() => {
    if (isError) {
      console.log(message);
    }
    if (hotelId) dispatch(getSingleHotel(hotelId));
    dispatch(reset());
  }, [hotelId]);

  const handleUploadImage = (e) => {
    const files = e.target.files;

    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append("images", files[i]);
    }

    const values = {
      id: hotelId,
      formData,
      name: "hotels",
    };

    uploadImage(values)
      .then((response) => {
        dispatch(getSingleHotel(hotelId));
      })
      .catch((err) => console.error(err));
  };

  const updateHotelData = () => {
    dispatch(getSingleHotel(hotelId));
  };

  return (
    <>
      <div className="admin_hotel-page page">
        <AddHotel
          fetchedHotelData={singleHotel}
          editMode
          updateHotelData={updateHotelData}
          handleUploadImage={handleUploadImage}
        />
        <section className="admin_rooms-section">
          <div className="container">
            <div className="admin_rooms-wrapper wrapper ver shadowed_box">
              <div className="admin_rooms-top">
                <div
                  className="gen_title"
                  onClick={() => console.log(singleHotel)}
                >
                  Номера
                </div>
                <Link
                  to={`/dashboard/hotel/${hotelId}/add-room`}
                  className="primary-btn"
                >
                  Добавить номер
                </Link>
              </div>
              <div className="admin_rooms-grid">
                {singleHotel?.rooms && singleHotel?.rooms?.length > 0
                  ? singleHotel?.rooms.map((room, idx) => {
                      return <DashRoom room={room} />;
                    })
                  : null}
                {/* {console.log("rooms", singleHotel.rooms)} */}
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default EditHotel;
