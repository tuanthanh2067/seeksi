import React from "react";

function RoundedButton(props) {
  return (
    <button
      className={`${props.borderColor} ${props.bgColor} ${props.textColor} ${props.fontSize} ${props.hover} ${props.paddingLR} ${props.paddingTB} ${props.fontWeight} ${props.btnStyle} border-2 rounded`}
      onClick={props.handleClick}
    >
      {props.btnName}
    </button>
  );
}

RoundedButton.defaultProps = {
  paddingLR: "px-6", // optional
  paddingTB: "py-1", // optional
  fontSize: "text-xs", // optional
  fontWeight: "font-semibold", // optional
  borderColor: "border-primary",
  bgColor: "bg-primary",
  textColor: "text-white",
  hover: "hover:bg-white hover:text-primary hover:border-white",
};

export default RoundedButton;
