import React, { Component } from "react";
import { Redirect } from "react-router-dom";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { connect } from "react-redux";

import { compose } from "redux";
import { firebaseConnect } from "react-redux-firebase";

import { createEvent } from "../../store/actions/eventAction";

class EventForm extends Component {
  state = { name: "", date: "", text: "" };
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  dateHandleChange = date => {
    this.setState({
      date: date
    });
  };
  handleSubmit = e => {
    e.preventDefault();
    this.props.createEvent(this.state);
    //direct to events page after create a new event
    this.props.history.push("/events");
  };
  render() {
    //console.log("redirect", this.props);
    return (
      <form className="form form--create-event" onSubmit={this.handleSubmit}>
        this is the form to create a new event
        <h3>Create a new event</h3>
        <div className="input-field">
          <label htmlFor="name">Event Name</label>
          <input name="name" onChange={this.handleChange} />
        </div>
        {/* <div className="input-field">
          <label htmlFor="date">Event Date</label>
          <input name="date" onChange={this.handleChange} />
        </div> */}
        <div className="input-field">
          <label htmlFor="date">Event Date</label>
          <DatePicker
            selected={this.state.date}
            onChange={this.dateHandleChange}
            dateFormat="dd-MM-yy"
          />
        </div>
        <div className="input-field">
          <label htmlFor="text">Event Content</label>
          <textarea name="text" onChange={this.handleChange} />
        </div>
        <div className="input-field">
          <button className="form-submit-btn">Create</button>
        </div>
      </form>
    );
  }
}
const mapStateToProps = state => {
  //console.log("eventForm", state);
  return {};
};
const mapDispatchToProps = dispatch => {
  return {
    createEvent: event => dispatch(createEvent(event))
  };
};
export default compose(
  firebaseConnect(),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(EventForm);
