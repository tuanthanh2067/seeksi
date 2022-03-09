import React, { useState } from "react";

import ChatHeader from "./ChatHeader";
import ChatInput from "./ChatInput";
import ChatMessageList from "./ChatMessageList";

function ChatWindow({ data, setShowConfirmation, refetch }) {
  const [showEmoji, setShowEmoji] = useState(false);

  return data ? (
    <div className="flex flex-col items-stretch gap-y-2 container col-start-2 w-2/3 h-full">
      <ChatHeader
        avatar={data.partner.avatar.small}
        firstName={data.partner.firstName}
        setShowConfirmation={setShowConfirmation}
        isDisabled={data.isDisabled}
      />
      <ChatMessageList data={data} />
      {data.isDisabled ? (
        <div className="flex items-center justify-center py-5">
          <div className="font-medium place-self-center my-auto">
            🔒 {data.partner.firstName} is unmatched. You are now unable to send
            message to {data.partner.firstName} 🔒
          </div>
        </div>
      ) : (
        <ChatInput
          roomId={data.id}
          showEmoji={showEmoji}
          setShowEmoji={setShowEmoji}
          refetch={refetch}
        />
      )}
    </div>
  ) : (
    <div className="flex flex-col gap-y-2 container col-start-2 w-2/3 min-h-[85%] max-h-[85%] items-center justify-center">
      <p className="text-3xl text-primary font-bold">
        There's nothing here. 😢
      </p>
      <p>Select a partner to start talking!</p>
    </div>
  );
}

export default ChatWindow;
