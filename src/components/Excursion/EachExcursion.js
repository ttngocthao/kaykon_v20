import React from "react";
import moment from "moment";
const EachExcursion = props => {
  return (
    <div className="excur__excur-wrap">
      <div className="excur__top-wrap">
        <ul className="excur__excur-time">
          <li className="excur__excur-month">
            {moment(props.date).format("MMM YY")}
          </li>
          <li className="excur__excur-date">
            {moment(props.date).format("DD")}
          </li>
        </ul>
        <h4 className="excur__excur-name">
          {props.name} <i className="fas fa-plus-square" />
        </h4>
      </div>
      <div className="excur__text-wrap">
        <figure className="excur__img-wrap">
          <img className="excur__img" src={props.imgUrl} alt={props.excurId} />
        </figure>
        <div className="excur__text">{props.text}</div>
      </div>
    </div>
  );
};
export default EachExcursion;
