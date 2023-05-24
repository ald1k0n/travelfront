import React from "react";

const Section = ({ children, section, container, wrapper }) => {
  return (
    <section className={section ? section : ""}>
      <div className={`container ${container ? container : ""}`}>
        <div className={`wrapper ${wrapper ? wrapper : ""}`}>{children}</div>
      </div>
    </section>
  );
};

export default Section;
