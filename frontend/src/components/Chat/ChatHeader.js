import React from "react";
import { useNavigate } from "react-router-dom";
import OvalButton from "../Buttons/OvalButton";
import defaultAvt from "../../assets/mock_avatar.png";

function ChatHeader(props) {
  const navigate = useNavigate();
  return (
    <div className="container mx-auto py-1 mb-3 border-b border-b-primary">
      <div className="grid grid-cols-2">
        <div className="overflow-hidden flex">
          <div className="h-10 w-10 justify-self-center overflow-hidden rounded-full">
            <img
              src={
                props.avatar && !props.isDisabled ? props.avatar : defaultAvt
              }
              alt="user avatar"
              className=" object-contain hover:cursor-pointer"
              onClick={() => navigate(`/user/${props.partnerId}`)}
            />
          </div>
          <div className="mx-3 text-lg text-black self-center">
            <span
              className="text-lg font-bold inline-block hover:cursor-pointer"
              onClick={() => navigate(`/user/${props.partnerId}`)}
            >
              {props.firstName}
            </span>
            {props.userStatus && (
              <span className="h-3 w-3 bg-dark-green inline-block rounded-full ml-1"></span>
            )}
          </div>
        </div>
        <div className=" flex py-2 place-content-end gap-x-3">
          <OvalButton
            fontSize="text-sm"
            borderColor="border-secondary"
            bgColor="bg-secondary"
            hover="hover:bg-white hover:text-secondary hover:border-secondary"
            btnName="Unmatch"
            handleClick={() => {
              props.setShowConfirmation(true);
            }}
          />
          <OvalButton
            fontSize="text-sm"
            borderColor="border-secondary"
            bgColor="bg-secondary"
            hover="hover:bg-white hover:text-secondary hover:border-secondary"
            btnName="Report"
            handleClick={() => {
              props.setShowReport(true);
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default ChatHeader;
