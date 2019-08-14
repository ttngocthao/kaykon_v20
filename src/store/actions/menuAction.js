import moment from "moment";
export const getMenu = () => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    let menuList = [];
    const firestore = getFirestore();
    firestore
      .collection("menu")
      .orderBy("startDate", "desc")
      .get()
      .then(querySnapshot => {
        if (querySnapshot) {
          querySnapshot.forEach(function(doc) {
            //console.log(doc.id, " => ", doc.data());
            menuList.push({
              menuId: doc.id,
              from: moment(doc.data().startDate.toDate()).format("DD MMM YYYY"),
              to: moment(doc.data().endDate.toDate()).format("DD MMM YYYY"),
              mon: doc.data().monMenu,
              tue: doc.data().tueMenu,
              wed: doc.data().wedMenu,
              thu: doc.data().thuMenu,
              fri: doc.data().friMenu
            });
          });
        } else {
          console.log("querySnapshot", querySnapshot);
        }
      })
      .then(() => {
        dispatch({ type: "GET_MENU", menuList });
      });
  };
};

export const createMenu = newMenu => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    firestore
      .collection("menu")
      .add(newMenu)
      .then(() => {
        dispatch({ type: "CREATE_MENU", newMenu });
      })
      .catch(err => {
        dispatch({ type: "ERROR_CREATE_MENU", err });
      });
  };
};

export const deleteMenu = menuId => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    let menuList = [];
    const firestore = getFirestore();
    firestore
      .collection("menu")
      .doc(menuId)
      .delete()
      .then(() =>
        firestore
          .collection("menu")
          .get()
          .then(querySnapshot => {
            if (querySnapshot) {
              querySnapshot.forEach(function(doc) {
                //console.log(doc.id, " => ", doc.data());
                menuList.push({
                  menuId: doc.id,
                  from: moment(doc.data().startDate.toDate()).format(
                    "DD MMM YYYY"
                  ),
                  to: moment(doc.data().endDate.toDate()).format("DD MMM YYYY"),
                  mon: doc.data().monMenu,
                  tue: doc.data().tueMenu,
                  wed: doc.data().wedMenu,
                  thu: doc.data().thuMenu,
                  fri: doc.data().friMenu
                });
              });
            } else {
              console.log("querySnapshot", querySnapshot);
            }
          })
          .then(() => {
            dispatch({ type: "DELETE_MENU", menuList });
          })
      )
      .catch(err => {
        dispatch({ type: "ERROR_DELETE_MENU", err });
      });
  };
};
