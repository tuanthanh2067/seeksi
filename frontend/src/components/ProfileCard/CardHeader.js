import React from "react";
import OvalButton from "../Buttons/OvalButton";

const CardHeader = ({ handleReport, distance }) => {
  return (
    <div className="p-5">
      <span>
        <OvalButton
          btnName="Report"
          borderColor="border-secondary"
          bgColor="bg-secondary"
          fontSize="text-md"
          hover="hover:bg-white hover:text-secondary hover:border-none"
          handleClick={handleReport}
        />
      </span>
      <span className="float-right">
        <OvalButton
          btnName={`${distance} km`}
          fontSize="text-md"
          hover="hover:bg-white hover:text-primary hover:border-none"
        />
      </span>
    </div>
  );
};

export default CardHeader;
