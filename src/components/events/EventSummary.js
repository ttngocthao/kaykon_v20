import React from "react";

const EventSummary = ({ event }) => {
  //cant use toDate() here as this events are from state (not from firebase database)
  const dateInMiliseconds = new Date(event.date.seconds * 1000);
  const date = dateInMiliseconds.getDate();
  const monthArr = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ];
  const monthIndex = dateInMiliseconds.getMonth();
  const year = dateInMiliseconds.getFullYear();
  const fulldate = `${date} ${monthArr[monthIndex]} ${year}`;
  return (
    <div>
      <h4>{event.name}</h4>
      <p>{fulldate}</p>
      <p>{event.text}</p>
    </div>
  );
};
export default EventSummary;
