import React, { useState } from "react";
import toast from "react-hot-toast";
import OvalButton from "../../components/Buttons/OvalButton";
import Input from "../../components/Input/Input";
import Label from "../../components/Input/Label";
import Textarea from "../../components/Input/Textarea";
import { SUBMIT_REPORT_MUTATION } from "../../graphql/mutations/Report";
import { useMutation } from "@apollo/client";

const Report = (props) => {
  const [title, setTitle] = useState("");
  const [problem, setProblem] = useState("");
  const [desc, setDesc] = useState("");
  const [submitReport] = useMutation(SUBMIT_REPORT_MUTATION);
  const [style, setStyle] = useState("");
  const [message, setMessage] = useState("");

  const handleClick = () => {
    if (!title || !problem || !desc) {
      setStyle("text-red-600 font-bold");
      setMessage("*Please provide all information");
    } else {
      submitReport({
        variables: {
          title: title,
          problem: problem,
          description: desc,
          reportedUserID: props.reportedUserID,
        },
        onError: (error) => {
          setStyle("text-red-600 font-bold");
          setMessage(error.graphQLErrors[0].message);
        },
        onCompleted: (data) => {
          toast.success(data.submitReport.message);
          props.handleSend();
        },
      });
    }
  };

  return (
    <div
      className={`bg-black bg-opacity-50 inset-0 fixed z-50 flex justify-center items-center h-screen`}
    >
      <div className="px-8 bg-white w-5/6 lg:w-1/3 md:max-w-3xl rounded-md ">
        <h3 className="text-primary font-bold pt-8 pb-4 text-2xl text-center">
          Report
        </h3>
        <div className={`pb-2 text-center ${style} font-medium`}>{message}</div>
        <Label label="Title: " addStyle={"!text-primary text-lg"} />
        <Input
          type="text"
          width="w-full"
          onChange={(e) => {
            setTitle(e.target.value);
            setMessage("");
          }}
        />
        <Label
          label="Please select a problem: "
          addStyle={"!text-primary text-lg"}
        />
        <div className="mt-3 mb-2">
          <label
            onClick={() => {
              setProblem("fake account");
              setMessage("");
            }}
          >
            <input className="scale-150" type="radio" name="problem" />
            <span className="text-base pl-3">Fake account</span>
          </label>
        </div>
        <div className="mb-2">
          <label
            onClick={() => {
              setProblem("sharing inappropriate content");
              setMessage("");
            }}
          >
            <input className="scale-150" type="radio" name="problem" />
            <span className="text-base pl-3">
              Sharing inappropriate content
            </span>
          </label>
        </div>
        <div className="mb-2">
          <label
            onClick={() => {
              setProblem("harassment");
              setMessage("");
            }}
          >
            <input className="scale-150" type="radio" name="problem" />
            <span className="text-base pl-3">Harassment</span>
          </label>
        </div>

        <div className="mb-2">
          <label
            onClick={() => {
              setProblem("something else");
              setMessage("");
            }}
          >
            <input className="scale-150" type="radio" name="problem" />
            <span className="text-base pl-3">Something else</span>
          </label>
        </div>

        <Label label="Description: " addStyle={"!text-primary text-lg"} />
        <div className="pt-2.5">
          <Textarea
            width="w-full"
            height="h-36"
            onChange={(e) => {
              setDesc(e.target.value);
              setMessage("");
            }}
          />
        </div>

        <div className="flex justify-center pt-5 pb-8">
          <OvalButton
            btnName="Send"
            paddingLR="pr-8 pl-8"
            paddingTB="py-2"
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

export default Report;
