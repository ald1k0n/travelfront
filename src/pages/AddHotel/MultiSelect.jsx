import { useState, useEffect } from "react";

import "./MultiSelect.scss";
import { useDispatch, useSelector } from "react-redux";
import { rmCurrServices, setCurrServices } from "../../features/adminSlice";

function MultiSelect({ options, onChange, fetchedOptions }) {
  const dispatch = useDispatch();

  const [selectedOptions, setSelectedOptions] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);

  const { currServices } = useSelector((state) => state.admin);

  useEffect(() => {
    if (fetchedOptions) {
      setSelectedOptions(fetchedOptions);
      fetchedOptions.forEach((o) => {
        if (!currServices.some((el) => el === o._id)) {
          dispatch(setCurrServices(o._id));
        }
      });
    }
  }, [fetchedOptions]);

  const filteredOptions = options.filter(
    (option) =>
      (!searchText && !selectedOptions.some((o) => o.value === option.value)) ||
      (searchText &&
        option.label.toLowerCase().includes(searchText.toLowerCase()) &&
        !selectedOptions.some((o) => o.value === option.value))
  );

  // console.log(selectedOptions, "selected options");

  // console.log("selectedOptions", selectedOptions);

  function handleOptionClick(option) {
    const optionAlreadySelected = selectedOptions.some(
      (o) => o.value === option.value
    );

    if (optionAlreadySelected) {
      setSelectedOptions(
        selectedOptions.filter((o) => o.value !== option.value)
      );
      dispatch(rmCurrServices(option.value));
    } else {
      setSelectedOptions([...selectedOptions, option]);
      dispatch(setCurrServices(option.value));
    }
  }

  function handleSearchInputChange(event) {
    setSearchText(event.target.value);
  }

  function toggleExpansion() {
    setIsExpanded(!isExpanded);
  }

  function handleDeleteOption(option) {
    setSelectedOptions(selectedOptions.filter((o) => o !== option));
    dispatch(rmCurrServices(option.value));
  }

  return (
    <div className="multi-select-container">
      <div className="multi-select-header" onClick={toggleExpansion}>
        <div className="plaques-box">
          {selectedOptions.length > 0 ? (
            selectedOptions.map((option) => (
              <div key={option.value} className="option-plaque">
                <span>{option.label}</span>
                <button
                  type="button"
                  onClick={() => handleDeleteOption(option)}
                  className="delete-option"
                >
                  &times;
                </button>
              </div>
            ))
          ) : (
            <input
              type="text"
              value={searchText}
              onChange={handleSearchInputChange}
              placeholder="Search..."
            />
          )}
        </div>
        <span className="expand-icon">{isExpanded ? "-" : "+"}</span>
      </div>
      {isExpanded && (
        <div className="multi-select-options">
          {filteredOptions.map((option) => (
            <div
              key={option.value}
              onClick={() => handleOptionClick(option)}
              className={`option ${
                selectedOptions.includes(option) ? "selected" : ""
              }`}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MultiSelect;
