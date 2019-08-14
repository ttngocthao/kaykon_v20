import React from "react";
import DishesDisplay from "./DishesDisplay";

const MenuDisplay = props => {
  const { item, auth } = props;

  return (
    <div className="weekly-menu__container">
      {auth.uid && (
        <span className="btn__delete-menu" onClick={props.deleteMenuHandle}>
          &times;
        </span>
      )}

      <h4>
        From {item.from} to {item.to}
      </h4>
      <DishesDisplay day="Monday" dishes={item.mon} />
      <DishesDisplay day="Tuesday" dishes={item.tue} />
      <DishesDisplay day="Wednesday" dishes={item.wed} />
      <DishesDisplay day="Thursday" dishes={item.thu} />
      <DishesDisplay day="Friday" dishes={item.fri} />
    </div>
  );
};

export default MenuDisplay;
