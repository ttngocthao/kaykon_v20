export const uploadImg = (album, image, collection, firebase) => {
  return (dispatch, getState, { getFirestore }) => {
    let progress;
    //firestore for database
    const firestore = getFirestore();
    const albumRef = firestore.collection(collection).doc(album);
    //check if the document is existed
    albumRef.get().then(function(doc) {
      if (doc.exists) {
        console.log("Document data:", doc.data());
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
      albumRef.set({
        albumName: album,
        photos: []
      });
    });

    const uploadTask = firebase
      .storage()
      .ref(`${album}/${image.name}`)
      .put(image);

    uploadTask.on(
      "state_changed",
      function(snapshot) {
        progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        //console.log("Upload is " + progress + "% done");
        progress === 100 && alert("Done!");
      },
      function(err) {
        console.log("err", err);
      },
      function() {
        uploadTask.snapshot.ref
          .getDownloadURL()
          .then(function(downloadURL) {
            albumRef.update({
              photos: firebase.firestore.FieldValue.arrayUnion({
                name: image.name,
                url: downloadURL
              })
            });
          })
          .then(() => {
            dispatch({ type: "IMG_UPLOAD", image: image, progress });
          })
          .catch(function(error) {
            console.log("Error getting document:", error);
          });
      }
    );
  };
};

export const deleteImg = (imageName, imageUrl, albumName, firebase) => {
  return (dispatch, getState, { getFirestore }) => {
    console.log("imageName,albumName from imgAction", imageName, albumName);
    const firestore = getFirestore();

    // Create a reference to the file in database to delete
    const imgRef = firestore.collection("gallery").doc(albumName);
    // Create a reference to the file in store to delete
    const fileRef = firebase.storage().ref(`${albumName}/${imageName}`);
    imgRef
      .update({
        photos: firebase.firestore.FieldValue.arrayRemove({
          name: imageName,
          url: imageUrl
        })
      })
      .then(() => {
        fileRef
          .delete()
          .then(() => {
            dispatch({ type: "IMG_DELETED" });
          })
          .catch(err => {
            dispatch({ type: "IMG_DELETED_ERROR", err });
          });
      });
  };
};
export const getAlbums = () => {
  return (dispatch, getState, { getFirestore, getFirebase }) => {
    const firestore = getFirestore();
    let gallery = [];
    firestore
      .collection("gallery")
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          //console.log(doc.id, " => ", doc.data());
          gallery.push({ albumName: doc.id, photos: doc.data().photos });
          return gallery;
        });
      })
      .then(() => {
        dispatch({ type: "GET_ALBUMS", gallery });
      });
  };
};
export const deleteAlbum = (albumName, firebase) => {
  return (dispatch, getState, { getFirestore }) => {
    //check how many photos in the album
    let gallery = [];
    let itemNameList = [];
    const firestore = getFirestore();
    const albumRef = firestore.collection("gallery").doc(albumName);
    //const fileRef = firebase.storage().ref(albumName);

    albumRef
      .get()
      .then(doc => {
        doc.data().photos.length !== 0 &&
          doc.data().photos.map(item => {
            return itemNameList.push(item.name);
          });
      })
      .then(() => {
        //delete the documents
        console.log("itemNameList", itemNameList);
        albumRef.delete().then(() => {
          firestore
            .collection("gallery")
            .get()
            .then(querySnapshot => {
              querySnapshot.forEach(doc => {
                console.log(doc.id, " => ", doc.data());
                gallery.push({ albumName: doc.id, photos: doc.data().photos });
                return gallery;
              });
            })
            .then(() => {
              dispatch({ type: "DELETE_ALBUM", gallery });
            })
            .catch(err => {
              dispatch({ type: "ERROR_DELETE_ALBUM", err });
            });
        });
      })
      .then(() => {
        console.log("testing");
        itemNameList.forEach(item => {
          firebase
            .storage()
            .ref(`${albumName}/${item}`)
            .delete();
        });
      });

    // albumRef
    //   .delete()
    //   .then(() => {
    //     firestore
    //       .collection("gallery")
    //       .get()
    //       .then(querySnapshot => {
    //         querySnapshot.forEach(doc => {
    //           console.log(doc.id, " => ", doc.data());
    //           gallery.push({ albumName: doc.id, photos: doc.data().photos });
    //           return gallery;
    //         });
    //       })
    //       .then(() => {
    //         dispatch({ type: "DELETE_ALBUM", gallery });
    //       }).catch(err => {
    //         dispatch({ type: "ERROR_DELETE_ALBUM", err });
    //       });;
    //   })
    //   .catch(err => {
    //     dispatch({ type: "ERROR_DELETE_ALBUM", err });
    //   });
  };
};

export const viewImg = imgUrl => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    //let viewImgMode = getState().image.viewImgMode

    dispatch({ type: "VIEW_IMG", viewImgMode: true, imgUrl });
  };
};

export const exitViewImg = () => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    dispatch({ type: "EXIT_VIEW_IMG", viewImgMode: false });
  };
};
