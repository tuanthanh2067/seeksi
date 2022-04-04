import React from "react";
import { Image } from "react-shimmer";
import FallBack from "../FallBack/FallBack";

const RoundedImage = (props) => {
  return (
    <>
      <div className="w-full h-full relative">
        <button
          id={props.idx}
          className="w-full px-1.5 font-bold text-lg py-0.2 opacity-0 inset-0 absolute hover:opacity-60 hover:bg-white hover:text-black "
          onClick={props.handleRemove}
        >
          Remove
        </button>
        <Image
          src={props.src}
          alt={`img${props.idx}`}
          fallback={<FallBack />}
          NativeImgProps={{
            style: {
              objectFit: "contain",
              width: "100%",
              height: "100%",
            },
          }}
        />
      </div>
    </>
  );
};

export default RoundedImage;
