import React, { useState } from "react";
import { sortAlphAsc, sortAlphDesc } from "../../features/hotel/hotelSlice";
import {
  sortAlphAsc as sortToursAlphAsc,
  sortAlphDesc as sortToursAlphDesc,
} from "../../features/tour/tourSlice";
import {
  sortAlphAsc as sortSansAlphAsc,
  sortAlphDesc as sortSansAlphDesc,
} from "../../features/sanatorium/sanatoriumSlice";
import {
  sortAlphAsc as sortCampsAlphAsc,
  sortAlphDesc as sortCampsAlphDesc,
} from "../../features/camps/campSlice";
import sort from "../../assets/sort.svg";
import { useDispatch } from "react-redux";

const SortBtn = ({ mode }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const dispatch = useDispatch();
  return (
    <div className="sort-box">
      <div className="sort-btn" onClick={() => setIsExpanded(!isExpanded)}>
        Сортировать{" "}
        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7.70879 4.59998L4.60876 1.5L1.50879 4.59998"
            stroke="#2569D7"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M4.6084 16.5V1.5"
            stroke="#2569D7"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M10.292 13.3999L13.392 16.4999L16.492 13.3999"
            stroke="#2569D7"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M13.3926 1.5V16.5"
            stroke="#2569D7"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>
      {isExpanded ? (
        <div className="sort-dropdown">
          <button
            className="sort-option"
            onClick={() => {
              mode === "hotel"
                ? dispatch(sortAlphDesc())
                : mode === "tour"
                ? dispatch(sortToursAlphDesc())
                : mode === "camp"
                ? dispatch(sortCampsAlphDesc())
                : dispatch(sortSansAlphDesc());
              setIsExpanded(!isExpanded);
            }}
          >
            По алфавиту (убыв.)
          </button>
          <button
            className="sort-option"
            onClick={() => {
              mode === "hotel"
                ? dispatch(sortAlphAsc())
                : mode === "tour"
                ? dispatch(sortToursAlphAsc())
                : mode === "camp"
                ? dispatch(sortCampsAlphAsc())
                : dispatch(sortSansAlphAsc());
              setIsExpanded(!isExpanded);
            }}
          >
            По алфавиту (возр.)
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default SortBtn;
