// import { QuerySnapshot } from "@firebase/firestore-types";

export const createEvent = event => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    firestore
      .collection("events")
      .add({ ...event, createdAt: new Date() })
      .then(() => {
        dispatch({ type: "CREATE_EVENT", event: event });
      })
      .catch(err => {
        dispatch({ type: "CREATE_EVENT_ERROR", err });
      });
  };
};

export const getAllEvents = () => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    let events = [];
    firestore
      .collection("events")
      .orderBy("date", "desc")
      .get()

      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          //console.log(doc.id, " => ", doc.data());
          events.push({
            id: doc.id,
            name: doc.data().name,
            date: doc.data().date,
            createdAt: doc.data().createdAt,
            text: doc.data().text
          });
          //console.log('data variable',data)
          return events;
        });
      })
      .then(() => {
        dispatch({ type: "GET_EVENTS", events });
      });
  };
};

export const deleteEvent = eventId => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    let events = [];
    firestore
      .collection("events")
      .doc(eventId)
      .delete()
      .then(() => {
        firestore
          .collection("events")
          .orderBy("date", "desc")
          .get()
          .then(querySnapshot => {
            querySnapshot.forEach(doc => {
              //console.log(doc.id, " => ", doc.data());
              events.push({
                id: doc.id,
                name: doc.data().name,
                date: doc.data().date,
                createdAt: doc.data().createdAt,
                text: doc.data().text
              });
              //console.log('data variable',data)
              return events;
            });
          })
          .then(() => {
            dispatch({ type: "DELETE_EVENT", events });
          });
      });
  };
};

//CONVERT TIMESTAMP TO DATE MONTH YEAR WITHOUT MOMENT
// export const convertTimestamp = (timestamp)=>{
//   return (dispatch,getState,{getFirebase,getFirestore})=>{
//     const dateInMiliseconds = new Date(timestamp*1000)
//     const date = dateInMiliseconds.getDate();
//     const monthArr =['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
//     const monthIndex = dateInMiliseconds.getMonth()
//     const year = dateInMiliseconds.getFullYear()
//     const fulldate= `${date} ${monthArr[monthIndex]} ${year}`
//     dispatch({type:'CONVERT_TIMESTAMP',fulldate})
//   }
// }
