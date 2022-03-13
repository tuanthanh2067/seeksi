import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import RoundedButton from "../../components/Buttons/RoundedButton";
import Input from "../../components/Input/Input";
import Dropdown from "../../components/Input/Dropdown";
import Label from "../../components/Input/Label";
import Radio from "../../components/Input/Radio";
import { USER_REGISTER_MUTATION } from "../../graphql/mutations/Mutations";
import { useMutation } from "@apollo/client";
import jwt_decode from "jwt-decode";
import {
  monthOptions,
  generateDateOptions,
  generateYearOptions,
} from "../../utils/data";

import { WebSocketContext } from "../../context/websocketContext";

const Signup = (props) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [gender, setGender] = useState("");
  const [month, setMonth] = useState("");
  const [date, setDate] = useState("");
  const [year, setYear] = useState("");
  const [err, setErr] = useState("");
  const navigate = useNavigate();
  const [signup] = useMutation(USER_REGISTER_MUTATION);

  const clearErr = () => setErr("");
  const { apolloClient } = useContext(WebSocketContext);

  const handleClick = () => {
    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !confPassword ||
      !month ||
      !date ||
      !year ||
      !gender
    ) {
      setErr("*Please provide all information");
    } else if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      setErr("*Please provide a properly formatted email address");
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
      setMonth(parseInt(month) - 1);
      signup({
        variables: {
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: password,
          dob: new Date(`${year}, ${month}, ${date}`),
          sex: gender,
        },
        onError: (error) => {
          setErr(error);
        },
        onCompleted: (data) => {
          localStorage.setItem("token", data.signup.token);
          props.setIsLoggedIn(true);
          props.setUserToken(data.signup.token);
          props.handleShow();
          const decodedToken = jwt_decode(data.signup.token);

          apolloClient.resetStore();

          navigate(`/edit/${decodedToken.userId}`);
        },
      });
    }
  };

  return (
    <div
      className={`bg-black bg-opacity-50 absolute overflow-auto inset-0 flex justify-center items-center h-screen`}
    >
      <div className="px-8 bg-white w-5/6 lg:w-1/3 md:max-w-3xl rounded-md">
        <h3 className="text-primary font-bold pt-5 pb-3 text-2xl text-center lg:text-left">
          Sign Up
        </h3>
        {err && <span className="text-red-600 font-medium">{err}</span>}
        <div className="flex">
          <div className="w-full pr-1 lg:w-1/2 lg:pr-4">
            <Input
              type="text"
              width="w-full"
              placeholder="First Name"
              onChange={(e) => {
                setFirstName(e.target.value);
                clearErr();
              }}
            />
          </div>
          <div className="w-full lg:w-1/2 ">
            <Input
              type="text"
              width="w-full"
              placeholder="Last Name"
              onChange={(e) => {
                setLastName(e.target.value);
                clearErr();
              }}
            />
          </div>
        </div>
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
        <Input
          type="password"
          width="w-full"
          placeholder="Confirm password"
          onChange={(e) => {
            setConfPassword(e.target.value);
            clearErr();
          }}
        />
        <div className="flex flex-col ">
          <div className="pt-1 pb-0.5">
            <Label label="Birthday" required />
            <div className="my-2 grid grid-cols-3 gap-4 ">
              <Dropdown
                options={monthOptions}
                placeholder="Month"
                defaultValue={month}
                onChange={(e) => {
                  setMonth(e.value);
                  clearErr();
                }}
              />
              <Dropdown
                options={generateDateOptions(month)}
                placeholder="Day"
                defaultValue={date}
                onChange={(e) => {
                  setDate(e.value);
                  clearErr();
                }}
              />
              <Dropdown
                options={generateYearOptions()}
                placeholder="Year"
                defaultValue={year}
                onChange={(e) => {
                  setYear(e.value);
                  clearErr();
                }}
              />
            </div>
          </div>
          <div>
            <Label label="Sex" required />
            <div className="grid grid-cols-3 gap-4 ">
              <Radio
                value="Male"
                name="gender"
                width="w-full"
                onClick={() => {
                  setGender("male");
                  clearErr();
                }}
              />
              <Radio
                value="Female"
                name="gender"
                width="w-full"
                onClick={() => {
                  setGender("female");
                  clearErr();
                }}
              />
            </div>
          </div>
        </div>

        <div className="flex justify-center pt-5 pb-10">
          {" "}
          <RoundedButton
            btnName="Sign Up"
            paddingLR="pr-12 pl-12"
            paddingTB="py-2"
            hover="hover:bg-white hover:text-primary hover:border-primary"
            fontWeight="font-bold"
            fontSize="text-sm"
            handleClick={handleClick}
          />
        </div>
      </div>
    </div>
  );
};

export default Signup;
