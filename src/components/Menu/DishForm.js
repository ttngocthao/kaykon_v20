import React from "react";
const DishForm = props => {
  return (
    <div className="input-field">
      <label htmlFor={props.dishId}>Dish's name </label>
      <input
        name={props.dishId}
        id={props.dishId}
        type="text"
        onChange={props.changeHanle}
      />
      <span className="btn__delete-dish" onClick={props.deleteDishFieldHandle}>
        &times;
      </span>
    </div>
  );
};
export default DishForm;
