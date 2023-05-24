import React, { useState } from "react";
import "./HotelPage.scss";

export const ExpandableText = ({ locationDescription, locationName }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const truncatedText = locationDescription?.slice(0, 200);
  const displayText = isExpanded ? locationDescription : truncatedText;

  return (
    <div
      className={`side_about-box shadowed_box ${isExpanded ? "long" : "short"}`}
    >
      <div className="body_title-box">
        <div className="body_title">Про {locationName} </div>
        <div className="body_title-text">
          {displayText}
          {!isExpanded ? "..." : ""}
        </div>
        <button className="more-btn" onClick={() => setIsExpanded(!isExpanded)}>
          {isExpanded ? "Свернуть" : "Больше"}
        </button>
      </div>
    </div>
  );
};
