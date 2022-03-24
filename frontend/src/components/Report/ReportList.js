import React, { useEffect } from "react";
import toast from "react-hot-toast";
import RoundedButton from "../../components/Buttons/RoundedButton";

import { useMutation } from "@apollo/client";
import { BAN_USER, UPDATE_REPORT_STATUS } from "../../graphql/mutations/Report";

const ReportList = ({
  data: { reports, totalPages },
  handleGetReports,
  setReportId,
  setShowReportDetails,
  page,
  setPage,
}) => {
  const [banUser] = useMutation(BAN_USER);
  const [updateReportStatus] = useMutation(UPDATE_REPORT_STATUS);

  const handleBan = (reportedUserID, reportID) => {
    banUser({
      variables: { userId: reportedUserID },
      onError: (error) => {
        console.log(error);
        toast.error(error.message);
      },
      onCompleted: (data) => {
        toast.success(data.banUser.message);

        updateReportStatus({
          variables: {
            updateReportStatusId: reportID,
            status: "resolved",
          },
          onError: (error) => {
            console.log(error);
            toast.error(error.message);
          },
          onCompleted: (data) => {
            toast.success(data.updateReportStatus.message);
            handleGetReports();
          },
        });
      },
    });
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  return (
    <>
      <div className="w-full">
        {reports.map((report, index) => (
          <div className="flex gap-4 my-3" key={report.id}>
            <div className="flex w-4/5 border-[1px] border-black rounded-lg">
              <div className="w-1/12 border-r-[1px] border-black px-2 py-1">
                {(page - 1) * 10 + index + 1}
              </div>

              <div className=" w-3/12 lg:w-4/12 border-r-[1px] border-black px-2 py-1">
                {report.title}
              </div>
              <div className="w-2/12 border-r-[1px] border-black px-2 py-1">
                <a
                  className="cursor-pointer hover:italic"
                  href={`./user/${report.reportedUserID.id}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  {report.reportedUserID.firstName}{" "}
                  {report.reportedUserID.lastName}
                </a>
              </div>
              <div className="w/3-12 lg:w-2/12 border-r-[1px] border-black px-2 py-1 break-all">
                {report.problem}
              </div>
              <div className="w-2/12 border-r-[1px] border-black px-2 py-1 break-all">
                {report.status}
              </div>
              <div className="w-2/12 px-2 py-1 break-all">
                {new Date(report.createdAt * 1).toLocaleDateString()}
              </div>
            </div>
            <div className="flex gap-1 lg:gap-4">
              <RoundedButton
                btnName="Details"
                fontSize="text-sm"
                paddingLR="px-1 lg:px-6"
                hover="hover:bg-white hover:text-primary hover:border-primary"
                handleClick={() => {
                  setReportId(report.id);
                  setShowReportDetails(true);
                }}
              />
              {report.status === "pending" ? (
                <RoundedButton
                  btnName="Ban"
                  fontSize="text-sm"
                  paddingLR="px-auto"
                  handleClick={() => {
                    handleBan(report.reportedUserID.id, report.id);
                  }}
                  borderColor="border-secondary"
                  bgColor="bg-secondary"
                  hover="hover:bg-white hover:text-secondary hover:border-secondary"
                  btnStyle="w-20"
                />
              ) : (
                <RoundedButton
                  btnName={report.status === "resolved" ? "Banned" : "Ban"}
                  fontSize="text-sm"
                  paddingLR="px-auto"
                  borderColor="border-gray-100"
                  bgColor="bg-gray-100"
                  textColor="text-gray-500"
                  hover="hover:bg-gray-100 hover:border-gray-100 hover:text-gray-500"
                  btnStyle="w-20 cursor-default"
                />
              )}
            </div>
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex gap-4 mt-8 mx-auto">
          {page !== 1 && (
            <RoundedButton
              btnName="Previous"
              fontSize="text-md"
              handleClick={handlePrevPage}
              hover="hover:bg-white hover:text-primary hover:border-primary"
            />
          )}
          {page !== totalPages && (
            <RoundedButton
              btnName="Next"
              fontSize="text-md"
              handleClick={handleNextPage}
              hover="hover:bg-white hover:text-primary hover:border-primary"
            />
          )}
        </div>
      )}
    </>
  );
};

export default ReportList;
