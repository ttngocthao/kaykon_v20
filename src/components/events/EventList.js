import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { compose } from "redux";

import EventSummary from "./EventSummary";

import { getAllEvents, deleteEvent } from "../../store/actions/eventAction";

class EventList extends Component {
  componentDidMount() {
    this.props.getAllEvents();
  }
  render() {
    const { events, auth } = this.props;
    let eventListContent;
    if (events.length === 0) {
      eventListContent = <p>There is no event in the list</p>;
    } else {
      eventListContent = events.map((event, indx) => {
        return (
          <div key={indx} className="event-summary__wrapper">
            {auth.uid && (
              <p onClick={() => this.props.deleteEvent(event.id)}>&times;</p>
            )}
            <Link to={`events/${event.id}`}>
              <EventSummary event={event} />
            </Link>
          </div>
        );
      });
    }
    return (
      <div>
        <h3>This is an event list</h3>
        {events ? eventListContent : <p>Loading...</p>}
      </div>
    );
  }
}
const mapStateToProps = state => {
  //console.log("eventlist", state);
  return {
    events: state.event.events,
    auth: state.firebase.auth
  };
};
const mapDispatchToProps = dispatch => {
  return {
    getAllEvents: () => dispatch(getAllEvents()),
    deleteEvent: eventId => dispatch(deleteEvent(eventId))
  };
};
export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(EventList);
