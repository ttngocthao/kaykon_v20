const initialState = {
  menuList: ["a", "b", "c"],
  errMsg: null
};

const menuReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_MENU":
      console.log("get menu successfully");
      return { ...state, menuList: action.menuList };
    case "CREATE_MENU":
      console.log("created menu successfully");
      return { ...state };
    case "DELETE_MENU":
      console.log("deleted menu successfully");
      return { ...state, menuList: action.menuList };
    case "ERROR_CREATE_MENU":
      console.log("fail to create menu");
      return { ...state, errMsg: action.err };
    case "ERROR_DELETE_MENU":
      console.log("fail to delete menu");
      return { ...state, errMsg: action.err };
    default:
      return state;
  }
};

export default menuReducer;
