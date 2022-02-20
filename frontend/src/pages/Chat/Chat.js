import React, { useEffect, useState } from "react";
import Spinner from "../../components/Spinner/Spinner";
import ChatWindow from "../../components/Chat/ChatWindow";
import Navbar from "../../components/Navbar";
import { GET_MESSAGE } from "../../graphql/subscriptions/Chat";
import { GET_CHAT_ROOMS } from "../../graphql/queries/Chat";
import { useQuery } from "@apollo/client";

function Chat() {
  const [roomId, setRoomId] = useState("62080f1ff0323933be00006e");
  const { loading, error, data, subscribeToMore } = useQuery(GET_CHAT_ROOMS);

  useEffect(() => {
    subscribeToMore({
      document: GET_MESSAGE,
      variables: { roomId: `${roomId}` },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) {
          return prev;
        }

        const newChat = subscriptionData.data.messageSent;
        const room = prev.chatRooms.find((room) => room.id === roomId);
        let newChatRooms = prev.chatRooms.filter((room) => room.id !== roomId);
        newChatRooms.unshift(
          Object.assign({}, room, {
            history: [...room.history, newChat],
          })
        );
        console.log(room);
        console.log(newChatRooms);
        return Object.assign({}, prev, {
          chatRooms: newChatRooms,
        });
      },
    });
  }, []);

  if (loading) return <Spinner />;
  if (error)
    return (
      <div className="italic place-self-center my-auto">
        An error occurs, please try again later!
      </div>
    );

  if (data)
    return (
      <div className="h-screen">
        <Navbar />
        <section className="min-h-[85%] max-h-[85%] flex ">
          <ChatWindow data={data.chatRooms[0]} />
        </section>
      </div>
    );
}

export default Chat;
