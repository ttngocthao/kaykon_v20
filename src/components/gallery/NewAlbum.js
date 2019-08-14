import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

import { firebaseConnect } from "react-redux-firebase";
import { compose } from "redux";

import { uploadImg } from "../../store/actions/imgAction";

//import firebase from '../../config/fbConfig'
class NewAlbum extends Component {
  state = {
    isUploading: false,
    progress: 0,
    images: null,
    imageURL: "",
    collection: "gallery",
    albumName: ""
  };
  handleChange = e => {
    const images = Array.from(e.target.files);
    this.setState({
      images
    });
  };
  handleChangeName = e => {
    this.setState({
      albumName: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { images, albumName, collection } = this.state;
    //console.log("image+albumName", images, albumName);
    this.state.images.forEach(image => {
      this.props.uploadImg(albumName, image, collection, this.props.firebase);
    });
  };
  render() {
    const { auth } = this.props;
    if (!auth.uid) {
      return <Redirect to="/admin" />;
    }

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div className="input-field">
            <label htmlFor="albumName">Name of album</label>
            <input
              name="albumName"
              type="text"
              onChange={this.handleChangeName}
            />
          </div>
          <div className="input-field">
            <input
              name="images"
              multiple
              type="file"
              onChange={this.handleChange}
            />
          </div>

          <button>Create</button>
        </form>
      </div>
    );
  }
}
const mapStateToProps = state => {
  //console.log("state from upload img", state);
  return { auth: state.firebase.auth, state };
};

const mapDispatchToProps = dispatch => {
  return {
    uploadImg: (album, newImg, collection, fb) =>
      dispatch(uploadImg(album, newImg, collection, fb))
  };
};
export default compose(
  firebaseConnect(),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(NewAlbum);
