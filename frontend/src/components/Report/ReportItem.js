import React, { useState } from "react";
import toast from "react-hot-toast";
import RoundedButton from "../../components/Buttons/RoundedButton";

import { useMutation } from "@apollo/client";
import { BAN_USER, UPDATE_REPORT_STATUS } from "../../graphql/mutations/Report";

const ReportItem = ({ report, index, page, handleGetReports }) => {
  const [isOpen, setIsOpen] = useState(false);

  const [banUser] = useMutation(BAN_USER);
  const [updateReportStatus] = useMutation(UPDATE_REPORT_STATUS);

  const updateStatus = (status) => {
    updateReportStatus({
      variables: {
        updateReportStatusId: report.id,
        status: status,
      },
      onError: (error) => {
        toast.error(error.message);
      },
      onCompleted: (data) => {
        if (data.updateReportStatus.success) {
          toast.success(data.updateReportStatus.message);
          setIsOpen(false);
          handleGetReports();
        } else toast.error(data.updateReportStatus.message);
      },
    });
  };

  const handleBan = () => {
    banUser({
      variables: { userId: report.reportedUserID.id },
      onError: (error) => {
        console.log(error);
        toast.error(error.message);
      },
      onCompleted: (data) => {
        toast.success(data.banUser.message);
        updateStatus("resolved");
      },
    });
  };

  return (
    <>
      <div
        className="flex border-y-[1px] p-3 border-gray-100"
        key={report.id}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="w-10">{(page - 1) * 10 + index + 1}</div>
        <div className="w-3/12">{report.title}</div>
        <div className="w-4/12">
          {report.reportedUserID.firstName} {report.reportedUserID.lastName}
        </div>
        <div className="w-2/12 break-all">
          {new Date(report.createdAt * 1).toLocaleDateString()}
        </div>
        <div className="w-2/12">
          <div
            className={`px-1 max-w-max ${
              report.status === "pending"
                ? "bg-amber-50 text-amber-600"
                : report.status === "resolved"
                ? "bg-green-50 text-green-600"
                : "bg-cyan-50 text-cyan-600"
            }`}
          >
            {report.status}
          </div>
        </div>

        <div className="">
          <span
            className={`right-0 inline-block w-[12px] h-[12px] border-b-[2px] border-l-[2px] border-gray-400 transition ease-out duration-200 ${
              isOpen ? "-rotate-[45deg]" : "rotate-[45deg]"
            }`}
          />
        </div>
      </div>

      {isOpen && (
        <div className="flex px-3 bg-gray-50">
          <div className="w-10"></div>
          <div className="w-3/12">
            <div className="py-1 border-b-[1px] border-gray-50">
              Reported by:
            </div>
            <div className="py-1 border-y-[1px] border-gray-50">
              Reported user:
            </div>
            <div className="py-1 border-y-[1px] border-gray-50">Problem:</div>
            <div className="py-1 border-t-[1px] border-gray-50">
              Description:
            </div>
          </div>
          <div className="w-6/12">
            <div className="py-1 mr-10 border-b-[1px] border-gray-50">
              <a
                href={`/user/${report.reporterID.id}`}
                target="_blank"
                rel="noreferrer"
              >
                {report.reporterID.firstName} {report.reportedUserID.lastName}
              </a>
            </div>
            <div className="py-1 mr-10 border-y-[1px] border-gray-50">
              <a
                href={`/user/${report.reportedUserID.id}`}
                target="_blank"
                rel="noreferrer"
              >
                {report.reportedUserID.firstName}{" "}
                {report.reportedUserID.lastName}
              </a>
            </div>
            <div className="py-1 mr-10 border-y-[1px] border-gray-50">
              {report.problem}
            </div>
            <div className="py-1 mr-10 border-t-[1px] border-gray-50">
              {report.description}
            </div>
          </div>
          {report.status === "pending" && (
            <div className="flex flex-col gap-1 my-auto">
              <RoundedButton
                btnName="Ban"
                fontSize="text-sm"
                paddingLR="px-auto"
                hover="hover:bg-white hover:text-primary hover:border-primary"
                btnStyle="w-16 "
                handleClick={handleBan}
              />
              <RoundedButton
                btnName="Skip"
                fontSize="text-sm"
                paddingLR="px-auto"
                hover="hover:bg-white hover:text-primary hover:border-primary"
                btnStyle="w-16"
                handleClick={() => updateStatus("skipped")}
              />
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default ReportItem;
