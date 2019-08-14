import React from "react";
import { NavLink } from "react-router-dom";

import { connect } from "react-redux";
import { compose } from "redux";
import { firebaseConnect } from "react-redux-firebase";

import { signOut } from "../../store/actions/authAction";

const AdminLinks = props => {
  const handleSignOut = () => {
    props.signOut(props.firebase);
  };
  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/create-event">Create an event</NavLink>
        </li>
        <li>
          <NavLink to="/upload-photo">Upload Photo</NavLink>
        </li>
        <li>
          <NavLink to="/create-album">Create album</NavLink>
        </li>
        <button onClick={handleSignOut}>Sign out</button>
        <li>ADM</li>
      </ul>
    </nav>
  );
};
const mapDispatchToProps = dispatch => {
  return {
    signOut: firebase => dispatch(signOut(firebase))
  };
};
export default compose(
  firebaseConnect(),
  connect(
    null,
    mapDispatchToProps
  )
)(AdminLinks);
