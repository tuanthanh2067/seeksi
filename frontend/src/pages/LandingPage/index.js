import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import jwt_decode from "jwt-decode";

import RoundedButton from "../../components/Buttons/RoundedButton";
import Logo from "../../assets/logo.png";
import Background from "../../assets/banner.png";
import Signup from "../Modal/Signup";
import Signin from "../Modal/Signin";

const LandingPage = ({ setIsLoggedIn, setUserToken }) => {
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const [showSignInModal, setShowSignInModal] = useState(false);

  const handleSignUpModal = () => setShowSignUpModal(false);
  const handleSignInModal = () => setShowSignInModal(false);

  const token = localStorage.getItem("token");

  if (token) {
    const decodedToken = jwt_decode(token);
    if (decodedToken.role.includes("admin")) {
      return <Navigate to="/dashboard" replace />;
    }
    return <Navigate to="/match" replace />;
  }

  return (
    <>
      <div
        className="bg-cover bg-center bg-black/50 bg-blend-overlay h-screen"
        style={{ backgroundImage: `url(${Background})` }}
      >
        <div className="container mx-auto py-5 md:p-5">
          <div className="flex items-center justify-between px-4">
            <div className="w-28">
              <img src={Logo} alt="logo" />
            </div>
            <RoundedButton
              btnName={"LOG IN"}
              fontSize={"text-md"}
              bgColor={"bg-white"}
              borderColor={"border-white"}
              textColor={"text-primary"}
              hover={"hover:bg-primary hover:text-white hover:border-primary"}
              handleClick={() => {
                setShowSignInModal(true);
              }}
            />
          </div>
          <div className="px-4 mt-48">
            <p className="text-white text-5xl font-bold mb-7">
              Match, Chat, Date.
            </p>
            <RoundedButton
              btnName={"CREATE ACCOUNT"}
              fontSize={"text-lg lg:text-xl"}
              paddingLR={"px-10"}
              handleClick={() => {
                setShowSignUpModal(true);
              }}
            />
          </div>
        </div>
        {showSignInModal ? (
          <div
            onClick={(e) => {
              if (e.currentTarget.firstChild === e.target) {
                handleSignInModal();
              }
            }}
          >
            <Signin
              handleShow={handleSignInModal}
              setIsLoggedIn={setIsLoggedIn}
              setUserToken={setUserToken}
            />
          </div>
        ) : null}
        {showSignUpModal ? (
          <div
            onClick={(e) => {
              if (e.currentTarget.firstChild === e.target) {
                handleSignUpModal();
              }
            }}
          >
            <Signup
              handleShow={handleSignUpModal}
              setIsLoggedIn={setIsLoggedIn}
              setUserToken={setUserToken}
            />
          </div>
        ) : null}
      </div>
      <div className="bg-light-gray">
        <div className="container mx-auto pt-4 pb-16">
          <div className="px-4">
            <p className="text-primary text-3xl font-bold uppercase mb-5">
              Features
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
              <div className="bg-white rounded-md px-3 py-4">
                <p className="text-primary font-bold pb-2 mb-3 border-b-2 border-b-primary">
                  Heading 1
                </p>
                <p className="font-semibold">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  sodales ligula a dui tincidunt ultricies. Curabitur cursus
                  tortor sit amet enim molestie ornare. Sed eu blandit nibh. Ut
                  maximus mattis magna.
                </p>
              </div>
              <div className="bg-white rounded-md px-3 py-4">
                <p className="text-primary font-bold pb-2 mb-3 border-b-2 border-b-primary">
                  Heading 1
                </p>
                <p className="font-semibold">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  sodales ligula a dui tincidunt ultricies. Curabitur cursus
                  tortor sit amet enim molestie ornare. Sed eu blandit nibh. Ut
                  maximus mattis magna.
                </p>
              </div>
              <div className="bg-white rounded-md px-3 py-4">
                <p className="text-primary font-bold pb-2 mb-3 border-b-2 border-b-primary">
                  Heading 1
                </p>
                <p className="font-semibold">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  sodales ligula a dui tincidunt ultricies. Curabitur cursus
                  tortor sit amet enim molestie ornare. Sed eu blandit nibh. Ut
                  maximus mattis magna.
                </p>
              </div>
              <div className="bg-white rounded-md px-3 py-4">
                <p className="text-primary font-bold pb-2 mb-3 border-b-2 border-b-primary">
                  Heading 1
                </p>
                <p className="font-semibold">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  sodales ligula a dui tincidunt ultricies. Curabitur cursus
                  tortor sit amet enim molestie ornare. Sed eu blandit nibh. Ut
                  maximus mattis magna.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LandingPage;
