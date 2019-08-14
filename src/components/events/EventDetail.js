import React from "react";
import moment from "moment";

import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";

const EventDetail = props => {
  const { event } = props;
  console.log("event detail", props);
  if (event) {
    console.log(event.date.toDate());
    return (
      <div>
        <h3>{event.name}</h3>
        <h4>{moment(event.date.toDate()).format("DD MMM YYYY")}</h4>

        <div>{event.text}</div>
      </div>
    );
  }
  return <div>...loading</div>;
};
const mapStateToProps = (state, ownProps) => {
  // console.log(ownProps,'ownProps')
  const eventId = ownProps.match.params.id;
  const events = state.firestore.data.events;
  // console.log(events,'events')
  const event = events ? events[eventId] : null;
  return {
    event: event
  };
};
export default compose(
  connect(mapStateToProps),
  firestoreConnect([{ collection: "events" }])
)(EventDetail);
