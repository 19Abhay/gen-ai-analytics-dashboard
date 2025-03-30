import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { generateMockResponse } from "../../utils/mockData";

export const submitQuery = createAsyncThunk(
  "query/submitQuery",
  async (query, { rejectWithValue }) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const response = generateMockResponse(query);

      if (Math.random() < 0.1) {
        throw new Error("Failed to process query. Please try again.");
      }

      return { query, response };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const querySlice = createSlice({
  name: "query",
  initialState: {
    currentQuery: null,
    currentResult: null,
    history: [],
    status: "idle",
    error: null,
  },
  reducers: {
    resetStatus: (state) => {
      state.status = "idle";
      state.error = null;
    },
    clearHistory: (state) => {
      state.history = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitQuery.pending, (state, action) => {
        state.status = "loading";
        state.currentQuery = action.meta.arg;
      })
      .addCase(submitQuery.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.currentResult = action.payload.response;

        state.history.unshift({
          query: action.payload.query,
          timestamp: Date.now(),
          resultId: action.payload.response.id,
        });

        if (state.history.length > 10) {
          state.history = state.history.slice(0, 10);
        }
      })
      .addCase(submitQuery.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Something went wrong";
      });
  },
});

export const { resetStatus, clearHistory } = querySlice.actions;

export default querySlice.reducer;
