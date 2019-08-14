export const getSlideShow = () => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    let data = [];
    firestore
      .collection("Carousel")
      .get()
      .then(querySnapshot => {
        if (querySnapshot) {
          querySnapshot.forEach(function(doc) {
            //console.log(doc.id, " => ", doc.data());
            data.push({
              id: doc.id,
              name: doc.data().name,
              url: doc.data().url
            });
            //console.log('data variable',data)
            return data;
          });
        } else {
          console.log("querySnapshot", querySnapshot);
        }
      })
      .then(() => {
        dispatch({ type: "GET_CAROUSEL", data });
      });
  };
};

export const previousSlide = data => {
  return (dispatch, getState) => {
    const currentImgIndex = getState().slideShow.currentImgIndex;
    const lastIndex = data.length - 1;
    const resetIndex = currentImgIndex === 0;
    const index = resetIndex ? lastIndex : currentImgIndex - 1;
    // return index.then(() => {
    //   dispatch({ type: "PRE_SLIDE", index });
    // });
    dispatch({ type: "PRE_SLIDE", index });
  };
};

export const nextSlide = data => {
  return (dispatch, getState) => {
    const currentImgIndex = getState().slideShow.currentImgIndex;
    const lastIndex = data.length - 1;
    const resetIndex = currentImgIndex === lastIndex;
    const index = resetIndex ? 0 : currentImgIndex + 1;
    dispatch({ type: "NEXT_SLIDE", index });
  };
};

export const editSlideShow = () => {
  return (dispatch, getState) => {
    const editingSlideShow = getState().slideShow.editingSlideShow;
    //console.log("from slideshow action", editingSlideShow);
    dispatch({ type: "EDIT_SLIDESHOW", editingSlideShow: !editingSlideShow });
  };
};

export const exitEditMode = () => {
  return (dispatch, getState) => {
    dispatch({ type: "EXIT_EDITMODE", editingSlideShow: false });
  };
};

export const uploadImg = (image, firebase) => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    const albumRef = firestore.collection("Carousel");
    let data = [];
    let progress;
    const uploadTask = firebase
      .storage()
      .ref(`Carousel/${image.name}`)
      .put(image);
    uploadTask.on(
      "state_changed",
      snapshot => {
        progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        progress === 100 && alert("Done!");
      },
      err => {
        console.log("Error", err);
      },
      () => {
        uploadTask.snapshot.ref
          .getDownloadURL()
          .then(downloadUrl => {
            albumRef.add({
              name: image.name,
              url: downloadUrl
            });
          })
          .then(() => {
            firestore
              .collection("Carousel")
              .get()
              .then(querySnapshot => {
                if (querySnapshot) {
                  querySnapshot.forEach(function(doc) {
                    //console.log(doc.id, " => ", doc.data());
                    data.push({
                      id: doc.id,
                      name: doc.data().name,
                      url: doc.data().url
                    });
                    //console.log('data variable',data)
                    return data;
                  });
                } else {
                  console.log("querySnapshot", querySnapshot);
                }
              });
          })
          .then(() => {
            dispatch({ type: "CAROUSEL_UPDATED", data });
          })
          .catch(function(error) {
            console.log("Error getting document:", error);
          });
      }
    );
  };
};

export const deleteImg = (imageName, docId, firebase) => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    let data = []; //used to update the state after an item is deleted
    // Create a reference to the file in database to delete
    const imgRef = firestore.collection("Carousel").doc(docId);
    // console.log("docId", docId);
    // Create a reference to the file in store to delete
    const fileRef = firebase.storage().ref(`Carousel/${imageName}`);
    imgRef.delete().then(() => {
      fileRef
        .delete()
        .then(() => {
          firestore
            .collection("Carousel")
            .get()
            .then(querySnapshot => {
              if (querySnapshot) {
                querySnapshot.forEach(function(doc) {
                  //console.log(doc.id, " => ", doc.data());
                  data.push({
                    id: doc.id,
                    name: doc.data().name,
                    url: doc.data().url
                  });
                  //console.log('data variable',data)
                  return data;
                });
              } else {
                console.log("querySnapshot", querySnapshot);
              }
            });
        })
        .then(() => {
          dispatch({ type: "SLIDE_IMG_DELETED", data });
        })
        .catch(err => {
          dispatch({ type: "SLIDE_IMG_DELETED_ERROR", err });
        });
    });
  };
};
