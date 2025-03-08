import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

// Process user query
export const processQuery = createAsyncThunk(
  "chatbot/processQuery",
  async (query, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/chatbot/query`, { query });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to process query"
      );
    }
  }
);

const initialState = {
  loading: false,
  response: null,
  error: null,
  chatHistory: [],
};

const chatbotSlice = createSlice({
  name: "chatbot",
  initialState,
  reducers: {
    clearResponse: (state) => {
      state.response = null;
      state.error = null;
    },
    clearChatHistory: (state) => {
      state.chatHistory = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(processQuery.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(processQuery.fulfilled, (state, action) => {
        state.loading = false;
        state.response = action.payload;
        state.chatHistory.push({
          type: "user",
          content: action.meta.arg,
        });
        state.chatHistory.push({
          type: "bot",
          content: action.payload.message,
          responseType: action.payload.type,
          team: action.payload.team,
        });
      })
      .addCase(processQuery.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearResponse, clearChatHistory } = chatbotSlice.actions;
export default chatbotSlice.reducer;
