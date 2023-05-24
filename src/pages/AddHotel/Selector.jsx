import React, { useState, useEffect } from "react";
import Select from "react-select";

export default function ServiceSelector({
  styles,
  allCategories,
  placeholder,
  onChange,
  data,
  food,
  isServ,
}) {
  const [options, setOptions] = useState([]);
  const [currCateg, setCurrCateg] = useState("Питание");

  console.log(data, "food");

  useEffect(() => {
    if (allCategories && allCategories.length > 0) {
      const filteredOptions = data.filter(
        (el) => el.category.categoryName === currCateg
      );
      setOptions(filteredOptions);
    }
  }, [allCategories, currCateg, data]);

  return (
    <>
      {allCategories && (
        <div className="service-input">
          <label htmlFor="category">Категория</label>
          <select
            name="category"
            className="primary-input"
            id=""
            onChange={(e) => setCurrCateg(e.target.value)}
          >
            {allCategories.map((categ) => (
              <option value={categ.categoryName} key={categ._id}>
                {categ.categoryName}
              </option>
            ))}
          </select>
        </div>
      )}
      <div className="service-input full">
        <Select
          options={food ? data : isServ ? data : options}
          placeholder={placeholder}
          onChange={onChange}
          styles={{
            control: (baseStyles) => ({
              ...baseStyles,
              width: `${550}px`,
              border: "none",
              backgroundColor: "rgb(249, 249, 249)",
              outline: "none",
            }),
          }}
          isSearchable
          isMulti
          useDragHandle
          axis="xy"
        />
      </div>
    </>
  );
}
