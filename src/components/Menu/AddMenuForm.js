import React, { Component } from "react";

import { connect } from "react-redux";
import { compose } from "redux";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import DishForm from "./DishForm";

import { createMenu } from "../../store/actions/menuAction";

class AddMenuForm extends Component {
  state = {
    monMenu: [{ name: "" }],
    tueMenu: [{ name: "" }],
    wedMenu: [{ name: "" }],
    thuMenu: [{ name: "" }],
    friMenu: [{ name: "" }],
    startDate: "",
    endDate: ""
  };

  addMoreDishHandle = menuDay => {
    //e.preventDefault();
    switch (menuDay) {
      case "mon":
        this.setState({
          monMenu: [...this.state.monMenu, { name: "" }]
        });
        break;
      case "tue":
        this.setState({
          tueMenu: [...this.state.tueMenu, { name: "" }]
        });
        break;
      case "wed":
        this.setState({
          wedMenu: [...this.state.wedMenu, { name: "" }]
        });
        break;
      case "thu":
        this.setState({
          thuMenu: [...this.state.thuMenu, { name: "" }]
        });
        break;
      case "fri":
        this.setState({
          friMenu: [...this.state.friMenu, { name: "" }]
        });
        break;
      default:
        console.log("this is from addMoreDishHandle function");
    }
  };
  deleteDishFieldHandle = (menuDay, index) => {
    switch (menuDay) {
      case "mon":
        if (this.state.monMenu.length === 1) {
          console.log("cant delete");
          return;
        }
        this.setState({
          monMenu: this.state.monMenu.filter(
            (dish, dishIndx) => dishIndx !== index
          )
        });
        break;
      case "tue":
        if (this.state.tueMenu.length === 1) {
          console.log("cant delete");
          return;
        }
        this.setState({
          tueMenu: this.state.tueMenu.filter(
            (dish, dishIndx) => dishIndx !== index
          )
        });
        break;
      case "wed":
        if (this.state.wedMenu.length === 1) {
          console.log("cant delete");
          return;
        }
        this.setState({
          wedMenu: this.state.wedMenu.filter(
            (dish, dishIndx) => dishIndx !== index
          )
        });
        break;
      case "thu":
        if (this.state.thuMenu.length === 1) {
          console.log("cant delete");
          return;
        }
        this.setState({
          thuMenu: this.state.thuMenu.filter(
            (dish, dishIndx) => dishIndx !== index
          )
        });
        break;
      case "fri":
        if (this.state.friMenu.length === 1) {
          console.log("cant delete");
          return;
        }
        this.setState({
          friMenu: this.state.friMenu.filter(
            (dish, dishIndx) => dishIndx !== index
          )
        });
        break;
      default:
        console.log("this is from deleteDishFieldHandle function");
    }
  };
  onChangeDishNameHandle = (dayMenu, index) => e => {
    let newMenu;
    switch (dayMenu) {
      case "mon":
        newMenu = this.state.monMenu.map((dish, dishIndex) => {
          if (index !== dishIndex) return dish;
          return { ...dish, name: e.target.value };
        });
        this.setState({
          monMenu: newMenu
        });
        break;
      case "tue":
        newMenu = this.state.tueMenu.map((dish, dishIndex) => {
          if (index !== dishIndex) return dish;
          return { ...dish, name: e.target.value };
        });
        this.setState({
          tueMenu: newMenu
        });
        break;
      case "wed":
        newMenu = this.state.wedMenu.map((dish, dishIndex) => {
          if (index !== dishIndex) return dish;
          return { ...dish, name: e.target.value };
        });
        this.setState({
          wedMenu: newMenu
        });
        break;
      case "thu":
        newMenu = this.state.thuMenu.map((dish, dishIndex) => {
          if (index !== dishIndex) return dish;
          return { ...dish, name: e.target.value };
        });
        this.setState({
          thuMenu: newMenu
        });
        break;
      case "fri":
        newMenu = this.state.friMenu.map((dish, dishIndex) => {
          if (index !== dishIndex) return dish;
          return { ...dish, name: e.target.value };
        });
        this.setState({
          friMenu: newMenu
        });
        break;
      default:
        console.log("failed to make onChange input worked");
    }
    console.log("onChange Dishes", this.state);
  };
  handleChangeStart = startDate => this.handleDateChange({ startDate });
  handleChangeEnd = endDate => this.handleDateChange({ endDate });
  handleDateChange = ({ startDate, endDate }) => {
    startDate = startDate || this.state.startDate;
    endDate = endDate || this.state.endDate;
    this.setState({ startDate, endDate });
  };

