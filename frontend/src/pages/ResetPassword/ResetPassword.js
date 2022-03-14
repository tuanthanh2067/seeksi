import React, { useState } from "react";
import RoundedButton from "../../components/Buttons/RoundedButton";
import LogoDark from "../../assets/logo_dark.png";
import Input from "../../components/Input/Input";
import { useLocation } from "react-router-dom";
import { RESET_PASSWORD_MUTATION } from "../../graphql/mutations/Mutations";
import { useMutation } from "@apollo/client";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [err, setErr] = useState("");
  const [style, setStyle] = useState("text-red-600 font-medium");
  const search = useLocation().search;
  const token = new URLSearchParams(search).get("token");
  const userId = new URLSearchParams(search).get("id");
  const [resetPassword] = useMutation(RESET_PASSWORD_MUTATION);

  const clearErr = () => setErr("");

  const handleClick = () => {
    if (!password || !confPassword) {
      setErr("*Please provide all information");
    } else if (password !== confPassword) {
      setErr("*Password does not match");
    } else if (password.length < 12) {
      setErr("*Password should be at least 12 characters");
    } else if (
      !password.match(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{12,})/
      )
    ) {
      setErr(
        "*Password must contain at least 1 number, 1 uppercase letter and 1 special character"
      );
    } else {
      resetPassword({
        variables: {
          userId: userId,
          token: token,
          password: password,
        },
        onError: (error) => {
          setStyle("text-red-600 font-medium");
          setErr(error.graphQLErrors[0].message);
        },
        onCompleted: (data) => {
          setStyle("text-green font-medium");
          setErr(data.resetPassword.message);
        },
      });
    }
  };

  return (
    <div className="bg-[#F0F0F0] h-screen flex flex-col justify-between">
      <header className="bg-gradient-to-b from-[#F06C9B66] h-1/8 py-8"></header>
      <div className="flex flex-col justify-center items-center">
        <div className="w-30 pb-5">
          <img src={LogoDark} alt="logo" />
        </div>
        <div className="px-8 bg-white w-5/6 lg:w-1/3 md:max-w-3xl rounded-md">
          <h3 className="text-primary font-bold pt-5 pb-6 text-2xl text-center lg:text-left">
            Reset Password
          </h3>
          {err && <span className={`${style}`}>{err}</span>}
          <Input
            type="password"
            width="w-full"
            placeholder="New password"
            onChange={(e) => {
              setPassword(e.target.value);
              clearErr();
            }}
          />
          <Input
            type="password"
            width="w-full"
            placeholder="Confirm new password"
            onChange={(e) => {
              setConfPassword(e.target.value);
              clearErr();
            }}
          />
          <div className="flex justify-center pt-6 pb-8">
            {" "}
            <RoundedButton
              btnName="Reset Password"
              paddingLR="pr-12 pl-12"
              paddingTB="py-2"
              fontSize="text-sm"
              hover="hover:bg-white hover:text-primary hover:border-primary"
              fontWeight="font-bold"
              handleClick={handleClick}
            />
          </div>
        </div>
      </div>
      <footer className="bg-gradient-to-t from-[#F06C9B66] h-1/8 py-8"></footer>
    </div>
  );
};

export default ResetPassword;
