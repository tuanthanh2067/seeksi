import React, { useEffect } from "react";
import ChatMessageItem from "./ChatMessageItem";
import ChatSuggestLines from "./ChatSuggestLines";

const ADMIN_MESSAGE_COUNT = 3;

function ChatMessageList({ data }) {
  const setScroll = () => {
    let scrollWindow = document.getElementById("scrollWindow");
    scrollWindow.scrollTop = scrollWindow.scrollHeight;
  };

  useEffect(() => {
    setScroll();
  });

  return (
    <div className="flex flex-col h-[28rem]">
      <div
        id="scrollWindow"
        className="relative min-h-[80%] grow flex flex-col overflow-x-hidden overflow-y-scroll scroll-smooth"
      >
        {data.history.map((message) => (
          <ChatMessageItem
            message={message.content}
            photos={message.photos}
            sendBy={message.sendBy}
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
