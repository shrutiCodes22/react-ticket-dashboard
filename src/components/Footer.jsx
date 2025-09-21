import React from "react"; // Import the React library to use JSX and React components

const Footer = () => { // Define a functional component named Footer
  return (
    // Render a footer element with gradient background and vertical padding
    <footer className="bg-gradient-to-r from-blue-400 to-blue-700 py-4">
      {/* Container div for centering and horizontal padding, with horizontal scroll if content overflows */}
      <div className="container mx-auto text-center px-6 overflow-x-auto">
        {/* Paragraph for copyright text, styled as small text */}
        <p className="text-xl text-white">
          {/* Display the current year dynamically and the app name */}
          &copy; {new Date().getFullYear()} Ticket Manager. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer; // Export the Footer component as default
