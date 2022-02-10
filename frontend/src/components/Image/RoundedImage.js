import React from "react";

const RoundedImage = (props) => {
  return (
    <div className="w-full h-full relative">
      <button
        id={props.idx}
        className=" px-1.5 font-bold text-lg py-0.2 opacity-0 inset-0 absolute hover:opacity-60 hover:bg-white hover:text-black "
        onClick={props.handleRemove}
      >
        Remove
      </button>
      <img
        src={props.src}
        alt={`img${props.idx}`}
        className="w-full h-full object-contain"
      />
    </div>
  );
};

export default RoundedImage;
