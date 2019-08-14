import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { connect } from "react-redux";
import { compose } from "redux";
import { firebaseConnect } from "react-redux-firebase";

import "./styles.css";

import Nav from "./components/layout/Nav";
import Landing from "./components/Landing";
import EventList from "./components/events/EventList";
import EventForm from "./components/events/EventForm";
import Contact from "./components/Contact";
import SignInForm from "./components/auth/SignInForm";
import EventDetail from "./components/events/EventDetail";
import ImgUpload from "./components/gallery/ImgUpload";
import AdminLanding from "./components/AdminLanding";
import Gallery from "./components/gallery/Gallery";
import Album from "./components/gallery/Album";
import NewAlbum from "./components/gallery/NewAlbum";
import Curriculum from "./components/Curriculum/Curriculum";
import MenuList from "./components/Menu/MenuList";
import AddMenuForm from "./components/Menu/AddMenuForm";
import ExcursionList from "./components/Excursion/ExcursionList";

class App extends Component {
  render() {
    const { auth } = this.props;
    return (
      <Router>
        {auth.isLoaded ? (
          <Fragment>
            <Nav />
            <Route path="/" exact component={Landing} />
            <Switch>
              <Route path="/events" exact component={EventList} />
              <Route exact path="/events/:id" component={EventDetail} />
              <Route exact path="/gallery/:albumName" component={Album} />
              <Route path="/create-event" exact component={EventForm} />
              <Route path="/create-album" exact component={NewAlbum} />
              <Route path="/upload-photo" exact component={ImgUpload} />
              <Route path="/admin-landing" exact component={AdminLanding} />
              <Route path="/curriculum" exact component={Curriculum} />
              <Route path="/menu" exact component={MenuList} />
              <Route path="/gallery" exact component={Gallery} />
              <Route path="/admin" exact component={SignInForm} />
              <Route path="/contact" exact component={Contact} />
              <Route path="/create-menu" exact component={AddMenuForm} />
              <Route path="/excursion" exact component={ExcursionList} />
            </Switch>
          </Fragment>
        ) : (
          <p> loading...</p>
        )}
      </Router>
    );
  }
}
const mapStateToProps = state => {
  return {
    auth: state.firebase.auth
  };
};
export default compose(
  firebaseConnect(),
  connect(mapStateToProps)
)(App);
