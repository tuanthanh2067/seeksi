import { useState } from "react";
import Input from "../Input/Input";
import defaultAvt from "../../assets/mock_avatar.png";

const ChatPartner = ({ data, onRoomSelect, setPartnerId }) => {
  const [searchInputText, setSearchInputText] = useState("");
  const searchInputHandler = (e) => {
    setSearchInputText(e.target.value.toLowerCase());
  };

  const roomsData = data.map((chatRoom) => {
    const {
      id: roomId,
      partner: {
        id: partnerId,
        avatar: { small: partnerAvatar },
        firstName: partnerName,
      },
      history,
      isDisabled,
    } = chatRoom;

    const latestMsg = history[history.length - 1];
    const sentBy = latestMsg.sendBy === partnerId ? partnerName : "You";

    let latestMsgContent = "";
    if (latestMsg.photos.length) {
      latestMsgContent = `${sentBy} sent a photo.`;
    } else {
      if (latestMsg.sendBy !== partnerId && latestMsg.sendBy !== "admin")
        latestMsgContent = "You: ";
      latestMsgContent += latestMsg.content;
    }

    return {
      isDisabled,
      roomId,
      partnerId,
      partnerAvatar,
      partnerName,
      latestMsgContent,
    };
  });

  const roomsDataFiltered = roomsData.filter((room) => {
    if (searchInputText === "") {
      return room;
    } else {
      return room.partnerName.toLowerCase().includes(searchInputText);
    }
  });

  return (
    <section className="w-1/3 min-h-[85%] max-h-[85%] pr-6 mr-6 border-r-[1px] border-r-primary">
      <Input
        type="text"
        width="w-full mb-4"
        placeholder="Search"
        onChange={searchInputHandler}
      />
      {roomsDataFiltered.map((room) => (
        <button
          key={room.roomId}
          className="w-full text-left hover:bg-[#c4c4c44d] focus:bg-[#f06c9b1f]"
          onClick={() => {
            onRoomSelect(room.roomId);
            setPartnerId(room.partnerId);
          }}
        >
          <div className="grid grid-cols-5 gap-x-4 p-3">
            <div className="">
              <img
                src={
                  room.partnerAvatar && !room.isDisabled
                    ? room.partnerAvatar
                    : defaultAvt
                }
                alt="user's avatar"
                className="object-contain w-full rounded-full"
              />
            </div>
            <div className="col-start-2 col-span-5 flex flex-col justify-center">
              <p className="text-lg font-bold">{room.partnerName}</p>
              <p className="text-ellipsis overflow-hidden whitespace-nowrap">
                {room.isDisabled ? "User unmatched" : room.latestMsgContent}
              </p>
            </div>
          </div>
        </button>
      ))}
    </section>
  );
};

export default ChatPartner;
