import React from "react";
import { Link } from "react-router-dom";

import { connect } from "react-redux";

import PublicLinks from "./PublicLinks";
import AdminLinks from "./AdminLinks";

const Nav = props => {
  const { auth } = props;
  return (
    <nav>
      <div>
        <Link to="/" className="bran-logo">
          Brand logo
        </Link>

        <Link to="/">Home</Link>

        <Link to="/events">Events</Link>

        <Link to="/contact">Contact</Link>

        <Link to="/gallery">Gallery</Link>

        <Link to="/menu">Menu</Link>

        <Link to="/curriculum">Curriculum</Link>

        <Link to="/excursion">Excursion</Link>

        {auth.uid ? <AdminLinks /> : <PublicLinks />}
      </div>
    </nav>
  );
};

const mapStateToProps = state => {
  //console.log("nav", state);
  return {
    auth: state.firebase.auth
  };
};
export default connect(mapStateToProps)(Nav);
