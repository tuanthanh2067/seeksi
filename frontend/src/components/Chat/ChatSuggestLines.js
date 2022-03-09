import React from "react";
import Spinner from "../Spinner/Spinner";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./ChatSuggestLines.css";

import { useQuery, useMutation } from "@apollo/client";
import { GET_OPENING_LINES } from "../../graphql/queries/Chat";
import {
  SEND_MESSAGE,
  INCREMENT_USE_COUNT,
} from "../../graphql/mutations/Chat";

const Slide = ({ lines, sendLine }) => {
  return (
    <div className="flex justify-center items-stretch my-1 gap-x-2">
      {lines.map((line, key) => (
        <button
          className="max-w-[28%] min-w-[28%] border-primary border-[1px] rounded-[2rem] text-xs text-center text-black hover:text-primary py-1 px-6"
          key={key}
          onClick={() => sendLine(line.content, line.id)}
        >
          {line.content}
        </button>
      ))}
    </div>
  );
};

const ChatSuggestLines = (props) => {
  const [sendMessage] = useMutation(SEND_MESSAGE);
  const [incrementUseCount] = useMutation(INCREMENT_USE_COUNT);
  const { loading, error, data } = useQuery(GET_OPENING_LINES);

  const sendLine = (content, id) => {
    sendMessage({
      variables: {
        roomId: props.roomId,
        content: content,
      },
      onError: (err) => {},
      onCompleted: (data) => {
        incrementUseCount({
          variables: {
            lineId: id,
          },
          onError: (err) => {
            console.log(err);
          },
          onCompleted: (data) => {
            console.log(data);
          },
        });
      },
    });
  };

  return (
    <div className="w-full border-t-primary border-t-[1px] p-1 ">
      <div className="text-center text-xs font-semibold mx-auto my-1">
        ✨ Suggested Lines ✨
      </div>
      {loading && <Spinner />}
      {error && (
        <div className="italic place-self-center text-xs my-auto mx-auto">
          An error occurs, please try again later!
        </div>
      )}

      {data && (
        <Carousel
          showArrows={true}
          showStatus={false}
          showIndicators={false}
          showThumbs={false}
        >
          <Slide lines={data.getOpeningLine.slice(0, 3)} sendLine={sendLine} />
          <Slide lines={data.getOpeningLine.slice(3, 6)} sendLine={sendLine} />
          <Slide lines={data.getOpeningLine.slice(6)} sendLine={sendLine} />
        </Carousel>
      )}
    </div>
  );
};

export default ChatSuggestLines;
