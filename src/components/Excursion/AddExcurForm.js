import React, { Component } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
class AddExcurForm extends Component {
  render() {
    return (
      <section className="modal__container">
        <form className="modal__content-wrap">
          <span className="btn__close-modal-box">&times;</span>
          <div className="input-field">
            <label htmlFor="date">Excursion Date</label>
            <DatePicker
            // selected={this.state.date}
            // onChange={this.dateHandleChange}
            // dateFormat="dd-MM-yy"
            />
          </div>
          <div className="input-field">
            <label htmlFor="name">Excursion Name</label>
            {/* <input name="name" onChange={this.handleChange} /> */}
          </div>
          <div className="input-field">
            <label htmlFor="text">Event Content</label>
            {/* <textarea name="text" onChange={this.handleChange} /> */}
          </div>
          <div className="input-field">
            {/* <input name="image" type="file" onChange={this.handleChange} /> */}
          </div>
          <div className="input-field">
            <button className="form-submit-btn">Create</button>
          </div>
        </form>
      </section>
    );
  }
}
export default AddExcurForm;
