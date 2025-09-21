import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import "react-toastify/dist/ReactToastify.css";

const CreateTicket = ({ tickets, setTickets, editMode = false }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "",
    status: editMode ? "" : "Open",
    comments: [],
  });
  const [errors, setErrors] = useState({});
  const [newComment, setNewComment] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (editMode && id) {
      fetch(`http://localhost:5000/tickets/${id}`)
        .then((res) => res.json())
        .then((data) =>
          setFormData({
            title: data.title,
            description: data.description,
            priority: data.priority,
            status: data.status,
            comments: data.comments || [],
          })
        )
        .catch((err) => console.error("Error loading ticket:", err));
    }
  }, [editMode, id]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const validate = () => {
    const errs = {};
    if (!editMode) {
      if (!formData.title.trim()) errs.title = "Title is required";
      else if (formData.title.length < 3) errs.title = "Min 3 characters";

      if (!formData.description.trim())
        errs.description = "Description is required";
      else if (formData.description.length < 10)
        errs.description = "Min 10 characters";

      if (!formData.priority) errs.priority = "Priority is required"; // ✅ Priority validation
    }
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length) return setErrors(validationErrors);

    const url = editMode
      ? `http://localhost:5000/tickets/${id}`
      : "http://localhost:5000/tickets";
    const method = editMode ? "PATCH" : "POST";

    const ticketData = editMode
      ? { ...formData }
      : { ...formData, createdAt: new Date().toLocaleString() };

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(ticketData),
      });

      const data = await res.json();

      if (editMode) {
        setTickets(tickets.map((t) => (t.id === data.id ? data : t)));
        toast.success("Ticket updated successfully!");
      } else {
        setTickets([...tickets, data]);
        toast.success("Ticket created successfully!");
      }

      navigate("/");
    } catch (err) {
      console.error("Error saving ticket:", err);
      toast.error("Something went wrong");
    }
  };

  const handleAddComment = async () => {
    if (!newComment.trim()) return;

    const updatedComments = [
      ...formData.comments,
      { text: newComment, time: new Date().toLocaleString() },
    ];

    const updatedTicket = { ...formData, comments: updatedComments };
    setFormData(updatedTicket);
    setNewComment("");

    await fetch(`http://localhost:5000/tickets/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ comments: updatedComments }),
    });
  };

  return (
    <div className="flex justify-center">
      <motion.div
        className="w-full max-w-2xl bg-blue-50 p-10 rounded-2xl shadow-2xl m-30"
        initial={{ rotateY: 90, opacity: 0 }}
        animate={{ rotateY: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h2
          className="text-5xl font-extrabold text-center 
            bg-gradient-to-r from-blue-900 via-blue-900 to-blue-900 
            bg-clip-text text-transparent drop-shadow-lg animate-pulse mb-6"
        >
          {editMode ? " Edit Ticket" : "Create Ticket"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Title */}
          <div>
            <label className="block font-semibold text-blue-900 mb-1">
              Title
            </label>
            <input
              type="text"
              name="title"
              placeholder="Title"
              value={formData.title}
              onChange={handleChange}
              disabled={editMode}
              className="w-full border rounded-lg p-2 bg-gray-100"
            />
            {errors.title && (
              <p className="text-red-500 text-sm">{errors.title}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block font-semibold text-blue-900 mb-1">
              Description
            </label>
            <textarea
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleChange}
              disabled={editMode}
              className="w-full border rounded-lg p-2 bg-gray-100"
            />
            {errors.description && (
              <p className="text-red-500 text-sm">{errors.description}</p>
            )}
          </div>

          {/* Priority */}
          <div>
            <label className="block font-semibold text-blue-900 mb-1">
              Priority
            </label>
            <select
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              disabled={editMode}
              className="w-full border text-blue-900 rounded-lg p-2 bg-gray-100"
            >
              <option value="" disabled>
                Select Priority
              </option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
            {errors.priority && (
              <p className="text-red-500 text-sm">{errors.priority}</p>
            )}
          </div>

          {/* Status */}
          <div>
            <label className="block font-semibold text-blue-900 mb-1">
              Status
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              disabled={!editMode}
              className="w-full border rounded-lg p-2 text-blue-900 bg-gray-100"
            >
              <option value="Open">Open</option>
              {editMode && (
                <>
                  <option value="In Progress">In Progress</option>
                  <option value="Resolved">Resolved</option>
                </>
              )}
            </select>
          </div>

          {/* Comments (only in edit mode) */}
          {editMode && (
            <div>
              <label className="block font-semibold text-blue-900 mb-2">
                Comments
              </label>
              <ul className="space-y-2 mb-3 max-h-40 overflow-y-auto">
                {formData.comments.map((c, idx) => (
                  <li
                    key={idx}
                    className="p-2 bg-gray-100 rounded border text-sm flex justify-between"
                  >
                    <span>{c.text}</span>
                    <span className="text-gray-500 text-xs">{c.time}</span>
                  </li>
                ))}
              </ul>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Add a comment..."
                  className="flex-1 border rounded p-2"
                />
                <button
                  type="button"
                  onClick={handleAddComment}
                  className="bg-blue-500 text-white px-3 rounded"
                >
                  Add
                </button>
              </div>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="mx-auto block bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-900 cursor-pointer"
          >
            {editMode ? "Update" : "Create"}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default CreateTicket;
