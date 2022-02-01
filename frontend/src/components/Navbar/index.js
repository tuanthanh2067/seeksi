import { useState } from "react";

import { Link } from "react-router-dom";

import Logo from "../../assets/logo.png";

const Navbar = () => {
  const [isNavbarOpen, setNavbarOpen] = useState(false);

  const handleNavbarOpen = () => {
    setNavbarOpen(!isNavbarOpen);
  };

  return (
    <header className="bg-gradient-to-b from-primary to-white">
      <div className="container mx-auto px-4 py-5 md:p-5 sm:flex sm:justify-between sm:items-center">
        <div className="flex items-center justify-between">
          <div className="w-28">
            <img src={Logo} alt="logo" />
          </div>
          <div className="sm:hidden">
            <button
              type="button"
              class="block rounded p-2 bg-primary text-white hover:bg-white hover:text-primary focus:bg-white focus:text-primary focus:outline-none"
              onClick={handleNavbarOpen}
            >
              <svg class="h-6 w-6 fill-current" viewBox="0 0 24 24">
                {isNavbarOpen ? (
                  <path
                    fill-rule="evenodd"
                    d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z"
                  />
                ) : (
                  <path
                    fill-rule="evenodd"
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
            to="/"
            className=" block text-primary font-semibold text-lg lg:text-xl hover:underline"
          >
            Profile
          </Link>
          <Link
            to="/"
            className=" block mt-3 sm:mt-0 sm:ml-10 text-primary font-semibold text-lg lg:text-xl hover:underline"
          >
            Match
          </Link>
          <Link
            to="/"
            className=" block mt-3 sm:mt-0 sm:ml-10 text-primary font-semibold text-lg lg:text-xl hover:underline"
          >
            Chat
          </Link>
          <Link
            to="/"
            className="block px-10 py-1 mt-3 sm:mt-0 sm:ml-10 font-bold text-center text-lg lg:text-xl border-2 rounded w-full md:w-fit border-primary bg-primary text-white hover:bg-white hover:text-primary hover:border-white"
          >
            Log Out
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
