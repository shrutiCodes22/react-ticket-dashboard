import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const TicketDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [ticket, setTicket] = useState(null);

  useEffect(() => {
    const fetchTicket = async () => {
      try {
        const res = await fetch(`http://localhost:5000/tickets/${id}`);
        const data = await res.json();
        setTicket(data);
      } catch (err) {
        console.error("Error fetching ticket:", err);
      }
    };
    fetchTicket();
  }, [id]);

  if (!ticket) return <p className="text-center p-4">Loading...</p>;

  return (
    <div className="flex justify-center mt-20">
      <div className="w-full max-w-2xl text-center bg-blue-50 bg-opacity-90 p-10 rounded-2xl shadow-2xl">
        <h2 className="text-5xl md:text-5xl font-extrabold text-center 
    bg-gradient-to-r from-blue-900 via-blue-600 to-blue-900 
    bg-clip-text text-transparent drop-shadow-lg animate-pulse mb-6">
          Ticket Details
        </h2>

        {/* Ticket Info */}
        <div className="space-y-4 text-lg text-blue-500">
          <p>
            <strong className="text-blue-800">ID:</strong> {ticket.id}
          </p>
          <p>
            <strong className="text-blue-800">Title:</strong> {ticket.title}
          </p>
          <p>
            <strong className="text-blue-800">Description:</strong>{" "}
            {ticket.description}
          </p>
          <p>
            <strong className="text-blue-800">Priority:</strong>{" "}
            {ticket.priority}
          </p>
          <p>
            <strong className="text-blue-800">Status:</strong> {ticket.status}
          </p>
          <p>
            <strong className="text-blue-800">Created At:</strong>{" "}
            {ticket.createdAt}
          </p>
        </div>

        {/* Comments Section */}
        <div className="mt-6 text-left">
          <h3 className="text-xl font-semibold text-blue-900 mb-2">Comments</h3>
          {ticket.comments && ticket.comments.length > 0 ? (
            <ul className="space-y-2">
              {ticket.comments.map((c) => (
                <li
                  key={c.id}
                  className="p-2 bg-gray-100 rounded border text-sm flex justify-between"
                >
                  <span>{c.text}</span>
                  <span className="text-blue-500 text-xl">{c.time}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-blue-500">No comments yet</p>
          )}
        </div>

        {/* Back Button */}
        <div className="mt-8">
          <button
            onClick={() => navigate("/")}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg shadow-lg transition transform hover:scale-105"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default TicketDetail;
