import React, { useEffect, useState } from "react";
import Spinner from "../../components/Spinner/Spinner";
import ChatWindow from "../../components/Chat/ChatWindow";
import ChatPartner from "../../components/Chat/ChatPartner";
import Navbar from "../../components/Navbar";
import Confirmation from "../Modal/Confirmation";
import { UNMATCH } from "../../graphql/mutations/Match";
import { useMutation, useQuery } from "@apollo/client";

function Chat({ loading, error, data, refetch }) {
  const [activeRoomId, setActiveRoomId] = useState({});
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [partnerId, setPartnerId] = useState("");

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
