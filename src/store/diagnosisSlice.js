import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { diagnoseImage } from "../services/openrouter";

// This is the async action — same idea as fetching boards in your Trello clone
export const runDiagnosis = createAsyncThunk(
  "diagnosis/run",
  async ({ base64Image, mimeType }) => {
    // Add this log to confirm the data arrives here
    console.log("Slice received:", {
      hasBase64: !!base64Image,
      base64Length: base64Image?.length,
      mimeType,
    });
    const result = await diagnoseImage(base64Image, mimeType);
    return result;
  }
);

const diagnosisSlice = createSlice({
  name: "diagnosis",
  initialState: {
    current: null,       // the latest diagnosis result
    history: [],         // all past scans this session
    status: "idle",      // idle | loading | done | error
    error: null,
  },
  reducers: {
    clearCurrent: (state) => {
      state.current = null;
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(runDiagnosis.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(runDiagnosis.fulfilled, (state, action) => {
        state.status = "done";
        state.current = action.payload;
        state.history.unshift({        // adds to the front of history
          id: Date.now(),
          result: action.payload,
          timestamp: new Date().toLocaleString(),
        });
      })
      .addCase(runDiagnosis.rejected, (state, action) => {
        state.status = "error";
        state.error = "Diagnosis failed. Try a clearer photo.";
      });
  },
});

export const { clearCurrent } = diagnosisSlice.actions;
export default diagnosisSlice.reducer;