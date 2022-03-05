import React from "react";
import jwt_decode from "jwt-decode";

function ChatMessageItem(props) {
  const currentUserId = jwt_decode(localStorage.getItem("token")).userId;
  return (
    <div
      className={`${
        props.sendBy === "admin"
          ? "bg-white place-self-center my-0"
          : `${
              props.sendBy === currentUserId
                ? "bg-slate-200  place-self-end text-right"
                : "border-[1px] border-slate-400"
            } my-1`
      } rounded-md px-2 py-1 mx-3 max-w-[40%] whitespace-normal`}
    >
      {props.message}
    </div>
  );
}

export default ChatMessageItem;
