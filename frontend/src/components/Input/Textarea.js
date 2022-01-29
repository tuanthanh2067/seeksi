import React from "react";

const Textarea = ({
  id,
  placeholder,
  value,
  height = "h-40",
  width = "w-1/2",
  ...props
}) => {
  return (
    <textarea
      id={id}
      placeholder={placeholder}
      className={`focus:outline-none focus:border-none outline-none border-none rounded-md shadow-inner px-3 py-3.5 my-1.5 ${height} ${width} `}
      {...props}
    />
  );
};

export default Textarea;
