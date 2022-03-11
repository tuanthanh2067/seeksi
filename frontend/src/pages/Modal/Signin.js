import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import RoundedButton from "../../components/Buttons/RoundedButton";
import Input from "../../components/Input/Input";
import ForgotPassword from "./ForgotPassword";
import { USER_LOGIN_MUTATION } from "../../graphql/mutations/Mutations";
import { useMutation } from "@apollo/client";

const Signin = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [showSignInModal, setShowSignInModal] = useState(true);
  const [login] = useMutation(USER_LOGIN_MUTATION);
  const clearErr = () => setErr("");
  const navigate = useNavigate();

  const handleClick = () => {
    if (!email || !password) {
      setErr("*Please provide all information");
    } else if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      setErr("*Please provide a properly formatted email address");
    } else {
      login({
        variables: {
          email: email,
          password: password,
        },
        onError: (error) => {
          setErr(error.message);
        },
        onCompleted: (data) => {
          localStorage.setItem("token", data.login.token);
          props.handleShow();
          navigate("/match");
        },
      });
    }
  };

  return (
    <div
      className={`bg-black bg-opacity-50 absolute overflow-auto inset-0 flex justify-center items-center h-screen`}
    >
      {showSignInModal ? (
        <div className="px-8 bg-white w-5/6 lg:w-1/3 md:max-w-3xl rounded-md ">
          <h3 className="text-primary font-bold pt-5 pb-3 text-2xl text-center lg:text-left">
            Sign In
          </h3>
          {err && <span className="text-red-600 font-medium">{err}</span>}
          <Input
            type="email"
            width="w-full"
            placeholder="Email"
            onChange={(e) => {
              setEmail(e.target.value);
              clearErr();
            }}
          />
          <Input
            type="password"
            width="w-full"
            placeholder="Password"
            onChange={(e) => {
              setPassword(e.target.value);
              clearErr();
            }}
          />
          <button
            className={"text-gray-500 hover:underline hover:text-gray-600"}
            onClick={() => setShowSignInModal(false)}
          >
            Forgot your password?
          </button>
          <div className="flex justify-center pt-5 pb-8">
            {" "}
            <RoundedButton
              btnName="Sign In"
              paddingLR="pr-12 pl-12"
              paddingTB="py-2"
              fontSize="text-sm"
              hover="hover:bg-white hover:text-primary hover:border-primary"
              fontWeight="font-bold"
              handleClick={handleClick}
            />
          </div>
        </div>
      ) : (
        <ForgotPassword />
      )}
    </div>
  );
};

export default Signin;
