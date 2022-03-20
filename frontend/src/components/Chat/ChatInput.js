import React, { useState } from "react";
import toast from "react-hot-toast";
import Emoji from "../../assets/emoji.png";
import Upload from "../../assets/upload.png";
import Send from "../../assets/send.svg";

import RoundedImage from "../Image/RoundedImage";
import { Picker } from "emoji-mart";
import "emoji-mart/css/emoji-mart.css";
import "./ChatInput.css";

import ChatSuggestLines from "./ChatSuggestLines";

import { SEND_MESSAGE } from "../../graphql/mutations/Chat";
import { useMutation } from "@apollo/client";

const ADMIN_MESSAGE_COUNT = 3;

function ChatInput(props) {
  const [message, setMessage] = useState("");
  const [sendMessage] = useMutation(SEND_MESSAGE);
  const [images, setImages] = useState([]);
  const [uploadImgs, setUploadImgs] = useState([]);
  const [err, setErr] = useState("");
  const [render, setRender] = useState(0);

  const handleChange = (e) => {
    let newImgs = images;
    if (images.length < 3) {
      newImgs.push(URL.createObjectURL(e.target.files[0]));
      // No use but make img render immediately
      let idx = newImgs.length;
      setRender(idx);
      //*********
      setImages(newImgs);
      newImgs = uploadImgs;
      newImgs.push(e.target.files[0]);
      setUploadImgs(newImgs);
    } else {
      setErr("*You can upload up to 3 photos only");
    }
  };

  const handleRemove = (e) => {
    let newImgs = images;
    newImgs.splice(e.target.id, 1);
    let idx = newImgs.length;
    setRender(idx); // No use but make img render immediately
    setImages(newImgs);
    newImgs = uploadImgs;
    newImgs.splice(e.target.id, 1);
    setUploadImgs(newImgs);
    setErr("");
  };

  const handleSendMessage = () => {
    if (message !== "" || uploadImgs.length !== 0) {
      sendMessage({
        variables: {
          roomId: props.roomId,
          content: message,
          photos: uploadImgs,
        },
        onError: (err) => {
          toast.error(err.message);
          if (err.message === "Chat room has been disabled") props.refetch();
        },
        onCompleted: (data) => {},
      });
    }
    setMessage("");
    setImages([]);
    setErr("");
    setUploadImgs([]);
    setRender(0);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <div className="mb-4">
      {images.length > 0 && (
        <div className="m-auto mb-4">
          {err && (
            <div className="flex flex-row justify-center text-red-600 font-medium pb-2.5">
              {err}
            </div>
          )}
          <div className="flex flex-row justify-center">
            {images.map((src, key) => {
              return (
                <div className="block justify-self-center w-20 h-20 mx-5 my-0 bg-medium-gray rounded">
                  <RoundedImage
                    src={src}
                    handleRemove={handleRemove}
                    idx={key}
                    key={key}
                    small={true}
                  />
                </div>
              );
            })}
          </div>
        </div>
      )}
      {props.historyLength <= ADMIN_MESSAGE_COUNT && (
        <ChatSuggestLines roomId={props.roomId} />
      )}
      <div className="flex gap-x-3">
        <button
          className="border-primary border-2 focus:outline-2 bg-primary text-white text-md font-semibold rounded w-12 "
          onClick={props.handleGame}
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
            onChange={handleChange}
            onClick={(e) => (e.target.value = "")}
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
    </div>
  );
}

export default ChatInput;
