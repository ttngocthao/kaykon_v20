import React, { Component } from "react";

import { connect } from "react-redux";
import { compose } from "redux";

import {
  getExcurList,
  openExcurForm
} from "../../store/actions/excursionAction";
import EachExcursion from "./EachExcursion";
import AddExcurForm from "./AddExcurForm";

class ExcursionList extends Component {
  componentDidMount() {
    this.props.getExcurList();
  }
  render() {
    const { auth, excursionList, openForm } = this.props;
    return (
      <section>
        <h1>This is ExcursionList</h1>
        {auth.uid && (
          <p onClick={this.props.openExcurForm}>Add new excursion</p>
        )}
        {excursionList &&
          excursionList.map((item, index) => {
            return (
              <EachExcursion
                key={index}
                excurId={item.id}
                name={item.name}
                date={item.date}
                text={item.text}
                imgUrl={item.imgUrl}
              />
            );
          })}
        {openForm && <AddExcurForm />}
      </section>
    );
  }
}
const mapStateToProps = state => {
  console.log("state from excur list", state);
  return {
    auth: state.firebase.auth,
    excursionList: state.excursion.excursionList,
    openForm: state.excursion.openForm
  };
};
const mapDispatchToProps = dispatch => {
  return {
    getExcurList: () => dispatch(getExcurList()),
    openExcurForm: () => dispatch(openExcurForm())
  };
};
export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(ExcursionList);
