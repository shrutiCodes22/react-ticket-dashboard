import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Eye, Edit, Trash } from "lucide-react";

const Dashboard = ({ tickets, setTickets }) => {
  const [statusFilter, setStatusFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [search, setSearch] = useState("");

  const deleteTicket = async (id) => {
    try {
      await fetch(`http://localhost:5000/tickets/${id}`, { method: "DELETE" });
      setTickets(tickets.filter((t) => t.id !== id));
      toast.success("Ticket deleted successfully!");
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete ticket");
    }
  };

  const priorityRank = { High: 3, Medium: 2, Low: 1 };

  const filteredTickets = tickets
    .filter(
      (t) =>
        (statusFilter === "All" || t.status === statusFilter) &&
        (priorityFilter === "All" || t.priority === priorityFilter) &&
        t.title.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => priorityRank[b.priority] - priorityRank[a.priority]);

  // ✅ Ticket counts
  const totalOpen = tickets.filter((t) => t.status === "Open").length;
  const totalInProgress = tickets.filter((t) => t.status === "In Progress").length;
  const totalResolved = tickets.filter((t) => t.status === "Resolved").length;

  return (
    <div className="bg-blue-50 m-20 opacity-90 p-20">
      <h2 className="text-4xl md:text-5xl font-extrabold text-center 
        bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 
        bg-clip-text text-transparent drop-shadow-lg animate-pulse mb-10">
        Ticket Dashboard
      </h2>

      {/* ✅ Ticket Summary */}
      <div className="flex flex-col md:flex-row justify-center gap-6 mb-12">
        <div className="bg-blue-200 text-blue-900 font-bold px-6 py-4 rounded-xl shadow-lg text-center">
          <p className="text-2xl">{totalOpen}</p>
          <p className="text-sm">Open Tickets</p>
        </div>
        <div className="bg-blue-300 text-blue-900 font-bold px-6 py-4 rounded-xl shadow-lg text-center">
          <p className="text-2xl">{totalInProgress}</p>
          <p className="text-sm">In Progress</p>
        </div>
        <div className="bg-blue-400 text-blue-900 font-bold px-6 py-4 rounded-xl shadow-lg text-center">
          <p className="text-2xl">{totalResolved}</p>
          <p className="text-sm">Resolved</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-6 justify-center mb-12">
        {/* Status Filter */}
        <div className="flex-1">
          <label className="block font-bold text-blue-900 mb-1">Status</label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full h-12 border border-gray-300 px-3 rounded-xl shadow-md text-lg bg-blue-50"
          >
            <option value="All">All</option>
            <option value="Open">Open</option>
            <option value="In Progress">In Progress</option>
            <option value="Resolved">Resolved</option>
          </select>
        </div>

        {/* Priority Filter */}
        <div className="flex-1">
          <label className="block font-bold text-blue-900 mb-1">Priority</label>
          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="w-full h-12 border border-gray-300 px-3 rounded-xl shadow-md text-lg bg-blue-50"
          >
            <option value="All">All</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>

        {/* Search */}
        <div className="flex-1">
          <label className="block font-semibold text-blue-900 mb-1">Search</label>
          <input
            type="text"
            placeholder="🔍 Search by title..."
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-12 border border-gray-300 px-3 rounded-xl shadow-md text-lg bg-blue-50"
          />
        </div>
      </div>

      {filteredTickets.length ? (
        <div className="overflow-x-auto">
          <div className="min-w-[800px]">
            {/* Table Header */}
            <div className="grid grid-cols-7 gap-4 bg-blue-300 font-bold text-sm md:text-lg text-center py-2 md:py-4">
              <span>ID</span>
              <span>Title</span>
              <span>Description</span>
              <span>Priority</span>
              <span>Status</span>
              <span>Created At</span>
              <span>Actions</span>
            </div>

            {/* Table Rows */}
            {filteredTickets.map((t) => (
              <div
                key={t.id}
                className="grid grid-cols-7 gap-4 items-center text-center border-b border-blue-900 py-2 md:py-4 bg-blue-50 transition text-xs md:text-base"
              >
                <span className="font-semibold text-gray-800">{t.id}</span>
                <span className="font-semibold text-gray-800">{t.title}</span>
                <span className="text-gray-600 truncate">{t.description}</span>
                <span className="font-medium">{t.priority}</span>
                <span className="px-2 py-1 rounded-full text-black text-xs md:text-sm font-bold">
                  {t.status}
                </span>
                <span className="text-gray-600">{t.createdAt}</span>
                <div className="flex gap-1 md:gap-2 justify-center flex-wrap">
                  <Link
                    to={`/ticket/${t.id}`}
                    className="bg-blue-500 hover:bg-blue-900 px-2 md:px-3 py-1 rounded-lg text-xs md:text-sm font-semibold"
                  >
                    <Eye size={18} />
                  </Link>
                  <Link
                    to={`/edit/${t.id}`}
                    className="bg-blue-300 hover:bg-blue-600 px-2 md:px-3 py-1 rounded-lg text-xs md:text-sm font-semibold text-gray-900"
                  >
                    <Edit size={18} />
                  </Link>
                  <button
                    onClick={() => deleteTicket(t.id)}
                    className="bg-blue-700 hover:bg-blue-800 text-white px-2 md:px-3 py-1 rounded-lg text-xs md:text-sm font-semibold"
                  >
                    <Trash size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p className="text-gray-500 text-center mt-6 text-lg md:text-xl">
          No tickets found
        </p>
      )}
    </div>
  );
};

export default Dashboard;
