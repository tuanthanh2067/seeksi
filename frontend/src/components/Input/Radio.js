import React from "react";

const Radio = ({ id, name, value, width = "w-1/2", ...props }) => {
  return (
    <div
      className={`container rounded-md focus:outline-none shadow-inner px-3 py-3.5 my-2 h-12 ${width} `}
    >
      <span className="text-medium-gray">{value}</span>
      <input
        type="radio"
        id={id}
        name={name}
        value={value}
        className={`m-1 float-right focus:outline-none text-primary`}
        {...props}
      />
    </div>
  );
};

export default Radio;
