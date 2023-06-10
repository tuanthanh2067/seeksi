import React from "react";
import jwt_decode from "jwt-decode";
import { Image } from "react-shimmer";
import FallBack from "../FallBack/FallBack";

import LightGallery from "lightgallery/react";
import lgZoom from "lightgallery/plugins/zoom";
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";

function ChatMessageItem({ message, partnerName }) {
  const currentUserId = jwt_decode(localStorage.getItem("token")).userId;
  const adminStyle = "self-center text-center bg-white text-xs my-0";
  const userStyle = "self-end text-right bg-slate-100 my-1 max-w-[40%]";
  const partnerStyle =
    "self-start text-left border-[1px] border-slate-300 my-1 max-w-[40%]";

  const isGameRequest = message.content === "sent a game request";
  const isGameResponse =
    message.content === "accepted the game request" ||
    message.content === "rejected the game request";

  const gameRequestSender =
    message.sendBy === currentUserId ? "You" : partnerName;

  return (
    <div
      className={`rounded-md px-2 py-1 mx-3 whitespace-normal break-word ${
        message.sendBy === "admin"
          ? adminStyle
          : message.sendBy === currentUserId
          ? userStyle
          : partnerStyle
      }`}
    >
      {isGameResponse || isGameRequest ? (
        <div>
          {gameRequestSender} {message.content}
        </div>
      ) : (
        message.content
      )}

      {isGameRequest && message.sendBy !== currentUserId && (
        <div>Open Game to see request</div>
      )}

      <div
        className={`flex items-center ${
          message.sendBy === currentUserId ? "justify-end" : ""
        }`}
      >
        {message.photos.map((src) => (
          <LightGallery
            key={src.medium ? src.medium : src.origin}
            speed={500}
            plugins={[lgZoom]}
            download={false}
            elementClassNames="block w-28 h-28"
          >
            <a href={src.medium ? src.medium : src.origin}>
              <Image
                src={src.medium ? src.medium : src.origin}
                alt="chat photo"
                key={src.medium ? src.medium : src.origin}
                fallback={<FallBack />}
                NativeImgProps={{
                  style: {
                    objectFit: "contain",
                    width: "100%",
                    height: "100%",
                  },
                }}
              />
            </a>
          </LightGallery>
        ))}
      </div>
    </div>
  );
}

export default ChatMessageItem;
