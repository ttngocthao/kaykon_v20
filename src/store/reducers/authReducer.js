const initState = { authErr: null };
const authReducer = (state = initState, action) => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      console.log("login successfully");
      return { authErr: null };
    case "LOGIN_ERROR":
      console.log("login failed");
      return { ...state, authErr: "Email or passwork is not correct!" };
    case "SIGNOUT_SUCCESS":
      console.log("logout successfully");
      return state;
    default:
      return state;
  }
};
export default authReducer;
