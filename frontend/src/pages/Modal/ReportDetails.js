import React from "react";
import toast from "react-hot-toast";
import RoundedButton from "../../components/Buttons/RoundedButton";
import Label from "../../components/Input/Label";
import Spinner from "../../components/Spinner/Spinner";
import { capitalizeFirstLetter } from "../../utils/helper";
import { useQuery, useMutation } from "@apollo/client";
import { GET_REPORT_BY_ID } from "../../graphql/queries/Report";
import { UPDATE_REPORT_STATUS } from "../../graphql/mutations/Report";

const ReportDetails = (props) => {
  const [updateReportStatus] = useMutation(UPDATE_REPORT_STATUS);
  const { data, loading, error } = useQuery(GET_REPORT_BY_ID, {
    variables: { reportId: props.reportId },
  });

  const updateStatus = () => {
    updateReportStatus({
      variables: {
        updateReportStatusId: props.reportId,
        status: "skipped",
      },
      onError: (error) => {
        toast.error(error.message);
      },
      onCompleted: (data) => {
        if (data.updateReportStatus.success) {
          toast.success(data.updateReportStatus.message);
          props.getReports();
        } else toast.error(data.updateReportStatus.message);
      },
    });
    props.closeModal();
  };

  if (error) console.log(error);
  return (
    <div
      className={`bg-black bg-opacity-50 inset-0 fixed z-50 flex justify-center items-center h-screen`}
    >
      <div className="px-8 py-4 bg-white w-5/6 lg:w-1/3 md:max-w-3xl rounded-md ">
        <h3 className="text-primary font-bold py-4 text-2xl text-center">
          Report Details
        </h3>

        {loading && <Spinner />}
        {error && (
          <div className="flex h-full">
            <div className="italic place-self-center mx-auto">
              An error occurs, please try again later!
            </div>
          </div>
        )}
        {data && (
          <>
            <div className="flex gap-2">
              <div className="w-1/2">
                <Label label="Reported by: " />
                <div
                  className={`border-none rounded-md shadow-inner px-3 py-3.5 my-1.5 h-12 `}
                >
                  <a
                    href={`/user/${data.getReportById.reporterID.id}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {data.getReportById.reporterID.firstName}{" "}
                    {data.getReportById.reporterID.lastName}
                  </a>
                </div>
              </div>
              <div className="w-1/2">
                <Label label="Reporting: " />
                <div
                  className={`border-none rounded-md shadow-inner px-3 py-3.5 my-1.5 h-12 `}
                >
                  <a
                    href={`/user/${data.getReportById.reportedUserID.id}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {data.getReportById.reportedUserID.firstName}{" "}
                    {data.getReportById.reportedUserID.lastName}
                  </a>
                </div>
              </div>
            </div>

            <Label label="Title: " />
            <div
              className={`border-none rounded-md shadow-inner px-3 py-3.5 my-1.5 h-12 `}
            >
              {data.getReportById.title}
            </div>
            <Label label="Problem: " />
            <div
              className={`border-none rounded-md shadow-inner px-3 py-3.5 my-1.5 h-12 `}
            >
              {data.getReportById.problem}
            </div>
            <Label label="Description: " />
            <div
              className={`border-none rounded-md shadow-inner px-3 py-3.5 my-1.5 `}
            >
              {data.getReportById.description}
            </div>

            <div className="mt-5 pb-8 text-center">
              {data.getReportById.status !== "pending" ? (
                <div className="flex gap-4 mt-8 justify-center">
                  <div className="px-6 py-1 font-semibold text-md text-white bg-secondary border-secondary rounded">
                    {capitalizeFirstLetter(data.getReportById.status)}!
                  </div>
                </div>
              ) : (
                <div className="flex gap-4 mt-8 justify-center">
                  <RoundedButton
                    btnName="Skip"
                    fontSize="text-sm"
                    paddingLR="px-auto"
                    btnStyle="w-24"
                    hover="hover:bg-white hover:text-primary hover:border-primary"
                    handleClick={updateStatus}
                  />
                  {/* <RoundedButton
                    btnName="Resolve"
                    fontSize="text-sm"
                    paddingLR="px-auto"
                    btnStyle="w-24"
                    hover="hover:bg-white hover:text-primary hover:border-primary"
                    handleClick={() => updateStatus("resolved")}
                  /> */}
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ReportDetails;
