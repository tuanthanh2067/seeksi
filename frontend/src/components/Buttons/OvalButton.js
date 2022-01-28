import React from "react";

function OvalButton(props) {
  return (
    <button
      className={`${props.borderColor} ${props.bgColor} ${props.textColor} ${props.fontSize} ${props.hover} ${props.paddingLR} ${props.paddingTB} ${props.fontWeight} border-2 rounded-full`}
      onClick={props.handleClick}
    >
      {props.btnName}
    </button>
  );
}

OvalButton.defaultProps = {
  paddingLR: "px-4", // optional
  paddingTB: "py-1", // optional
  fontSize: "text-xs", // optional
  fontWeight: "font-semibold", // optional
  borderColor: "border-primary",
  bgColor: "bg-primary",
  textColor: "text-white",
  hover: "hover:bg-white hover:text-primary hover:border-white",
};

export default OvalButton;
