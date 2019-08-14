const initState = {
  currentImgIndex: 0,
  editingSlideShow: false,
  errMsg: "",
  data: null
};
const slideShowReducer = (state = initState, action) => {
  switch (action.type) {
    case "GET_CAROUSEL":
      console.log("get slideshow gallery successfully", action.data);
      return { ...state, data: action.data };
    case "PRE_SLIDE":
      console.log("Pre slide is successully loaded", action.index);
      return { ...state, currentImgIndex: action.index };
    case "NEXT_SLIDE":
      console.log("next slide is successully loaded", action.index);
      return { ...state, currentImgIndex: action.index };
    case "EDIT_SLIDESHOW":
      console.log("edit slideshow mode", action.editingSlideShow);
      return { ...state, editingSlideShow: action.editingSlideShow };
    case "EXIT_EDITMODE":
      console.log("exit edit slideshow mode", action.editingSlideShow);
      return { ...state, editingSlideShow: action.editingSlideShow };
    case "CAROUSEL_UPDATED":
      console.log("carousel updated successfully");
      return { ...state, data: action.data };
    case "SLIDE_IMG_DELETED":
      console.log("Delete image in Carousel successfully");
      return { ...state, data: action.data };
    case "SLIDE_IMG_DELETED_ERROR":
      console.log("Cant delete the image in Carousel");
      return { ...state, errMsg: action.err };
    default:
      return state;
  }
};
export default slideShowReducer;
