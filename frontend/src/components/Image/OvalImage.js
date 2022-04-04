import React from "react";
import { Image } from "react-shimmer";
import FallBack from "../FallBack/FallBack";

const OvalImage = (props) => {
  return (
    <div className="h-full text-center relative rounded-full">
      <button
        className="w-full px-1.5 font-bold text-lg py-0.2 opacity-0 inset-0 absolute hover:opacity-60 hover:bg-white hover:text-black "
        onClick={props.handleRemove}
      >
        Remove
      </button>
      <Image
        src={props.src}
        alt={"avt"}
        fallback={<FallBack avt={true} />}
        NativeImgProps={{
          style: {
            objectFit: "contain",
          },
        }}
      />
    </div>
  );
};

export default OvalImage;
