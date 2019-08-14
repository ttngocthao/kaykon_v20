import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";

import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";

import { deleteAlbum, getAlbums } from "../../store/actions/imgAction";
import AlbumThumbnail from "./AlbumThumbnail";
//import Album from "./Album";

class Gallery extends Component {
  state = {};
  // Object.keys()-->return an array of properties from the object
  //props.gallery && console.log("object key", Object.keys(props.gallery));
  componentDidMount() {
    this.props.getAlbums();
  }
  render() {
    const { gallery, auth } = this.props;
    return (
      <div>
        <h1>Gallery</h1>
        {gallery ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              width: "100%",
              flexWrap: "wrap"
            }}
          >
            {gallery &&
              Object.keys(gallery).map((alb, indx) => {
                return (
                  <div key={indx} className="album-thumbnail">
                    {auth.uid && (
                      <p
                        className="delete-btn__album"
                        onClick={() =>
                          this.props.deleteAlbum(
                            gallery[alb].albumName,
                            this.props.firebase
                          )
                        }
                      >
                        &times;
                      </p>
                    )}

                    <Link to={`/gallery/${gallery[alb].albumName}`}>
                      <AlbumThumbnail
                        albumName={gallery[alb].albumName}
                        imgUrls={gallery[alb].imgUrls}
                        length={gallery[alb].photos.length}
                        auth={auth}
                        deleteHandle={() => {
                          this.props.deleteAlbum(
                            gallery[alb].albumName,
                            this.props.firebase
                          );
                        }}
                      />
                    </Link>
                  </div>
                );
              })}
          </div>
        ) : (
          <div>Loading...</div>
        )}
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getAlbums: () => dispatch(getAlbums()),
    deleteAlbum: (albumName, firebase) =>
      dispatch(deleteAlbum(albumName, firebase))
  };
};
const mapStateToProps = state => {
  console.log("gallery", state);
  return {
    gallery: state.image.gallery,
    auth: state.firebase.auth
  };
};
export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  firestoreConnect()
)(Gallery);
