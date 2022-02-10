import React from "react";

const OvalImage = (props) => {
  return (
    <div className="h-full text-center relative rounded-full">
      <button
        className=" px-1.5 font-bold text-lg py-0.2 opacity-0 inset-0 absolute hover:opacity-60 hover:bg-white hover:text-black "
        onClick={props.handleRemove}
      >
        Remove
      </button>
      <img src={props.src} alt={"avt"} className="w-full h-full" />
    </div>
  );
};

export default OvalImage;
