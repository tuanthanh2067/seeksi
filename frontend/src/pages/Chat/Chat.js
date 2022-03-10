import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Spinner from "../../components/Spinner/Spinner";
import ChatWindow from "../../components/Chat/ChatWindow";
import ChatPartner from "../../components/Chat/ChatPartner";
import Navbar from "../../components/Navbar";
import Confirmation from "../Modal/Confirmation";
import Report from "../Modal/Report";

import { useMutation, useQuery } from "@apollo/client";
import { UNMATCH } from "../../graphql/mutations/Match";
import { STATUS_UPDATED } from "../../graphql/subscriptions/User";
import { GET_USER_STATUSES } from "../../graphql/queries/User";
import { SEND_GAME_REQUEST } from "../../graphql/mutations/Game";

function Chat({ roomsLoading, roomsError, roomsData: { chatRooms }, refetch }) {
  const [activeRoomId, setActiveRoomId] = useState({});
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showGameRequest, setShowGameRequest] = useState(false);
  const [showGameRequestStatus, setShowGameRequestStatus] = useState(false);
  const [gameRequestStatus, setGameRequestStatus] = useState("");
  const [partnerId, setPartnerId] = useState("");
  const [userStatuses, setUserStatuses] = useState({});
<<<<<<< HEAD
  const [showReport, setShowReport] = useState(false);
  const [isOnline, setIsOnline] = useState(false);
  const [gamePlayed, setGamePlayed] = useState(false);
=======
>>>>>>> 00c32d0 (add mutation)

  const [unmatch] = useMutation(UNMATCH);
  const [sendGameRequest] = useMutation(SEND_GAME_REQUEST);

  const handleGame = () => {
    const room = chatRooms.find((room) => room.partner.id === partnerId);

    if (!room.gameRoom) {
      if (!userStatuses[partnerId]) {
        setGameRequestStatus("Partner is offline. Please try again later");
        setShowGameRequestStatus(true);
      } else {
        setShowGameRequest(true);
      }
    } else {
      // display game results
    }
  };

  const handleSendGameRequest = () => {
    sendGameRequest({
      variables: {
        to: partnerId,
      },
      onError: (err) => {
        console.log(err);
        setShowGameRequest(false);
        if (err.message === "Partner is offline") {
          // show error toaster here
        } else {
          setGameRequestStatus(
            "Game request already sent. Waiting for response..."
          );
          setShowGameRequestStatus(true);
        }
      },
      onCompleted: (data) => {
        setShowGameRequest(false);
        setGameRequestStatus(
          `Game request sent successfully. Waiting for response...`
        );
        setShowGameRequestStatus(true);
      },
    });
  };

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
        let oldStatuses = prev.getUserStatuses.filter(
          (status) => status.userId !== newStatus.userId
        );

        return Object.assign({}, prev, {
          getUserStatuses: [...oldStatuses, newStatus],
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

<<<<<<< HEAD
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
        {showReport && (
          <div
            onClick={(e) => {
              if (e.currentTarget.firstChild === e.target) {
                setShowReport(false);
              }
            }}
          >
            <Report
              reportedUserID={partnerId}
              handleSend={() => setShowReport(false)}
            />
          </div>
        )}

        {showGameRequest && (
          <div
            onClick={(e) => {
              if (e.currentTarget.firstChild === e.target) {
                setShowGameRequest(false);
              }
=======
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

      {showGameRequest && (
        <div
          onClick={(e) => {
            if (e.currentTarget.firstChild === e.target) {
              setShowGameRequest(false);
              setShowGameRequestStatus(false);
            }
          }}
        >
          <Confirmation
            title="Game rules"
            content="You will be asked 10 'Have you ever...' questions. Select your answers truthfully to learn more about each other"
            confirmState="Send game request to Dustin?"
            btn1Name="Cancel"
            btn2Name="Send"
            handleConfirm={handleSendGameRequest}
            handleCancel={() => {
              setShowGameRequest(false);
>>>>>>> 00c32d0 (add mutation)
            }}
          />
        </div>
      )}

      {showGameRequestStatus && (
        <div
          onClick={(e) => {
            if (e.currentTarget.firstChild === e.target) {
              setShowGameRequestStatus(false);
            }
          }}
        >
          <Confirmation
            title="Game request"
            content={gameRequestStatus}
            hideBtn="hidden"
          />
        </div>
      )}

      <Navbar />
      {roomsLoading && <Spinner />}
      {roomsError && (
        <div className="italic place-self-center my-auto">
          An error occurs, please try again later!
        </div>
      )}

      {!roomsLoading && chatRooms && (
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
            setShowReport={setShowReport}
            refetch={refetch}
            userStatus={userStatuses[partnerId]}
            handleGame={handleGame}
          />
        </section>
      )}
    </div>
  );
}

export default Chat;
