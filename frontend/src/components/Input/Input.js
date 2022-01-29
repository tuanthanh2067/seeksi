import React from "react";

const Input = ({ id, placeholder, type, value, width = "w-1/2", ...props }) => {
  return (
    <input
      type={type}
      id={id}
      placeholder={placeholder}
      className={`focus:outline-none focus:border-none border-none rounded-md focus:outline-none shadow-inner px-3 py-3.5 my-1.5 h-12 ${width} `}
      {...props}
    />
  );
};

export default Input;
