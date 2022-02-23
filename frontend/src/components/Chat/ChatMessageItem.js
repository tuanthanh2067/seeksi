import React from "react";
import jwt_decode from "jwt-decode";

function ChatMessageItem(props) {
  const currentUserId = jwt_decode(localStorage.getItem("token")).userId;
  const adminStyle = "place-self-center text-center bg-white text-xs my-0";
  const userStyle = "place-self-end text-right bg-slate-100 my-1 max-w-[40%]";
  const partnerStyle =
    "place-self-start text-left border-[1px] border-slate-300 my-1 max-w-[40%]";
  return (
    <div
      className={`rounded-md px-2 py-1 mx-3 whitespace-normal break-all ${
        props.sendBy === "admin"
          ? adminStyle
          : props.sendBy === currentUserId
          ? userStyle
          : partnerStyle
      }`}
    >
      {props.message}
    </div>
  );
}

export default ChatMessageItem;
