import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Select from "react-select";
import MultiSelect from "./MultiSelect";

const ServiceCard = ({
  number,
  allServices,
  setIsOpen,
  necServices,
  necCategory,
  setCurrServices,
  onChange,
  editMode,
  fetchedOptions,
}) => {
  const { currServices } = useSelector((state) => state.admin);
  const [options, setOptions] = useState([]);

  useEffect(() => {
    options?.forEach((opt) => {
      if (!currServices.some((el) => el === opt._id))
        dispatch(setCurrServices(opt._id));
    });
  }, [options]);

  const dispatch = useDispatch();

  return (
    <div className="service-card">
      <div className="service-title">
        Категория {number}: {necCategory}
      </div>
      <MultiSelect options={necServices} fetchedOptions={fetchedOptions} />
      <span onClick={() => setIsOpen(true)} className="additional-service">
        Добавить новую услугу
      </span>
    </div>
  );
};

export default ServiceCard;
