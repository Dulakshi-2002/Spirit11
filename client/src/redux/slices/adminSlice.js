import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

// Get tournament summary
export const getTournamentSummary = createAsyncThunk(
  "admin/getTournamentSummary",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/admin/tournament-summary`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch tournament summary"
      );
    }
  }
);

// Get all teams
export const getAllTeams = createAsyncThunk(
  "admin/getAllTeams",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/admin/teams`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch teams"
      );
    }
  }
);

// Get all users
export const getAllUsers = createAsyncThunk(
  "admin/getAllUsers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/admin/users`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch users"
      );
    }
  }
);

// Update player stats in bulk
export const updatePlayerStats = createAsyncThunk(
  "admin/updatePlayerStats",
  async (playersData, { rejectWithValue }) => {
    try {
      const response = await axios.patch(
        `${API_URL}/admin/update-player-stats`,
        {
          players: playersData,
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update player stats"
      );
    }
  }
);

const initialState = {
  summary: null,
  teams: [],
  users: [],
  loading: false,
  error: null,
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Get tournament summary
      .addCase(getTournamentSummary.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTournamentSummary.fulfilled, (state, action) => {
        state.loading = false;
        state.summary = action.payload.summary;
      })
      .addCase(getTournamentSummary.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get all teams
      .addCase(getAllTeams.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllTeams.fulfilled, (state, action) => {
        state.loading = false;
        state.teams = action.payload.teams;
      })
      .addCase(getAllTeams.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get all users
      .addCase(getAllUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload.users;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update player stats
      .addCase(updatePlayerStats.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatePlayerStats.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(updatePlayerStats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError } = adminSlice.actions;
export default adminSlice.reducer;
