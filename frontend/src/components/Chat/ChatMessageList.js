import React, { useEffect } from "react";
import ChatMessageItem from "./ChatMessageItem";
import ChatSuggestLines from "./ChatSuggestLines";

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
          <ChatMessageItem message={message.content} sendBy={message.sendBy} />
        ))}
      </div>
      {data.history.length < 4 && <ChatSuggestLines roomId={data.id} />}
    </div>
  );
}

export default ChatMessageList;
