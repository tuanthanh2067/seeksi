import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import jwt_decode from "jwt-decode";
import toast, { Toaster } from "react-hot-toast";

import LandingPage from "./pages/LandingPage/index";
import ResetPassword from "./pages/ResetPassword/ResetPassword";
import Match from "./pages/Match/Match";
import ProfilePage from "./pages/ProfilePage/index";
import EditPage from "./pages/EditPage/EditPage";
import Chat from "./pages/Chat/Chat";
import DescriptiveToast from "./components/Toast/DescriptiveToast";
import GameRequestToast from "./components/Toast/GameRequestToast";

import { GET_CHAT_ROOMS } from "./graphql/queries/Chat";
import {
  GAME_REQUEST_SUBSCRIPTION,
  MESSAGE_SUBSCRIPTION,
} from "./graphql/subscriptions/Chat";
import { UPDATE_STATUS } from "./graphql/mutations/Mutations";
import {
  ACCEPT_GAME_REQUEST,
  REJECT_GAME_REQUEST,
} from "./graphql/mutations/Game";
import { SEND_MESSAGE } from "./graphql/mutations/Chat";
import { useQuery, useMutation, useSubscription } from "@apollo/client";

function App() {
  const [userToken, setUserToken] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [requests, setRequests] = useState({});
  const [hasNewMatch, setHasNewMatch] = useState(false);
  const [updateMyStatus] = useMutation(UPDATE_STATUS);
  const [acceptGameRequest] = useMutation(ACCEPT_GAME_REQUEST);
  const [rejectGameRequest] = useMutation(REJECT_GAME_REQUEST);
  const [sendMessage] = useMutation(SEND_MESSAGE);

  const { loading, error, data, subscribeToMore, refetch } =
    useQuery(GET_CHAT_ROOMS);

  const gameRequests = useSubscription(GAME_REQUEST_SUBSCRIPTION, {
    variables: { myId: currentUser.userId },
  });

  const handleAccept = (gameRequestId, chatRoomId) => {
    acceptGameRequest({
      variables: {
        gameRequestId: gameRequestId,
        chatRoomId: chatRoomId,
      },
      onError: (error) => {
        toast.error(error.message);
      },
      onCompleted: (data) => {
        if (!data.acceptGameRequest.success)
          toast.error(data.acceptGameRequest.message);
        else {
          const gameRequest = requests;
          gameRequest[chatRoomId].expired = true;
          setRequests(gameRequest);
          sendMessage({
            variables: {
              roomId: chatRoomId,
              content: "accepted the game request",
            },
            onError: (err) => {
              toast.error(err.message);
            },
            onCompleted: (data) => {},
          });
        }
      },
    });
  };

  const handleDecline = (gameRequestId, chatRoomId) => {
    rejectGameRequest({
      variables: {
        gameRequestId: gameRequestId,
      },
      onError: (error) => {
        toast.error(error.message);
      },
      onCompleted: (data) => {
        const gameRequest = requests;
        gameRequest[chatRoomId].expired = true;
        setRequests(gameRequest);

        sendMessage({
          variables: {
            roomId: chatRoomId,
            content: "rejected the game request",
          },
          onError: (err) => {
            toast.error(err.message);
          },
          onCompleted: (data) => {},
        });
      },
    });
  };

  const showToast = (content, photos, name, sendBy) => {
    if (currentUser) {
      if (currentUser.userId === sendBy || window.location.pathname === "/chat")
        return;

      return DescriptiveToast(content, photos.length, name);
    }
    return;
  };

  const showGameToast = (content, name, sendBy, gameRequestId, chatRoomId) => {
    if (currentUser) {
      if (currentUser.userId === sendBy) return;

      return GameRequestToast(
        content,
        name,
        gameRequestId,
        chatRoomId,
        handleAccept,
        handleDecline
      );
    }
    return;
  };

  useEffect(() => {
    if (hasNewMatch) refetch();
  }, [hasNewMatch, refetch]);

  // set up userId on log in
  useEffect(() => {
    setUserToken(localStorage.getItem("token"));
    if (userToken) {
      setCurrentUser(jwt_decode(userToken));
    }
    if (currentUser) setIsLoggedIn(true);
  }, [userToken]);

  // subscribe for new game requests
  useEffect(() => {
    if (gameRequests.data) {
      if (data) {
        const room = data.chatRooms.find(
          (room) => room.partner.id === gameRequests.data.gameRequestSent.sentBy
        );

        const gameRequestId = gameRequests.data.gameRequestSent.id;
        const chatRoomId = room.id;
        const name = `${room.partner.firstName} ${room.partner.lastName}`;
        const content = `${name} sent you a game request`;

        const gameRequest = requests;
        gameRequest[chatRoomId] = {
          requestId: gameRequestId,
          expired: false,
          sentBy: gameRequests.data.gameRequestSent.sentBy,
        };
        setRequests(gameRequest);

        showGameToast(
          content,
          name,
          gameRequests.data.gameRequestSent.sentBy,
          gameRequestId,
          chatRoomId
        );
      }
    }
  }, [gameRequests.data]);

  // subscribe for new messages
  useEffect(() => {
    let unsubscribe = [];

    if (isLoggedIn) {
      if (data) {
        data.chatRooms.forEach((chatRoom) => {
          unsubscribe.push(
            subscribeToMore({
              document: MESSAGE_SUBSCRIPTION,
              variables: { roomId: chatRoom.id },
              updateQuery: (prev, { subscriptionData }) => {
                if (!subscriptionData.data) {
                  return prev;
                }

                const newChat = subscriptionData.data.messageSent;
                if (newChat.name !== "game request")
                  showToast(
                    newChat.content,
                    newChat.photos,
                    newChat.name,
                    newChat.sendBy
                  );

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

                return Object.assign({}, prev, {
                  chatRooms: newChatRooms,
                });
              },
            })
          );
        });
      }
    }
    return () => {
      if (unsubscribe.length > 0) {
        for (let i = 0; i < unsubscribe.length; i++) {
          unsubscribe[i]();
        }
      }
    };
  }, [data, subscribeToMore, isLoggedIn]);

  // update user status
  useEffect(() => {
    let interval;
    if (isLoggedIn) {
      const updateStatus = () => {
        updateMyStatus({
          onError: (err) => console.log(err.message),
          onCompleted: (data) => {},
        });
      };

      updateStatus();
      interval = setInterval(
        updateStatus,
        process.env.REACT_APP_STATUS_UPDATE_AFTER * 1000
      );
    }

    return () => {
      clearInterval(interval);
    };
  }, [updateMyStatus, isLoggedIn]);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <LandingPage
                setIsLoggedIn={setIsLoggedIn}
                setUserToken={setUserToken}
              />
            }
          />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route
            path="/match"
            element={<Match setHasNewMatch={setHasNewMatch} />}
          />
          <Route path="/user/:id" element={<ProfilePage />} />
          <Route path="/edit/:id" element={<EditPage />} />
          <Route
            path="/chat"
            element={
              <Chat
                roomsLoading={loading}
                roomsData={data || { chatRooms: [] }}
                roomsError={error}
                refetch={refetch}
                handleAccept={handleAccept}
                handleDecline={handleDecline}
                currentUserId={currentUser.userId}
                gameRequests={requests}
              />
            }
          />
        </Routes>
      </BrowserRouter>
      <Toaster position="top-right" reverseOrder={false} />
    </>
  );
}

export default App;
