import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { Toaster } from "react-hot-toast";

import LandingPage from "./pages/LandingPage/index";
import ResetPassword from "./pages/ResetPassword/ResetPassword";
import Match from "./pages/Match/Match";
import ProfilePage from "./pages/ProfilePage/index";
import EditPage from "./pages/EditPage/EditPage";
import Chat from "./pages/Chat/Chat";
import DescriptiveToast from "./components/Toast/DescriptiveToast";

import { GET_CHAT_ROOMS } from "./graphql/queries/Chat";
import { GET_MESSAGE } from "./graphql/subscriptions/Chat";
import { UPDATE_STATUS } from "../src/graphql/mutations/Mutations";
import { useQuery, useMutation } from "@apollo/client";

function App() {
  const [userToken, setUserToken] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [updateMyStatus] = useMutation(UPDATE_STATUS);
  const { loading, error, data, subscribeToMore, refetch } =
    useQuery(GET_CHAT_ROOMS);

  const showToast = (content, photos, name, sendBy) => {
    if (currentUser) {
      if (currentUser.userId === sendBy || window.location.pathname === "/chat")
        return;

      const type = "message";

      return DescriptiveToast(content, photos.length, name, type);
    }
    return;
  };

  // set up userId on log in
  useEffect(() => {
    setUserToken(localStorage.getItem("token"));
    if (userToken) {
      setCurrentUser(jwt_decode(userToken));
    }
    if (currentUser) setIsLoggedIn(true);
  }, [userToken]);

  // subscribe for new messages
  useEffect(() => {
    let unsubscribe = [];

    if (isLoggedIn) {
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
          onError: (err) => console.log(err),
          onCompleted: (data) => {
            console.log(new Date(data.updateMyStatus.lastSeen * 1));
          },
        });
      };

      updateStatus();
      interval = setInterval(
        updateStatus,
        process.env.REACT_APP_STATUS_EXPIRE_AFTER * 1000
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
          <Route path="/match" element={<Match />} />
          <Route path="/user/:id" element={<ProfilePage />} />
          <Route path="/edit/:id" element={<EditPage />} />
          <Route
            path="/chat"
            element={
              <Chat
                loading={loading}
                roomsData={data}
                error={error}
                refetch={refetch}
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
