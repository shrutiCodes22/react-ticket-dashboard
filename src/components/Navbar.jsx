import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  //state variable to track whether the mobile menu is open or not
  const [isOpen, setIsOpen] = useState(false);

  const handleSignOut = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const links = user?.isLoggedIn
    ? [
        { path: "/", label: "Dashboard" },
        { path: "/create", label: "Create Ticket" },
        { action: handleSignOut, label: "Logout" },
      ]
    : [
        { path: "/login", label: "Login" },
        { path: "/signup", label: "Signup" },
      ];

  return (
    <nav className="fixed top-0 left-0 w-full bg-blue-500 p-4 z-50 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-white text-3xl font-bold">Ticket System</h1>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-4">
          {links.map((link, idx) =>
            link.path ? (
              <Link
                key={idx}
                to={link.path}
                className="px-3 py-1 text-white rounded bg-blue-600 hover:bg-blue-700"
              >
                {link.label}
              </Link>
            ) : (
              <button
                key={idx}
                onClick={link.action}
                className="px-3 py-1 text-white rounded bg-blue-600 hover:bg-blue-900 cursor-pointer"
              >
                {link.label}
              </button>
            )
          )}
        </div>

        {/* Hamburger */}
        <button
          className="md:hidden flex flex-col justify-between h-5 w-6"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="block w-full h-0.5 bg-white"></span>
          <span className="block w-full h-0.5 bg-white"></span>
          <span className="block w-full h-0.5 bg-white"></span>
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-full right-0 w-35 bg-blue-50 shadow-md rounded-b-lg  flex flex-col space-y-3 p-4">
          {links.map((link, idx) =>
            link.path ? (
              <Link
                key={idx}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className="text-white rounded hover:bg-blue-600 "
              >
                {link.label}
              </Link>
            ) : (
              <button
                key={idx}
                onClick={() => {
                  link.action();
                  setIsOpen(false);
                }}
                className="rounded text-white hover:bg-blue-600"
              >
                {link.label}
              </button>
            )
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;