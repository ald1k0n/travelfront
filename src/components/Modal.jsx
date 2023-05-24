import { useState, useRef } from "react";
import style from "./Modal.module.scss";

const Modal = ({ children, isOpen, setIsOpen }) => {
  const containerRef = useRef(null);
  function handleClick(e) {
    if (e.target === containerRef.current) {
      setIsOpen(!isOpen);
    }
  }
  return (
    <>
      {isOpen && (
        <div
          className={style.modal_container}
          ref={containerRef}
          onClick={handleClick}
        >
          <div className={style.close} onClick={() => setIsOpen(false)}>
            X
          </div>
          <div className={style.modal}>{children}</div>
        </div>
      )}
    </>
  );
};

export default Modal;
