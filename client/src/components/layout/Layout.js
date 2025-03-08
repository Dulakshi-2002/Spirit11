import React, { useState } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/slices/authSlice";
import Chatbot from "../chatbot/Chatbot";

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [chatbotOpen, setChatbotOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { team } = useSelector((state) => state.team);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-purple-800 text-white transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out md:translate-x-0 md:static md:inset-auto md:h-screen`}
      >
        <div className="flex items-center justify-between p-4 border-b border-purple-700">
          <h1 className="text-xl font-bold">Spirt11</h1>
          <button
            className="p-1 rounded-md md:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="p-4">
          <p className="text-sm text-purple-300 mb-1">Welcome,</p>
          <p className="font-semibold mb-4">{user?.username}</p>

          <p className="text-sm text-purple-300 mb-1">Budget</p>
          <p className="font-semibold mb-4">
            ₹{user?.budget?.toLocaleString()}
          </p>

          <p className="text-sm text-purple-300 mb-1">Team Status</p>
          <p className="font-semibold mb-6">
            {team
              ? team.isComplete
                ? "Complete"
                : `${team.players.length}/11 Players Selected`
              : "No Team Created"}
          </p>

          <nav className="space-y-1">
            <Link
              to="/"
              className="block py-2.5 px-4 rounded hover:bg-purple-700"
            >
              Dashboard
            </Link>
            <Link
              to="/players"
              className="block py-2.5 px-4 rounded hover:bg-purple-700"
            >
              Players
            </Link>
            <Link
              to="/team"
              className="block py-2.5 px-4 rounded hover:bg-purple-700"
            >
              My Team
            </Link>
            <Link
              to="/leaderboard"
              className="block py-2.5 px-4 rounded hover:bg-purple-700"
            >
              Leaderboard
            </Link>
            <Link
              to="/budget"
              className="block py-2.5 px-4 rounded hover:bg-purple-700"
            >
              Budget
            </Link>
          </nav>
        </div>
        <div className="absolute bottom-0 w-full p-4 border-t border-purple-700">
          <button
            onClick={handleLogout}
            className="block w-full text-left py-2.5 px-4 rounded hover:bg-purple-700"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
            <button
              className="p-1 rounded-md text-gray-500 md:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
            <div className="flex-1 flex justify-center md:justify-end">
              <button
                onClick={() => setChatbotOpen((prev) => !prev)}
                className="ml-4 px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
              >
                {chatbotOpen ? "Close Spiriter" : "Ask Spiriter"}
              </button>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-auto bg-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <Outlet />
          </div>
        </main>
      </div>

      {/* Chatbot */}
      {chatbotOpen && (
        <div className="fixed bottom-4 right-4 w-80 shadow-xl z-50">
          <Chatbot onClose={() => setChatbotOpen(false)} />
        </div>
      )}
    </div>
  );
};

export default Layout;
