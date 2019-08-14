import React from "react";
const ImgIndicator = props => {
  const style = {
    width: "15px",
    height: "15px",
    borderRadius: "50%",
    backgroundColor: "gray",
    display: "inline-block",
    margin: "0px 5px"
  };
  //console.log('imgindicator',props)
  const { index, currentImgIndex } = props;

  return (
    <span
      className="img-indicator"
      style={
        index === currentImgIndex
          ? { ...style, backgroundColor: "pink" }
          : style
      }
    />
  );
};
export default ImgIndicator;
