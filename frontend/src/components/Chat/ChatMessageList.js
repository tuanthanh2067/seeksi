import React, { useEffect } from "react";
import ChatMessageItem from "./ChatMessageItem";

function ChatMessageList({ data }) {
  const setScroll = () => {
    let scrollWindow = document.getElementById("scrollWindow");
    scrollWindow.scrollTop = scrollWindow.scrollHeight;
  };

  useEffect(() => {
    setScroll();
  });

  return (
    <div className="h-[28rem] flex flex-col">
      <div
        id="scrollWindow"
        className="relative min-h-[80%] grow flex flex-col overflow-x-hidden overflow-y-scroll scroll-smooth"
      >
        {data.history.map((message) => (
          <ChatMessageItem message={message.content} sendBy={message.sendBy} />
        ))}
      </div>
    </div>
  );
}

export default ChatMessageList;
