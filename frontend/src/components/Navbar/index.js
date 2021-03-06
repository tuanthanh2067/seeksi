import { useState } from "react";
import jwt_decode from "jwt-decode";
import { Link, useNavigate } from "react-router-dom";

import RoundedButton from "../Buttons/RoundedButton";
import LogoDark from "../../assets/logo_dark.png";

const Navbar = ({ handleLogOut }) => {
  const [isNavbarOpen, setNavbarOpen] = useState(false);

  const navigate = useNavigate();

  const handleNavbarOpen = () => {
    setNavbarOpen(!isNavbarOpen);
  };
  const handleLogOutClick = () => {
    handleLogOut();
    navigate("/");
  };

  const token = localStorage.getItem("token");
  const decodedToken = jwt_decode(token);
  const currentUserID = decodedToken.userId;

  return (
    <div className="sticky top-0 z-10 bg-white h-[15vh]">
      <header className="bg-gradient-to-b from-[#f06c9b66] h-full">
        <div className="container mx-auto px-4 py-5 md:p-5 sm:flex sm:justify-between sm:items-center h-full">
          <div className="flex items-center justify-between">
            <div className="w-28">
              <img src={LogoDark} alt="logo" />
            </div>
            <div className="sm:hidden">
              <button
                type="button"
                className="block rounded p-2 bg-none text-primary hover:bg-white"
                onClick={handleNavbarOpen}
              >
                <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
                  {isNavbarOpen ? (
                    <path
                      fillRule="evenodd"
                      d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z"
                    />
                  ) : (
                    <path
                      fillRule="evenodd"
                      d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
                    />
                  )}
                </svg>
              </button>
            </div>
          </div>
          <nav
            className={`${
              isNavbarOpen ? "block" : "hidden"
            } sm:flex items-center`}
          >
            <Link
              to={`/user/${currentUserID}`}
              className=" block text-primary font-semibold text-lg lg:text-xl hover:underline"
            >
              Profile
            </Link>
            <Link
              to="/match"
              className=" block mt-3 sm:mt-0 sm:ml-10 text-primary font-semibold text-lg lg:text-xl hover:underline"
            >
              Match
            </Link>
            <Link
              to="/chat"
              className=" block mt-3 sm:mt-0 sm:ml-10 text-primary font-semibold text-lg lg:text-xl hover:underline"
            >
              Chat
            </Link>
            {token && decodedToken.role.includes("admin") && (
              <Link
                to={`/dashboard`}
                className=" block mt-3 sm:mt-0 sm:ml-10 text-primary font-semibold text-lg lg:text-xl hover:underline"
              >
                Dashboard
              </Link>
            )}

            <RoundedButton
              btnName={"Log out"}
              fontSize={"text-lg lg:text-xl"}
              paddingLR={"px-10 sm:ml-10 w-full md:w-fit"}
              paddingTB={"mt-3 sm:mt-0"}
              hover={
                "hover:text-primary focus:text-primary hover:bg-white focus:bg-white hover:border-primary focus:border-primary"
              }
              handleClick={handleLogOutClick}
            />
          </nav>
        </div>
      </header>
    </div>
  );
};

export default Navbar;
