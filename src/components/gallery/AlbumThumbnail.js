import React, { Fragment } from "react";

const AlbumThumbnai = ({ albumName, imgUrls, length, auth, deleteHandle }) => {
  //console.log('imgurls',imgUrls)

  return (
    <Fragment>
      {/* {auth.uid && (
        <span className="delete-btn__album" onClick={deleteHandle}>
          &times;
        </span>
      )} */}
      <div className="album-thumbnail__content">
        <h3> {albumName}</h3>
        <h5>
          {length} {length > 1 ? "images" : "image"}
        </h5>
      </div>
    </Fragment>
  );
};

export default AlbumThumbnai;
