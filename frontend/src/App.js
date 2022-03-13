import { useEffect, useState, useContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { useQuery } from "@apollo/client";
import { Toaster } from "react-hot-toast";

import LandingPage from "./pages/LandingPage/index";
import ResetPassword from "./pages/ResetPassword/ResetPassword";
import Match from "./pages/Match/Match";
import ProfilePage from "./pages/ProfilePage/index";
import EditPage from "./pages/EditPage/EditPage";
import Chat from "./pages/Chat/Chat";
import { GET_CHAT_ROOMS } from "./graphql/queries/Chat";
import { GET_MESSAGE } from "./graphql/subscriptions/Chat";

import DescriptiveToast from "./components/Toast/DescriptiveToast";

function App() {
  const [userToken, setUserToken] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    setUserToken(localStorage.getItem("token"));
    if (userToken) {
      setCurrentUser(jwt_decode(localStorage.getItem("token")));
    }
    if (currentUser) {
      setIsLoggedIn(true);
    }
  }, []);

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

  useEffect(() => {
    if (userToken) {
      setCurrentUser(jwt_decode(localStorage.getItem("token")));
    }
  }, [userToken]);

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
                data={data}
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
