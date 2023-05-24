import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getSingleSanatorium } from "../../features/sanatorium/sanatoriumSlice";
import AddSanatorium from "./AddSanatorium";

const EditSanatorium = () => {
  const dispatch = useDispatch();
  const { sanatoriumId } = useParams();
  const { singleSanatorium } = useSelector((state) => state.sanatoriums);
  useEffect(() => {
    dispatch(getSingleSanatorium(sanatoriumId));
  }, [sanatoriumId]);

  const updateSanatoriumData = () => {
    dispatch(getSingleSanatorium(sanatoriumId));
  };

  console.log(singleSanatorium);
  return (
    <>
      <div className="admin_hotel-page page">
        <AddSanatorium
          fetchedSanatoriumData={singleSanatorium}
          updateSanatoriumData={updateSanatoriumData}
          editMode
        />
      </div>
    </>
  );
};

export default EditSanatorium;
