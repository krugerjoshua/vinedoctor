import { configureStore } from "@reduxjs/toolkit";
import diagnosisReducer from "./diagnosisSlice";

export const store = configureStore({
  reducer: {
    diagnosis: diagnosisReducer,
  },
});