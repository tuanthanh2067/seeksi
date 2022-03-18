import React, { useEffect } from "react";
import ChatMessageItem from "./ChatMessageItem";
import ChatSuggestLines from "./ChatSuggestLines";

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
    <div className="flex flex-col h-[28rem]">
      <div
        id="scrollWindow"
        className="relative min-h-[80%] grow flex flex-col overflow-x-hidden overflow-y-scroll scroll-smooth"
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
      {data.history.length <= ADMIN_MESSAGE_COUNT && (
        <ChatSuggestLines roomId={data.id} />
      )}
    </div>
  );
}

export default ChatMessageList;
