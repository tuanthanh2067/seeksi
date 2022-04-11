import React, { useState } from "react";
import RoundedButton from "../../components/Buttons/RoundedButton";
import Input from "../../components/Input/Input";
import { FORGOT_PASSWORD_MUTATION } from "../../graphql/mutations/Mutations";
import { useMutation } from "@apollo/client";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [err, setErr] = useState("");
  const [style, setStyle] = useState("");
  const [message, setMessage] = useState(
    "Enter your email and we’ll send you a link to reset password"
  );

  const [requestResetPassword] = useMutation(FORGOT_PASSWORD_MUTATION);
  const clearErr = () => setErr("");

  const handleClick = () => {
    if (!email) {
      setErr("*Please provide your email");
    } else if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      setErr("*Please provide a properly formatted email address");
    } else {
      requestResetPassword({
        variables: {
          email: email,
        },
        onError: (error) => {
          setStyle("text-red-600 font-bold");
          setMessage("No account is associated with this email.");
        },
        onCompleted: (data) => {
          setStyle("text-dark-green font-bold");
          setMessage(data.requestResetPassword.message);
        },
      });
    }
  };

  return (
    <div className="px-8 bg-white w-5/6 lg:w-1/3 md:max-w-3xl rounded-md">
      <h3 className="text-primary font-bold pt-5 pb-4 text-2xl text-center lg:text-left">
        Reset Password
      </h3>
      <div className={`pb-2 ${style}`}>{message}</div>
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
      <div className="flex justify-center pt-5 pb-8">
        {" "}
        <RoundedButton
          btnName="Send link"
          paddingLR="pr-12 pl-12"
          paddingTB="py-2"
          fontSize="text-sm"
          hover="hover:bg-white hover:text-primary hover:border-primary"
          fontWeight="font-bold"
          handleClick={handleClick}
        />
      </div>
    </div>
  );
};

export default ForgotPassword;
