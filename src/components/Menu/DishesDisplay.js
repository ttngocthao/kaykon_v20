import React from "react";
const DishesDisplay = props => {
  return (
    <div className="daily-dishes__container">
      <h5>{props.day}</h5>
      <ul>
        {props.dishes &&
          props.dishes.map((dish, indx) => {
            return <li key={indx}>{dish.name}</li>;
          })}
      </ul>
    </div>
  );
};
export default DishesDisplay;
