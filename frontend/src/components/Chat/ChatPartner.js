import React, { useState } from "react";
import Input from "../Input/Input";
import defaultAvt from "../../assets/mock_avatar.png";

const ChatPartner = ({ data, onRoomSelect, setPartnerId, userStatuses }) => {
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
    <section className="col-span-1 pr-6 h-[85vh]">
      <Input
        type="text"
        width="w-full mb-4"
        placeholder="Search"
        onChange={searchInputHandler}
      />
      {data.length === 0 && (
        <div className="italic text-sm text-center my-auto">
          <p> No matches found.</p>
          <p> Find your match to start chatting!</p>
        </div>
      )}

      <div className="overflow-y-scroll">
        {data.length > 0 &&
          roomsDataFiltered.map((room) => (
            <button
              key={room.roomId}
              className="w-full text-left hover:bg-[#c4c4c44d] focus:bg-[#f06c9b1f]"
              onClick={() => {
                onRoomSelect(room.roomId);
                setPartnerId(room.partnerId);
              }}
            >
              <div className="grid grid-cols-4 justify-items-center py-4">
                <div className="col-span-1 flex items-center w-10 h-10 md:w-12 md:h-12 lg:w-16 lg:h-16">
                  <img
                    src={
                      room.partnerAvatar && !room.isDisabled
                        ? room.partnerAvatar
                        : defaultAvt
                    }
                    alt="user's avatar"
                    className="w-full object-contain rounded-full"
                  />
                </div>
                <div className="col-span-3 self-center w-full pr-4 text-ellipsis">
                  <p>
                    {userStatuses[room.partnerId] && (
                      <span className="h-3 w-3 bg-green inline-block rounded-full mr-2"></span>
                    )}
                    <span className="text-lg font-bold inline-block">
                      {room.partnerName}
                    </span>
                  </p>
                  <p className="text-ellipsis overflow-hidden whitespace-nowrap">
                    {room.isDisabled ? "User unmatched" : room.latestMsgContent}
                  </p>
                </div>
              </div>
            </button>
          ))}
      </div>
    </section>
  );
};

export default ChatPartner;
