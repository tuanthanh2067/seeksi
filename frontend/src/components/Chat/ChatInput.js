import React, { useState } from "react";
import Emoji from "../../assets/emoji.png";
import Upload from "../../assets/upload.png";
import Send from "../../assets/send.svg";

import { Picker } from "emoji-mart";
import "emoji-mart/css/emoji-mart.css";
import "./ChatInput.css";

import { SEND_MESSAGE } from "../../graphql/mutations/Chat";
import { useMutation } from "@apollo/client";

function ChatInput(props) {
  const [message, setMessage] = useState("");
  const [sendMessage] = useMutation(SEND_MESSAGE);

  const handleGame = () => {};

  const handleSendMessage = () => {
    sendMessage({
      variables: {
        roomId: props.roomId,
        content: message,
      },
      onError: (err) => {
        // do something
        console.log(err);
      },
      onCompleted: (data) => {
        console.log(data);
      },
    });
    setMessage("");
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <>
      <div className="flex-none flex gap-x-3 py-5 bottom-0">
        <button
          className="border-primary border-2 focus:outline-2 bg-primary text-white text-md font-semibold rounded w-12 "
          onClick={handleGame}
        >
          Game
        </button>

        <input
          type="text"
          value={message}
          placeholder="Type your message here..."
          className="border-black border-[1px] rounded-md px-4 w-[85%]"
          onChange={(e) => {
            setMessage(e.target.value);
          }}
          onKeyPress={handleKeyPress}
        />

        <div>
          {props.showEmoji && (
            <span className="absolute -mt-[355px] -ml-[245px]">
              <Picker
                perLine={7}
                onSelect={(e) => {
                  setMessage(message + e.native);
                }}
              />
            </span>
          )}
          <button
            className="pt-2"
            onClick={() => props.setShowEmoji(!props.showEmoji)}
          >
            <img src={`${Emoji}`} alt="emoji" className="w-6" />
          </button>
        </div>
        <div className="">
          <input
            type="file"
            id="img"
            accept="image/*"
            onChange={props.handleChange}
            hidden
          />
          <label htmlFor="img">
            <img
              src={`${Upload}`}
              alt="upload"
              style={{ cursor: "pointer" }}
              className="w-8 pt-1"
            />
          </label>
        </div>
        <button
          className="border-primary border-2 bg-primary rounded w-9 "
          onClick={handleSendMessage}
        >
          <img src={`${Send}`} alt="emoji" className="w-6" />
        </button>
      </div>
    </>
  );
}

export default ChatInput;
