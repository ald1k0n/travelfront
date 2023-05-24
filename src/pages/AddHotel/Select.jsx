import React, { useState, useEffect } from "react";

import Select from "react-select";

export default function Selector({
  allCategories,
  optionList,
  thisCategServices,
  styles,
  placeholder,
  queryOption,
  foodOption,
}) {
  const [options, setOptions] = useState([]);
  const [currCateg, setCurrCateg] = useState("Питание");

  useEffect(() => {
    if (foodOption) {
      localStorage.setItem("food", JSON.stringify(options.map((o) => o._id)));
    } else {
      localStorage.setItem(
        "comforts",
        JSON.stringify(options.map((o) => o.value))
      );
    }
  }, [options]);

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
            {allCategories && allCategories.length > 0
              ? allCategories?.map((categ, idx) => {
                  return (
                    <option value={categ.categoryName} key={categ._id}>
                      {categ.categoryName}
                    </option>
                  );
                })
              : null}
          </select>
        </div>
      )}

      <div className="service-input full">
        {allCategories && <label htmlFor="service">Услуги и удобства</label>}

        <Select
          styles={styles && styles}
          options={
            allCategories
              ? optionList.filter((serv) => serv.category === currCateg)
              : foodOption
              ? foodOption
              : optionList
          }
          placeholder={placeholder && placeholder}
          value={options}
          onChange={(option) => {
            setOptions(option);
          }}
          isSearchable={true}
          isMulti
          useDragHandle
          axis="xy"
        />
      </div>
    </>
  );
}
