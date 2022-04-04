import React, { useEffect } from "react";
import ChatMessageItem from "./ChatMessageItem";

const ADMIN_MESSAGE_COUNT = 3;

function ChatMessageList({ data, handleAccept, handleDecline }) {
  const setScroll = () => {
    let scrollWindow = document.getElementById("scrollWindow");
    scrollWindow.scrollTop = scrollWindow.scrollHeight;
  };

  useEffect(() => {
    setScroll();
  }, [data.history]);

  return (
    <div
      className={`mb-3 ${
        data.history.length <= ADMIN_MESSAGE_COUNT
          ? "h-[35%] lg:h-[45%] xl:h-[55%]"
          : "h-[80%]"
      }`}
    >
      <div
        id="scrollWindow"
        className="flex flex-col w-full h-full overflow-x-hidden overflow-y-scroll scroll-smooth"
      >
        {data.history.map((message) => (
          <ChatMessageItem
            key={message.id}
            message={message}
            handleAccept={handleAccept}
            handleDecline={handleDecline}
            partnerName={data.partner.firstName}
          />
        ))}
      </div>
    </div>
  );
}

export default ChatMessageList;
