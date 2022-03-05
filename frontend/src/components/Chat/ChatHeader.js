import React from "react";
import OvalButton from "../Buttons/OvalButton";
import defaultAvt from "../../assets/mock_avatar.png";

function ChatHeader(props) {
  const handleReport = () => {};

  return (
    <div>
      <div className="flex-none container mx-auto py-1 border-b-[1px] border-primary">
        <div className="grid grid-cols-2">
          <div className="overflow-hidden flex">
            <div className="h-10 w-10 justify-self-center overflow-hidden rounded-full">
              <img
                src={
                  props.avatar && !props.isDisabled ? props.avatar : defaultAvt
                }
                alt="user avatar"
                className=" object-contain"
              />
            </div>
            <div className="mx-3 text-lg text-black self-center">
              {props.firstName}
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
              handleClick={handleReport}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatHeader;
