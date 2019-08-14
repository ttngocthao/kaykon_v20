import React from "react";
const ModalImg = props => {
  return (
    <div className="modal__container">
      <div className="modal__content-wrap">
        <span
          className="btn__close-modal-box"
          onClick={props.exitViewImgHandle}
        >
          &times;
        </span>
        <figure className="modal__img-container">
          <img src={props.src} alt="" className="modal__image" />
        </figure>
      </div>
    </div>
  );
};
export default ModalImg;
