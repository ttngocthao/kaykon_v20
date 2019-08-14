//import moment from "moment";
export const getExcurList = () => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    let excursionList = [];
    firestore
      .collection("excursion")
      .orderBy("date", "desc")
      .get()
      .then(querySnapshot => {
        if (querySnapshot) {
          querySnapshot.forEach(function(doc) {
            excursionList.push({
              id: doc.id,
              date: doc.data().date.toDate(),
              name: doc.data().name,
              text: doc.data().text,
              imgUrl: doc.data().imgUrl
            });
          });
        }
        //console.log(querySnapshot)
      })
      .then(() => {
        console.log("excursion list", excursionList);
        dispatch({ type: "GET_EXCUR", excursionList });
      });
  };
};

export const openExcurForm = () => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    dispatch({ type: "OPEN_FORM", openForm: true });
  };
};
