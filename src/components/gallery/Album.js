import React, { Fragment } from "react";

import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import { firebaseConnect } from "react-redux-firebase";

import { deleteImg, viewImg, exitViewImg } from "../../store/actions/imgAction";
import ImgList from "../layout/ImgList";
import ModalImg from "../layout/ModalImg";

const Album = props => {
  const styles = {
    backgroundColor: "lavender",
    margin: "20px auto",
    minWidth: "100%"
  };
  //console.log("props", props);
  const { albumData, auth } = props;
  // const deleteImgHandle =()=>{
  //   props.deleteImg(
  //     item.name,
  //     item.url,
  //     albumData.albumName,
  //     props.firebase
  //   );
  // }
  return (
    <div style={styles}>
      {albumData ? (
        <div>
          <h2>Album Name: {albumData.albumName}</h2>
          <h4>There are {albumData.photos.length} images in this album</h4>
          <ul className="album__img-list">
            {albumData.photos.map((item, indx) => {
              return (
                <Fragment key={indx}>
                  <ImgList
                    auth={auth.uid}
                    src={item.url}
                    deleteImgHandle={() =>
                      props.deleteImg(
                        item.name,
                        item.url,
                        albumData.albumName,
                        props.firebase
                      )
                    }
                    viewImgHandle={() => props.viewImg(item.url)}
                  />
                  {props.viewImgMode && (
                    <ModalImg
                      src={props.chosenImgUrl}
                      exitViewImgHandle={props.exitViewImg}
                    />
                  )}
                </Fragment>
              );
            })}
          </ul>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  // console.log(ownProps, "ownProps");
  // console.log('album',state)
  const albumName = ownProps.match.params.albumName;
  const gallery = state.firestore.data.gallery;
  const albumData = gallery ? gallery[albumName] : null;
  return {
    albumData: albumData,
    auth: state.firebase.auth,
    state,
    viewImgMode: state.image.viewImgMode,
    chosenImgUrl: state.image.chosenImgUrl
  };
};
const mapDispatchToProps = dispatch => {
  return {
    deleteImg: (imageName, imageUrl, albumName, firebase) =>
      dispatch(deleteImg(imageName, imageUrl, albumName, firebase)),
    viewImg: imgUrl => dispatch(viewImg(imgUrl)),
    exitViewImg: () => dispatch(exitViewImg())
  };
};
export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  firebaseConnect(),
  firestoreConnect([{ collection: "gallery" }])
)(Album);
//export default (Album)
