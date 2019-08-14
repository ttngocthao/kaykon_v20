import React, { Component } from "react";
import { Redirect } from "react-router-dom";

import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import { firebaseConnect } from "react-redux-firebase";

import { exitEditMode } from "../../store/actions/slideShowAction";
import { uploadImg, deleteImg } from "../../store/actions/slideShowAction";
import ImgList from "../layout/ImgList";

class EditSlide extends Component {
  state = {
    images: null
  };
  handleChange = e => {
    const images = Array.from(e.target.files);
    this.setState({
      images
    });
  };
  handleSubmit = e => {
    e.preventDefault();
    const { images } = this.state;
    console.log("image+albumName", images);
    this.state.images.forEach(image => {
      this.props.uploadImg(image, this.props.firebase);
    });
  };
  exitEditModeHandle = () => {
    this.props.exitEditMode();
  };

  render() {
    const { auth, data } = this.props;
    if (!auth.uid) {
      return <Redirect to="/admin" />;
    }
    return (
      <div className="modal__container">
        <div className="modal__content-wrap">
          <span
            className="btn__close-modal-box"
            onClick={this.exitEditModeHandle}
          >
            &times;
          </span>
          <h1>upload images for slide show here</h1>
          <form onSubmit={this.handleSubmit}>
            <div className="input-field">
              <input
                name="images"
                multiple
                type="file"
                onChange={this.handleChange}
              />
            </div>
            <button>Upload</button>
          </form>
          <h2>There are {data && data.length} images in slideshow gallery</h2>
          <ul className="album__img-list">
            {data &&
              data.map((item, index) => {
                return (
                  <ImgList
                    key={index}
                    auth={auth.uid}
                    src={item.url}
                    deleteImgHandle={() =>
                      this.props.deleteImg(
                        item.name,
                        item.id,
                        this.props.firebase
                      )
                    }
                  />
                );
              })}
          </ul>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  console.log("state from edit slide", state);
  return { auth: state.firebase.auth, data: state.firestore.ordered.Carousel };
};

const mapDispatchToProps = dispatch => {
  return {
    exitEditMode: () => dispatch(exitEditMode()),
    uploadImg: (image, firebase) => dispatch(uploadImg(image, firebase)),
    deleteImg: (imageName, docId, firebase) =>
      dispatch(deleteImg(imageName, docId, firebase))
  };
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  firebaseConnect(),
  firestoreConnect([{ collection: "Carousel" }])
)(EditSlide);
