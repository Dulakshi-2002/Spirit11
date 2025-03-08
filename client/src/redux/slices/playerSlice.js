import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

// Get all players
export const getPlayers = createAsyncThunk(
  "players/getPlayers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/players`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch players"
      );
    }
  }
);

// Get player by ID
export const getPlayerById = createAsyncThunk(
  "players/getPlayerById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/players/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch player"
      );
    }
  }
);

// Create player (admin only)
export const createPlayer = createAsyncThunk(
  "players/createPlayer",
  async (playerData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/players`, playerData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create player"
      );
    }
  }
);

// Update player (admin only)
export const updatePlayer = createAsyncThunk(
  "players/updatePlayer",
  async ({ id, playerData }, { rejectWithValue }) => {
    try {
      const response = await axios.patch(
        `${API_URL}/players/${id}`,
        playerData
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update player"
      );
    }
  }
);

// Delete player (admin only)
export const deletePlayer = createAsyncThunk(
  "players/deletePlayer",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${API_URL}/players/${id}`);
      return { id, ...response.data };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete player"
      );
    }
  }
);

// Get player stats
export const getPlayerStats = createAsyncThunk(
  "players/getPlayerStats",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/players/stats`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch player stats"
      );
    }
  }
);

const initialState = {
  players: [],
  player: null,
  stats: null,
  loading: false,
  error: null,
};

const playerSlice = createSlice({
  name: "players",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearPlayer: (state) => {
      state.player = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Get all players
      .addCase(getPlayers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPlayers.fulfilled, (state, action) => {
        state.loading = false;
        state.players = action.payload.players;
      })
      .addCase(getPlayers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get player by ID
      .addCase(getPlayerById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPlayerById.fulfilled, (state, action) => {
        state.loading = false;
        state.player = action.payload.player;
      })
      .addCase(getPlayerById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Create player
      .addCase(createPlayer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createPlayer.fulfilled, (state, action) => {
        state.loading = false;
        state.players = [...state.players, action.payload.player];
      })
      .addCase(createPlayer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update player
      .addCase(updatePlayer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatePlayer.fulfilled, (state, action) => {
        state.loading = false;
        state.players = state.players.map((player) =>
          player._id === action.payload.player._id
            ? action.payload.player
            : player
        );
        state.player = action.payload.player;
      })
      .addCase(updatePlayer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete player
      .addCase(deletePlayer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deletePlayer.fulfilled, (state, action) => {
        state.loading = false;
        state.players = state.players.filter(
          (player) => player._id !== action.payload.id
        );
      })
      .addCase(deletePlayer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get player stats
      .addCase(getPlayerStats.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPlayerStats.fulfilled, (state, action) => {
        state.loading = false;
        state.stats = action.payload.stats;
      })
      .addCase(getPlayerStats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError, clearPlayer } = playerSlice.actions;
export default playerSlice.reducer;
