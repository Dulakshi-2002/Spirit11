import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  processQuery,
  clearChatHistory,
} from "../../redux/slices/chatbotSlice";

const Chatbot = ({ onClose }) => {
  const [input, setInput] = useState("");
  const dispatch = useDispatch();
  const { chatHistory, loading } = useSelector((state) => state.chatbot);
  const chatContainerRef = useRef(null);

  useEffect(() => {
    // Scroll to bottom when chat history changes
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      dispatch(processQuery(input));
      setInput("");
    }
  };

  const handleClearChat = () => {
    dispatch(clearChatHistory());
  };

  return (
    <div className="flex flex-col bg-white rounded-lg shadow-lg h-96 overflow-hidden">
      <div className="bg-purple-600 text-white px-4 py-3 flex justify-between items-center">
        <h3 className="font-medium">Spiriter</h3>
        <div className="flex space-x-2">
          <button
            onClick={handleClearChat}
            className="p-1 rounded-full hover:bg-purple-500"
            title="Clear chat"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </button>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-purple-500"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
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
      </div>

      <div ref={chatContainerRef} className="flex-1 p-4 overflow-y-auto">
        {chatHistory.length === 0 ? (
          <div className="text-center text-gray-500 mt-4">
            <p>Hi! I'm Spiriter, your fantasy cricket assistant.</p>
            <p className="mt-2">You can ask me about:</p>
            <ul className="mt-1 list-disc list-inside text-left max-w-xs mx-auto">
              <li>Player statistics</li>
              <li>Team suggestions</li>
              <li>Fantasy cricket tips</li>
            </ul>
          </div>
        ) : (
          chatHistory.map((msg, index) => (
            <div
              key={index}
              className={`mb-3 ${
                msg.type === "user" ? "text-right" : "text-left"
              }`}
            >
              <div
                className={`inline-block px-4 py-2 rounded-lg ${
                  msg.type === "user"
                    ? "bg-purple-600 text-white"
                    : "bg-gray-200 text-black"
                }`}
              >
                {msg.content}
              </div>

              {msg.type === "bot" &&
                msg.responseType === "best_team" &&
                msg.team && (
                  <div className="mt-2 bg-white border rounded-lg p-3">
                    <h4 className="font-semibold mb-2">Recommended Team:</h4>
                    <ul className="space-y-1">
                      {msg.team.map((player, idx) => (
                        <li key={idx} className="flex justify-between">
                          <span>{player.name}</span>
                          <span className="text-sm text-gray-500">
                            {player.points.toFixed(1)} pts
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
            </div>
          ))
        )}
        {loading && (
          <div className="text-left mb-3">
            <div className="inline-block px-4 py-2 rounded-lg bg-gray-200">
              <div className="flex space-x-1">
                <div
                  className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
                  style={{ animationDelay: "0ms" }}
                ></div>
                <div
                  className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
                  style={{ animationDelay: "150ms" }}
                ></div>
                <div
                  className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
                  style={{ animationDelay: "300ms" }}
                ></div>
              </div>
            </div>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="border-t p-2">
        <div className="flex rounded-md overflow-hidden">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask something..."
            className="flex-1 px-4 py-2 focus:outline-none"
            disabled={loading}
          />
          <button
            type="submit"
            className="bg-purple-600 text-white px-4 py-2 disabled:bg-purple-400"
            disabled={loading || !input.trim()}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
              />
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
};

export default Chatbot;
