import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Spinner from "../../components/Spinner/Spinner";
import Input from "../../components/Input/Input";
import Label from "../../components/Input/Label";
import Dropdown from "../../components/Input/Dropdown";
import RoundedButton from "../../components/Buttons/RoundedButton";
import ReportList from "../../components/Report/ReportList";

import { useLazyQuery } from "@apollo/client";
import { GET_REPORTS } from "../../graphql/queries/Report";
import {
  reportTypes,
  reportStatuses,
  getYearsToDate,
  getMonthOfYear,
} from "../../utils/data";

const AdminDashboard = ({ handleLogOut }) => {
  const REPORTS_PER_PAGE = 10;

  const [page, setPage] = useState(1);
  const [fromYear, setFromYear] = useState(2022);
  const [fromMonth, setFromMonth] = useState("January");
  const [toYear, setToYear] = useState(new Date().getFullYear());
  const [toMonth, setToMonth] = useState(
    new Date().toLocaleString("default", { month: "long" })
  );
  const [type, setType] = useState("All");
  const [status, setStatus] = useState("Pending");
  const [searchInput, setSearchInput] = useState("");

  const [getReports, { data, error, loading }] = useLazyQuery(GET_REPORTS);

  const handleGetReports = (page = 1) => {
    getReports({
      variables: {
        page: page,
        perPage: REPORTS_PER_PAGE,
        fromDate: `${fromYear}/${fromMonth}/01`,
        toDate: `${toYear}/${toMonth}/31`,
        status: status !== "All" ? status.toLowerCase() : "",
        problem: type !== "All" ? type.toLowerCase() : "",
        name: searchInput.toLowerCase(),
      },
    });
  };

  const handleSearch = () => {
    setPage(1);
    handleGetReports();
  };

  useEffect(() => {
    handleGetReports(page);
  }, [page]);

  return (
    <>
      <Navbar handleLogOut={handleLogOut} />
      <div className="container mx-auto px-4 py-5 md:p-5 mb-10 ">
        <p className="text-purple font-bold text-3xl mb-4 sticky top-0 z-5">
          Admin Dashboard
        </p>
        <div className="mt-2">
          <div className="w-full">
            <Label label="Search" />
            <Input
              type="text"
              width="w-full mb-4"
              placeholder="Name"
              onChange={(e) => setSearchInput(e.target.value.toLowerCase())}
            />
          </div>
          <div className="flex flex-wrap gap-x-8">
            <div>
              <Label label="Filter by date" />
              <div className="flex gap-4">
                <div className="flex gap-3 my-2">
                  <span className="h-4 pt-3">From</span>
                  <Dropdown
                    options={getYearsToDate()}
                    placeholder="Year"
                    defaultValue={fromYear}
                    onChange={(e) => setFromYear(e.value)}
                  />
                  <Dropdown
                    options={getMonthOfYear(fromYear)}
                    placeholder="Month"
                    defaultValue={fromMonth}
                    onChange={(e) => setFromMonth(e.value)}
                  />
                </div>
                <div className="flex gap-3 my-2">
                  <span className="h-4 pt-3">To</span>
                  <Dropdown
                    options={getYearsToDate()}
                    placeholder="Year"
                    defaultValue={toYear}
                    onChange={(e) => setToYear(e.value)}
                  />
                  <Dropdown
                    options={getMonthOfYear(toYear)}
                    placeholder="Month"
                    defaultValue={toMonth}
                    onChange={(e) => setToMonth(e.value)}
                  />
                </div>
              </div>
            </div>
            <div className="flex gap-x-8">
              <div>
                <Label label="Filter by report type" />
                <div className="my-2">
                  <Dropdown
                    options={reportTypes}
                    defaultValue={type}
                    onChange={(e) => {
                      if (!e) setType("");
                      else setType(e.value);
                    }}
                  />
                </div>
              </div>
              <div>
                <Label label="Filter by status" />
                <div className="my-2">
                  <Dropdown
                    options={reportStatuses}
                    defaultValue={status}
                    onChange={(e) => {
                      if (!e) setStatus("");
                      else setStatus(e.value);
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="mb-2 mt-auto">
              <RoundedButton
                btnName="Search"
                fontSize="text-md"
                paddingTB="py-2"
                handleClick={handleSearch}
                borderColor="border-secondary"
                bgColor="bg-secondary"
                hover="hover:bg-white hover:text-secondary hover:border-secondary"
              />
            </div>
          </div>
        </div>

        <div className="w-full">
          {loading && (
            <div className="relative my-24">
              <Spinner />
            </div>
          )}

          {error && (
            <div className="flex my-24">
              <div className="italic place-self-center mx-auto">
                An error occurs, please try again later!
              </div>
            </div>
          )}

          {data && data.getReports.totalReports === 0 && (
            <div className="my-5 italic">No reports available.</div>
          )}

          {data && data.getReports.totalReports > 0 && (
            <ReportList
              data={data.getReports}
              handleGetReports={handleGetReports}
              page={page}
              setPage={setPage}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
