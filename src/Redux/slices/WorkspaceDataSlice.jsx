import { fetchWorkspaceData } from "../Actions/Actions";
import { createSlice } from "@reduxjs/toolkit";



const workspaceDataSlice = createSlice({
  name: 'workspaces',
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWorkspaceData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWorkspaceData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchWorkspaceData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default workspaceDataSlice.reducer;

export const selectWorkspaceData = (state) => state.workspacesData.data;
export const selectWorkspaceLoading = (state) => state.workspaceData.loading;
export const selectWorkspaceError = (state) => state.workspaceData.error;