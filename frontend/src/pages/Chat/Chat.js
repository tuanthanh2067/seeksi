import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Spinner from "../../components/Spinner/Spinner";
import ChatWindow from "../../components/Chat/ChatWindow";
import ChatPartner from "../../components/Chat/ChatPartner";
import Navbar from "../../components/Navbar";
import Confirmation from "../Modal/Confirmation";
import { useMutation, useQuery } from "@apollo/client";
import { UNMATCH } from "../../graphql/mutations/Match";
import { STATUS_UPDATED } from "../../graphql/subscriptions/User";
import { GET_USER_STATUSES } from "../../graphql/queries/User";

function Chat({ roomsLoading, roomsError, roomsData: { chatRooms }, refetch }) {
  const [activeRoomId, setActiveRoomId] = useState({});
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [partnerId, setPartnerId] = useState("");
  const [userStatuses, setUserStatuses] = useState({});

  const [unmatch] = useMutation(UNMATCH);

  const { data, subscribeToMore } = useQuery(GET_USER_STATUSES, {
    variables: { partnerIds: chatRooms.map((room) => room.partner.id) },
  });

  // subscribe to partners' statuses
  useEffect(() => {
    const unsubscribe = subscribeToMore({
      document: STATUS_UPDATED,
      variables: { partners: chatRooms.map((room) => room.partner.id) },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) {
          return prev;
        }

        const newStatus = subscriptionData.data.statusUpdated;
        let newStatuses = prev.getUserStatuses.filter(
          (status) => status.userId !== newStatus.userId
        );

        return Object.assign({}, prev, {
          getUserStatuses: [newStatuses, newStatus],
        });
      },
    });

    return () => unsubscribe();
  }, [data, subscribeToMore, chatRooms]);

  // update partners' statuses every 10 seconds
  useEffect(() => {
    if (chatRooms) {
      const getStatus = () => {
        let statuses = {};
        chatRooms.forEach((room) => {
          let partnerLastSeen = 0;

          if (data && data.getUserStatuses.length !== 0) {
            const status = data.getUserStatuses.find(
              (status) => status.userId === room.partner.id && !room.isDisabled
            );
            if (status) partnerLastSeen = new Date(status.lastSeen * 1);
          }

          const isOnline =
            (new Date() - partnerLastSeen) / 1000 <=
            process.env.REACT_APP_STATUS_EXPIRE_AFTER
              ? true
              : false;

          statuses[room.partner.id] = isOnline;
        });

        setUserStatuses(statuses);
      };

      getStatus();
      const interval = setInterval(
        getStatus,
        process.env.REACT_APP_GET_STATUS_AFTER * 1000
      );
      return () => {
        clearInterval(interval);
      };
    }
  }, [chatRooms, data]);

  const handleUnmatch = () => {
    unmatch({
      variables: {
        id: partnerId,
      },
      onError: (err) => {
        toast.error(err.message);
      },
      onCompleted: (data) => {
        if (data.unmatch.success) {
          setShowConfirmation(false);
          toast.success(data.unmatch.message);
          refetch();
        } else {
          toast.error(data.unmatch.message);
        }
      },
    });
  };

  const handleRoomSelect = (roomId) => {
    setActiveRoomId(roomId);
  };

  if (roomsLoading) return <Spinner />;
  if (roomsError)
    return (
      <div className="italic place-self-center my-auto">
        An error occurs, please try again later!
      </div>
    );

  if (chatRooms.length > 0) {
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
            userStatuses={userStatuses}
          />
          <ChatWindow
            data={chatRooms.find((room) => room.id === activeRoomId)}
            setShowConfirmation={setShowConfirmation}
            refetch={refetch}
            userStatus={userStatuses[partnerId]}
          />
        </section>
      </div>
    );
  }
}

export default Chat;
