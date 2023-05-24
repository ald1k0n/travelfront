import React from "react";
import { useDispatch } from "react-redux";
import { setTag } from "../../features/clientSlice";
import { Link, useLocation } from "react-router-dom";

const SearchTag = ({
  icon,
  text,
  active,
  handleTagChange,
  changeTag,
  path,
}) => {
  const location = useLocation();
  return (
    // <button
    //   className={`search-btn ${active ? "active" : ""}`}
    //   onClick={() => dispatch(setTag(text))}
    // >
    //   <div className="tag_icon">{icon}</div>
    //   {text}
    // </button>
    <Link
      className={`search-btn ${location.pathname === path ? "active" : ""}`}
      to={path}
    >
      <div className="tag_icon">{icon}</div>
      {text}
    </Link>
  );
};

export default SearchTag;