  submitHandle = e => {
    e.preventDefault();
    console.log("this.state", this.state);
    this.props.createMenu(this.state);
    this.props.history.push("/menu");
  };
  render() {
    const { monMenu, tueMenu, wedMenu, thuMenu, friMenu } = this.state;
    return (
      <div>
        <h2>Add new menu for the week</h2>
        <form>
          <div className="input-field">
            <label htmlFor="dateFrom">From </label>
            <DatePicker
              dateFormat="dd-MM-yy"
              selected={this.state.startDate}
              selectsStart
              startDate={this.state.startDate}
              endDate={this.state.endDate}
              onChange={this.handleChangeStart}
            />
          </div>
          <div className="input-field">
            <label htmlFor="dateTo">To </label>
            <DatePicker
              dateFormat="dd-MM-yy"
              selected={this.state.endDate}
              selectsEnd
              startDate={this.state.startDate}
              endDate={this.state.endDate}
              onChange={this.handleChangeEnd}
              minDate={this.state.startDate}
            />
          </div>
          {/* MONDAY */}
          <section className="daily-menu__container">
            <h5>Monday</h5>
            {monMenu.map((dish, indx) => {
              const dishId = `monMenu-${indx}`;
              return (
                <DishForm
                  key={indx}
                  dishId={dishId}
                  value={dish.name}
                  name={dishId}
                  changeHanle={this.onChangeDishNameHandle("mon", indx)}
                  deleteDishFieldHandle={() =>
                    this.deleteDishFieldHandle("mon", indx)
                  }
                />
              );
            })}
            <div className="input-field">
              <div onClick={() => this.addMoreDishHandle("mon")}>
                Add more dish
              </div>
            </div>
          </section>
          {/* TUESDAY */}
          <section className="daily-menu__container">
            <h5>Tuesday</h5>
            {tueMenu.map((dish, indx) => {
              const dishId = `tueMenu-${indx}`;
              return (
                <DishForm
                  key={indx}
                  dishId={dishId}
                  value={dish.name}
                  name={dishId}
                  changeHanle={this.onChangeDishNameHandle("tue", indx)}
                  deleteDishFieldHandle={() =>
                    this.deleteDishFieldHandle("tue", indx)
                  }
                />
              );
            })}
            <div className="input-field">
              <div onClick={() => this.addMoreDishHandle("tue")}>
                Add more dish
              </div>
            </div>
          </section>
          {/* WEDNESDAY */}
          <section className="daily-menu__container">
            <h5>Wednesday</h5>
            {wedMenu.map((dish, indx) => {
              const dishId = `wedMenu-${indx}`;
              return (
                <DishForm
                  key={indx}
                  dishId={dishId}
                  value={dish.name}
                  name={dishId}
                  changeHanle={this.onChangeDishNameHandle("wed", indx)}
                  deleteDishFieldHandle={() =>
                    this.deleteDishFieldHandle("wed", indx)
                  }
                />
              );
            })}
            <div className="input-field">
              <div onClick={() => this.addMoreDishHandle("wed")}>
                Add more dish
              </div>
            </div>
          </section>
          {/* THURSDAY */}
          <section className="daily-menu__container">
            <h5>Thursday</h5>
            {thuMenu.map((dish, indx) => {
              const dishId = `thuMenu-${indx}`;
              return (
                <DishForm
                  key={indx}
                  dishId={dishId}
                  value={dish.name}
                  name={dishId}
                  changeHanle={this.onChangeDishNameHandle("thu", indx)}
                  deleteDishFieldHandle={() =>
                    this.deleteDishFieldHandle("thu", indx)
                  }
                />
              );
            })}
            <div className="input-field">
              <div onClick={() => this.addMoreDishHandle("thu")}>
                Add more dish
              </div>
            </div>
          </section>
          {/* FRIDAY */}
          <section className="daily-menu__container">
            <h5>Friday</h5>
            {friMenu.map((dish, indx) => {
              const dishId = `friMenu-${indx}`;
              return (
                <DishForm
                  key={indx}
                  dishId={dishId}
                  value={dish.name}
                  name={dishId}
                  changeHanle={this.onChangeDishNameHandle("fri", indx)}
                  deleteDishFieldHandle={() =>
                    this.deleteDishFieldHandle("fri", indx)
                  }
                />
              );
            })}
            <div className="input-field">
              <div onClick={() => this.addMoreDishHandle("fri")}>
                Add more dish
              </div>
            </div>
          </section>

          <div className="input-field">
            <button onClick={this.submitHandle}>Create this menu</button>
          </div>
        </form>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return state;
};
const mapDispatchToProps = dispatch => {
  return {
    createMenu: newMenu => dispatch(createMenu(newMenu))
  };
};
export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(AddMenuForm);
