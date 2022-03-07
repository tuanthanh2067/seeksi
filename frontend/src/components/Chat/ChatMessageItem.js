import React from "react";
import jwt_decode from "jwt-decode";
import { Image } from "react-shimmer";
import FallBack from "../FallBack/FallBack";

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

      <div className="grid grid-flow-col auto-cols-max">
        {props.photos.map((src, key) => (
          <>
            {src.medium && (
              <div className="block justify-self-center w-28 h-28 relative">
                <Image
                  src={src.medium}
                  alt={key}
                  key={key}
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
            )}

            {!src.medium && src.origin && (
              <div className="block justify-self-center w-28 h-28 relative">
                <Image
                  src={src.origin}
                  alt={key}
                  key={key}
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
            )}
          </>
        ))}
      </div>
    </div>
  );
}

export default ChatMessageItem;
