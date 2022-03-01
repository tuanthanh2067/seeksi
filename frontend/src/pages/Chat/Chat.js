import React, { useState, useEffect } from "react";
import Spinner from "../../components/Spinner/Spinner";
import ChatWindow from "../../components/Chat/ChatWindow";
import ChatPartner from "../../components/Chat/ChatPartner";
import Navbar from "../../components/Navbar";
import Confirmation from "../Modal/Confirmation";
import { useSubscription, useMutation } from "@apollo/client";
import { UNMATCH } from "../../graphql/mutations/Match";
import { STATUS_UPDATED } from "../../graphql/subscriptions/User";

function Chat({ loading, error, roomsData, refetch }) {
  const [activeRoomId, setActiveRoomId] = useState({});
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [partnerId, setPartnerId] = useState("");
  const [chatRooms, setChatRooms] = useState([]);

  const [unmatch] = useMutation(UNMATCH);
  const { data } = useSubscription(STATUS_UPDATED, {
    variables: {
      partners: chatRooms.map((room) => room.partner.id),
    },
  });

  useEffect(() => {
    if (roomsData) {
      const getStatus = () => {
        const updatedChatRooms = roomsData.chatRooms.map((room) => {
          let partnerLastSeen, isOnline;
          if (data && data.statusUpdated.userId === room.partner.id) {
            console.log(data.statusUpdated.lastSeen);
            partnerLastSeen = new Date(data.statusUpdated.lastSeen * 1);
          }

          isOnline =
            (new Date() - partnerLastSeen) / 1000 <=
            process.env.REACT_APP_STATUS_EXPIRE_AFTER
              ? true
              : false;

          return {
            ...room,
            partner: {
              ...room.partner,
              isOnline: isOnline,
              partnerLastSeen: partnerLastSeen,
            },
          };
        });

        setChatRooms(updatedChatRooms);
      };

      getStatus();
      const interval = setInterval(getStatus, 30000);
      return () => {
        clearInterval(interval);
      };
    }
  }, [roomsData, data]);

  const handleUnmatch = () => {
    unmatch({
      variables: {
        id: partnerId,
      },
      onError: (err) => {
        console.log(err);
      },
      onCompleted: (data) => {
        console.log(data.unmatch.message);
        setShowConfirmation(false);
        refetch();
      },
    });
  };

  const handleRoomSelect = (roomId) => {
    setActiveRoomId(roomId);
  };

  if (loading) return <Spinner />;
  if (error)
    return (
      <div className="italic place-self-center my-auto">
        An error occurs, please try again later!
      </div>
    );

  if (roomsData) {
    return (
      <div className="h-screen">
        {showConfirmation && (
          <div
            onClick={(e) => {
              if (e.currentTarget.firstChild === e.target) {
                setShowConfirmation(false);
              }
            }}
          >
            <Confirmation
              title="Unmatch"
              content={`Are you sure to unmatch?`}
              handleCancel={() => setShowConfirmation(false)}
              handleConfirm={handleUnmatch}
            />
          </div>
        )}
        <Navbar />
        <section className="container mx-auto py-5 md:p-5 min-h-[85%] max-h-[85%] flex">
          <ChatPartner
            data={chatRooms}
            onRoomSelect={handleRoomSelect}
            setPartnerId={setPartnerId}
          />
          <ChatWindow
            data={chatRooms.find((room) => room.id === activeRoomId)}
            setShowConfirmation={setShowConfirmation}
            refetch={refetch}
          />
        </section>
      </div>
    );
  }
}

export default Chat;
