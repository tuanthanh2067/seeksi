import React from "react";
import "./FallBack.css";

const FallBack = (props) => {
  return props.avt ? (
    <div
      className={`flex w-36 h-36 sm:w-48 sm:h-48 overflow-hidden rounded-full bg-light-gray text-center`}
    >
      <div className="m-auto">
        <div className="lds-heart">
          <div></div>
        </div>
      </div>
    </div>
  ) : (
    <div
      className={`flex block w-48 h-48 lg:w-72 lg:h-72 bg-light-gray text-center`}
    >
      <div className="m-auto">
        <div className="lds-heart">
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default FallBack;
