import React, { useState } from "react";
import RoundedButton from "../../components/Buttons/RoundedButton";
import Input from "../../components/Input/Input";
import Dropdown from "../../components/Input/Dropdown";
import Label from "../../components/Input/Label";
import Radio from "../../components/Input/Radio";
import { USER_REGISTER_MUTATION } from "../../graphql/mutations/Mutations";
import { useMutation } from "@apollo/client";

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
  const [signup, { error }] = useMutation(USER_REGISTER_MUTATION);

  const monthOptions = [
    { value: "January", label: "Jan" },
    { value: "February", label: "Feb" },
    { value: "March", label: "Mar" },
    { value: "April", label: "Apr" },
    { value: "May", label: "May" },
    { value: "June", label: "Jun" },
    { value: "July", label: "Jul" },
    { value: "August", label: "Aug" },
    { value: "September", label: "Sept" },
    { value: "October", label: "Oct" },
    { value: "November", label: "Nov" },
    { value: "December", label: "Dec" },
  ];

  const generateDateOptions = () => {
    let date = [];
    for (let i = 1; i <= 31; i++) {
      date.push({
        value: i,
        label: i < 10 ? `0${i}` : i,
      });
    }
    return date;
  };

  const generateYearOptions = () => {
    let year = [];
    for (let i = new Date().getFullYear() - 19; i >= 1900; i--) {
      year.push({
        value: i,
        label: i,
      });
    }
    return year;
  };

  const clearErr = () => setErr("");

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
      setErr("*Password is not strong enough");
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
      });

      if (error) {
        setErr(error);
      } else {
        props.handleShow();
      }
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
          <div className="w-full lg:w-1/2 pr-1 lg:pr-4 xs:pr-2">
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
        <div className="flex py-1">
          <Input
            type="email"
            width="w-full"
            placeholder="Email"
            onChange={(e) => {
              setEmail(e.target.value);
              clearErr();
            }}
          />
        </div>
        <div className="flex py-1">
          <Input
            type="password"
            width="w-full"
            placeholder="Password"
            onChange={(e) => {
              setPassword(e.target.value);
              clearErr();
            }}
          />
        </div>
        <div className="flex py-1">
          <Input
            type="password"
            width="w-full"
            placeholder="Confirm password"
            onChange={(e) => {
              setConfPassword(e.target.value);
              clearErr();
            }}
          />
        </div>
        <div className="flex flex-col ">
          <div className="pt-1 pb-0.5">
            <Label label="Birthday" required />
            <div className="my-2 grid grid-cols-3 gap-4 ">
              <Dropdown
                options={monthOptions}
                placeholder="Month"
                onChange={(e) => {
                  setMonth(e.value);
                  clearErr();
                }}
              />
              <Dropdown
                options={generateDateOptions()}
                placeholder="Day"
                onChange={(e) => {
                  setDate(e.value);
                  clearErr();
                }}
              />
              <Dropdown
                options={generateYearOptions()}
                placeholder="Year"
                onChange={(e) => {
                  setYear(e.value);
                  clearErr();
                }}
              />
            </div>
          </div>
          <div>
            <Label label="Sex" required />
            <div className="grid grid-cols-3 gap-4 xs:flex">
              <Radio
                value="Male"
                name="gender"
                width="w-full"
                onClick={() => {
                  setGender("Male");
                  clearErr();
                }}
              />
              <Radio
                value="Female"
                name="gender"
                width="w-full"
                onClick={() => {
                  setGender("Female");
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
            borderColor="border-primary"
            bgColor="bg-primary"
            paddingLR="pr-12 pl-12"
            paddingTB="py-2"
            textColor="text-white"
            fontSize="text-sm"
            hover="hover:bg-white hover:text-primary hover:border-primary"
            fontWeight="font-bold"
            handleClick={handleClick}
          />
        </div>
      </div>
    </div>
  );
};

export default Signup;
