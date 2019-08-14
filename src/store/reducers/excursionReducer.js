const initialState = {
  excursionList: [],
  openForm: false
};
const excursionReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_EXCUR":
      console.log("get excursions successfully");
      return { ...state, excursionList: action.excursionList };
    case "OPEN_FORM":
      console.log("add new excursion form open");
      return { ...state, openForm: action.openForm };
    default:
      return state;
  }
};
export default excursionReducer;
