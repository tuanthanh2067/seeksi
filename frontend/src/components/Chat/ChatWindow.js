import React, { useState } from "react";

import ChatHeader from "./ChatHeader";
import ChatInput from "./ChatInput";
import ChatMessageList from "./ChatMessageList";

function ChatWindow({ data }) {
  const [showEmoji, setShowEmoji] = useState(false);

  return (
    <div className="flex flex-col gap-y-2 container col-start-2 w-2/3 h-full">
      <ChatHeader
        avatar={data.partner.avatar.small}
        firstName={data.partner.firstName}
      />
      <ChatMessageList data={data} />
      <ChatInput
        roomId={data.id}
        showEmoji={showEmoji}
        setShowEmoji={setShowEmoji}
      />
    </div>
  );
}

export default ChatWindow;
