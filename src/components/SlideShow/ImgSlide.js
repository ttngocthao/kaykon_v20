import React from "react";
//url is a property of props object
const ImgSlide = ({ url }) => {
  const styles = {
    backgroundImage: `url(${url})`,
    backgroundSize: "cover",
    minWidth: "200px",
    minHeight: "300px",
    backgroundPosition: "center",
    transition: "background-image 0.5s ease-in-out"
  };
  return <div className="img-slide" style={styles} />;
};
export default ImgSlide;
