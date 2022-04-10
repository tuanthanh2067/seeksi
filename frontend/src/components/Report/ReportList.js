import React from "react";
import RoundedButton from "../../components/Buttons/RoundedButton";
import ReportItem from "./ReportItem";

const ReportList = ({
  data: { reports, totalPages },
  handleGetReports,
  page,
  setPage,
}) => {
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
      <div className="w-full my-5">
        <div className="flex h-10 px-3 items-center bg-gray-100 font-bold ">
          <div className="w-10 px-2">#</div>
          <div className="w-3/12 px-2">Title</div>
          <div className="w-4/12 px-2">Reporting</div>
          <div className="w-2/12 px-2">Created on</div>
          <div className="w-2/12 px-2">Status</div>
        </div>

        <div className="wrapper">
          {reports.map((report, index) => (
            <ReportItem
              key={report.id}
              report={report}
              index={index}
              page={page}
              handleGetReports={handleGetReports}
            />
          ))}
        </div>
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
