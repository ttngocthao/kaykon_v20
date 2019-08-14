import { combineReducers } from "redux";
import { firestoreReducer } from "redux-firestore";
import { firebaseReducer } from "react-redux-firebase";

import authReducer from "./authReducer";
import eventReducer from "./eventReducer";
import imgReducer from "./imgReducer";
import slideShowReducer from "./slideShowReducer";
import menuReducer from "./menuReducer";
import excursionReducer from "./excursionReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  firestore: firestoreReducer,
  firebase: firebaseReducer,
  event: eventReducer,
  image: imgReducer,
  slideShow: slideShowReducer,
  menu: menuReducer,
  excursion: excursionReducer
});
export default rootReducer;
