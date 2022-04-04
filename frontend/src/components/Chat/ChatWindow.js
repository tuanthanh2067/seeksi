import React, { useState } from "react";

import ChatHeader from "./ChatHeader";
import ChatInput from "./ChatInput";
import ChatMessageList from "./ChatMessageList";

function ChatWindow({
  data,
  setShowConfirmation,
  setShowReport,
  refetch,
  userStatus,
  handleGame,
  handleAccept,
  handleDecline,
  gameRequestId,
}) {
  const [showEmoji, setShowEmoji] = useState(false);

  return data ? (
    <div className="col-span-2 pl-6 h-[85vh] border-l border-l-primary container">
      <ChatHeader
        avatar={data.partner.avatar.small}
        partnerId={data.partner.id}
        firstName={data.partner.firstName}
        isDisabled={data.isDisabled}
        userStatus={userStatus}
        setShowConfirmation={setShowConfirmation}
        setShowReport={setShowReport}
      />
      <ChatMessageList
        data={data}
        handleAccept={() => handleAccept(gameRequestId, data.id)}
        handleDecline={() => handleDecline(gameRequestId, data.id)}
        gameRequestId={gameRequestId}
        chatRoomId={data.id}
      />
      {data.isDisabled ? (
        <div className="flex items-center justify-center">
          <p className="font-medium place-self-center my-auto">
            🔒 {data.partner.firstName} is unmatched. You are now unable to send
            message to {data.partner.firstName} 🔒
          </p>
        </div>
      ) : (
        <ChatInput
          historyLength={data.history.length}
          roomId={data.id}
          showEmoji={showEmoji}
          setShowEmoji={setShowEmoji}
          refetch={refetch}
          handleGame={handleGame}
        />
      )}
    </div>
  ) : (
    <div className="col-span-2 flex flex-col gap-y-2 container items-center justify-center">
      <p className="text-3xl text-primary font-bold">
        There's nothing here. 😢
      </p>
      <p>Select a partner to start talking!</p>
    </div>
  );
}

export default ChatWindow;
