import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Navbar from "./components/Navbar";
import Footer from "./components/footer";
import Dashboard from "./pages/Dashboard";
import CreateTicket from "./pages/CreateTicket";
import TicketDetail from "./components/TicketDetail";
import Login from "./components/Login";
import Signup from "./components/Signup";
import ProtectedRoute from "./components/ProtectedRoute";
import ParticlesBackground from "./components/ParticlesBackground"; 

const App = () => {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const res = await fetch("http://localhost:5000/tickets");
        const data = await res.json();
        setTickets(data);
      } catch (err) {
        console.error("Error fetching tickets:", err);
      }
    };
    fetchTickets();
  }, []);

  return (
    <Router>
      <div className="min-h-screen flex flex-col relative">
        {/* ✅ Particle background separated */}
        <ParticlesBackground />

        {/* Navbar */}
        <Navbar className="sticky top-0 z-20" />

        {/* Main content */}
        <div className="flex-1 p-6 relative z-10">
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Dashboard tickets={tickets} setTickets={setTickets} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/create"
              element={
                <ProtectedRoute>
                  <CreateTicket tickets={tickets} setTickets={setTickets} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/edit/:id"
              element={
                <ProtectedRoute>
                  <CreateTicket tickets={tickets} setTickets={setTickets} editMode={true} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/ticket/:id"
              element={
                <ProtectedRoute>
                  <TicketDetail />
                </ProtectedRoute>
              }
            />
            <Route path="/login" element={
              <ProtectedRoute>
              <Login />
              </ProtectedRoute>
              } />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </div>

        {/* Footer */}
        <Footer />

        <ToastContainer position="top-center" autoClose={2000} />
      </div>
    </Router>
  );
};

export default App;
