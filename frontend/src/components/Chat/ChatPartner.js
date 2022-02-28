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
    } = chatRoom;

    const latestMsg = history[history.length - 1];
    const sentBy = latestMsg.sendBy === partnerId ? partnerName : "You";

    let latestMsgContent = "";
    if (latestMsg.photo) {
      latestMsgContent = `${sentBy} sent a photo.`;
    } else {
      if (latestMsg.sendBy !== partnerId && latestMsg.sendBy !== "admin")
        latestMsgContent = "You: ";
      latestMsgContent +=
        latestMsg.content.split(" ").length > 4
          ? `${latestMsg.content.split(" ").slice(0, 4).join(" ")}...`
          : latestMsg.content;
    }

    return {
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
          <div className="flex items-center p-4">
            <img
              src={room.partnerAvatar ? room.partnerAvatar : defaultAvt}
              alt="user's avatar"
              className="object-contain w-20 h-20 mr-4 rounded-full"
            />
            <div className="w-full text-ellipsis">
              <p className="text-lg font-bold">{room.partnerName}</p>
              <p className="break-all">{room.latestMsgContent}</p>
            </div>
          </div>
        </button>
      ))}
    </section>
  );
};

export default ChatPartner;
