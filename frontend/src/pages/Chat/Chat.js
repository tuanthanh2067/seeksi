import React, { useEffect, useState } from "react";
import Spinner from "../../components/Spinner/Spinner";
import ChatWindow from "../../components/Chat/ChatWindow";
import ChatPartner from "../../components/Chat/ChatPartner";
import Navbar from "../../components/Navbar";
import Confirmation from "../Modal/Confirmation";
import { GET_MESSAGE } from "../../graphql/subscriptions/Chat";
import { GET_CHAT_ROOMS } from "../../graphql/queries/Chat";
import { UNMATCH } from "../../graphql/mutations/Match";
import { useMutation, useQuery } from "@apollo/client";

function Chat() {
  const [activeRoomId, setActiveRoomId] = useState({});
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [partnerId, setPartnerId] = useState("");
  const { loading, error, data, subscribeToMore, refetch } =
    useQuery(GET_CHAT_ROOMS);
  const [unmatch] = useMutation(UNMATCH);

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

  useEffect(() => {
    let unsubscribe = [];

    if (data) {
      data.chatRooms.forEach((chatRoom) => {
        unsubscribe.push(
          subscribeToMore({
            document: GET_MESSAGE,
            variables: { roomId: chatRoom.id },
            updateQuery: (prev, { subscriptionData }) => {
              if (!subscriptionData.data) {
                return prev;
              }

              const newChat = subscriptionData.data.messageSent;
              const room = prev.chatRooms.find(
                (room) => room.id === chatRoom.id
              );

              let newChatRooms = prev.chatRooms.filter(
                (room) => room.id !== chatRoom.id
              );
              newChatRooms.unshift(
                Object.assign({}, room, {
                  history: [...room.history, newChat],
                })
              );
              console.log(room.history);

              return Object.assign({}, prev, {
                chatRooms: newChatRooms,
              });
            },
          })
        );
      });
    }
    return () => {
      if (unsubscribe.length > 0) {
        for (let i = 0; i < unsubscribe.length; i++) {
          unsubscribe[i]();
        }
      }
    };
  }, [data, subscribeToMore]);

  if (loading) return <Spinner />;
  if (error)
    return (
      <div className="italic place-self-center my-auto">
        An error occurs, please try again later!
      </div>
    );

  if (data) {
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
            data={data.chatRooms}
            onRoomSelect={handleRoomSelect}
            setPartnerId={setPartnerId}
          />
          <ChatWindow
            data={data.chatRooms.find((room) => room.id === activeRoomId)}
            setShowConfirmation={setShowConfirmation}
            refetch={refetch}
          />
        </section>
      </div>
    );
  }
}

export default Chat;
