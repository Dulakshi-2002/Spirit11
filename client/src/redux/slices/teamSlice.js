import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

// Get user team
export const getUserTeam = createAsyncThunk(
  "team/getUserTeam",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/teams/my-team`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch team"
      );
    }
  }
);

// Create team
export const createTeam = createAsyncThunk(
  "team/createTeam",
  async (teamData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/teams`, teamData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create team"
      );
    }
  }
);

// Add player to team
export const addPlayerToTeam = createAsyncThunk(
  "team/addPlayerToTeam",
  async (playerId, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/teams/add-player`, {
        playerId,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to add player to team"
      );
    }
  }
);

// Remove player from team
export const removePlayerFromTeam = createAsyncThunk(
  "team/removePlayerFromTeam",
  async (playerId, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `${API_URL}/teams/remove-player/${playerId}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to remove player from team"
      );
    }
  }
);

// Get leaderboard
export const getLeaderboard = createAsyncThunk(
  "team/getLeaderboard",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/teams/leaderboard`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch leaderboard"
      );
    }
  }
);

const initialState = {
  team: null,
  leaderboard: [],
  loading: false,
  error: null,
  remainingBudget: 0,
};

const teamSlice = createSlice({
  name: "team",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Get user team
      .addCase(getUserTeam.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserTeam.fulfilled, (state, action) => {
        state.loading = false;
        state.team = action.payload.team;
      })
      .addCase(getUserTeam.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Create team
      .addCase(createTeam.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createTeam.fulfilled, (state, action) => {
        state.loading = false;
        state.team = action.payload.team;
      })
      .addCase(createTeam.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Add player to team
      .addCase(addPlayerToTeam.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addPlayerToTeam.fulfilled, (state, action) => {
        state.loading = false;
        state.team = action.payload.team;
        state.remainingBudget = action.payload.remainingBudget;
      })
      .addCase(addPlayerToTeam.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Remove player from team
      .addCase(removePlayerFromTeam.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removePlayerFromTeam.fulfilled, (state, action) => {
        state.loading = false;
        state.team = action.payload.team;
        state.remainingBudget = action.payload.remainingBudget;
      })
      .addCase(removePlayerFromTeam.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get leaderboard
      .addCase(getLeaderboard.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getLeaderboard.fulfilled, (state, action) => {
        state.loading = false;
        state.leaderboard = action.payload.teams;
      })
      .addCase(getLeaderboard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError } = teamSlice.actions;
export default teamSlice.reducer;
