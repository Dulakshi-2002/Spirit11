import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import playerReducer from "./slices/playerSlice";
import teamReducer from "./slices/teamSlice";
import chatbotReducer from "./slices/chatbotSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    players: playerReducer,
    team: teamReducer,
    chatbot: chatbotReducer,
  },
});
