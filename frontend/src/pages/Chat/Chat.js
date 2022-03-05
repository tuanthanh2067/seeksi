import React, { useEffect, useState } from "react";
import Spinner from "../../components/Spinner/Spinner";
import ChatWindow from "../../components/Chat/ChatWindow";
import ChatPartner from "../../components/Chat/ChatPartner";
import Navbar from "../../components/Navbar";
import { GET_MESSAGE } from "../../graphql/subscriptions/Chat";
import { GET_CHAT_ROOMS } from "../../graphql/queries/Chat";
import { useQuery } from "@apollo/client";

function Chat() {
  const [activeRoomId, setActiveRoomId] = useState({});
  const { loading, error, data, subscribeToMore } = useQuery(GET_CHAT_ROOMS);

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
        <Navbar />
        <section className="container mx-auto py-5 md:p-5 min-h-[85%] max-h-[85%] flex">
          <ChatPartner data={data.chatRooms} onRoomSelect={handleRoomSelect} />
          <ChatWindow
            data={data.chatRooms.find((room) => room.id === activeRoomId)}
          />
        </section>
      </div>
    );
  }
}

export default Chat;
