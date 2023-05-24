import React from "react";

export const AdminAddForm = ({ children, img }) => {
  return (
    <section className="add_gen-section">
      <div className="container">
        <div className="add_gen-wrapper wrapper shadowed_box">
          <div className="gen_img-box">{/* <img src={img} alt="" /> */}</div>

          {children}
        </div>
      </div>
    </section>
  );
};
