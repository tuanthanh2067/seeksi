import React from "react";
import Info from "../../assets/info.png";

const CardFooter = ({ firstName, age, sex, hobbies, userID, textColor }) => {
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  return (
    <div className="flex">
      <div className="w-5/6 m-0">
        <div>
          <span className={`font-bold text-xl text-${textColor}`}>
            {firstName},{" "}
          </span>
          <span className={`font-normal text-xl text-${textColor} italic`}>
            {age}, {capitalizeFirstLetter(sex)}
          </span>
        </div>
        <div className={`font-light text-md text-${textColor}`}>
          {hobbies.join(", ")}
        </div>
      </div>
      <div className="w-1/6 mx-auto py-3">
        <a href={`/user/${userID}`}>
          <img src={Info} className="w-8 mr-0" alt="info" />
        </a>
      </div>
    </div>
  );
};

export default CardFooter;
