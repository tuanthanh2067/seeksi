import { useState } from "react";
import Input from "../Input/Input";
import defaultAvt from "../../assets/mock_avatar.png";

const ChatPartner = (props) => {
  const [searchInputText, setSearchInputText] = useState("");
  const searchInputHandler = (e) => {
    setSearchInputText(e.target.value.toLowerCase());
  };

  const roomsData = props.data.map((chatRoom) => {
    const {
      partner: {
        id: partnerId,
        avatar: { small: partnerAvatar },
        firstName: partnerName,
      },
      history,
    } = chatRoom;

    const latestMsg = history[history.length - 1];
    const sentBy = latestMsg.sendBy === partnerId ? partnerName : "You";
    const latestMsgContent = !latestMsg.photo
      ? `${latestMsg.content.split(" ").slice(0, 5).join(" ")}...`
      : `${sentBy} sent a photo.`;

    return {
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
        width="w-full"
        placeholder="Search"
        onChange={searchInputHandler}
      />
      {roomsDataFiltered.map((room) => (
        <div id="partner-card" className="mt-6 w-full">
          <div className="flex items-center py-4">
            <img
              src={room.partnerAvatar ? room.partnerAvatar : defaultAvt}
              alt="user's avatar"
              className="object-contain w-20 h-20 mr-4 rounded-full"
            />
            <div className="w-full text-ellipsis">
              <p className="text-lg font-bold">{room.partnerName}</p>
              <p>{room.latestMsgContent}</p>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};

export default ChatPartner;
