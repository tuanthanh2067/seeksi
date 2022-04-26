import React, { useEffect } from "react";
import ChatMessageItem from "./ChatMessageItem";
import Dropzone from "react-dropzone";
import { useMutation } from "@apollo/client";
import { SEND_MESSAGE } from "../../graphql/mutations/Chat";
import toast from "react-hot-toast";
const ADMIN_MESSAGE_COUNT = 3;

function ChatMessageList({ data, handleAccept, handleDecline }) {
  const setScroll = () => {
    let scrollWindow = document.getElementById("scrollWindow");
    scrollWindow.scrollTop = scrollWindow.scrollHeight;
  };

  const [sendMessage] = useMutation(SEND_MESSAGE);

  useEffect(() => {
    setScroll();
  }, [data.history]);

  const handleSendImg = (imgs) => {
    sendMessage({
      variables: {
        roomId: data.id,
        content: "",
        photos: imgs,
      },
      onError: (err) => {
        toast.error(err.message);
        if (err.message === "Chat room has been disabled") data.refetch();
      },
      onCompleted: (data) => {},
    });
  };

  return (
    <div
      className={`mb-3 ${
        data.history.length <= ADMIN_MESSAGE_COUNT
          ? "h-[35%] lg:h-[45%] xl:h-[55%]"
          : "h-[80%]"
      }`}
    >
      <div className="w-full h-full">
        <Dropzone noClick={true} onDrop={(imgs) => handleSendImg(imgs)}>
          {({ getRootProps }) => (
            <div
              id="scrollWindow"
              className="flex flex-col w-full h-full overflow-x-hidden overflow-y-scroll scroll-smooth"
              {...getRootProps()}
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
          )}
        </Dropzone>
      </div>
    </div>
  );
}

export default ChatMessageList;
