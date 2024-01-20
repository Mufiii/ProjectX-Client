import { createSlice } from "@reduxjs/toolkit";
import { fetchAllWorkspaces , setCurrentWorkspace } from "../Actions/Actions";

const initialState = {
  workspaces: [],
  currentWorkspace:null,
  loading: false,
  error: null,
};

const workspacesSlice = createSlice({
  name: 'workspaces',
  initialState,
  reducers: {},

  extraReducers: (builder) => {

    builder

      // fetchAllWorkspaces

      .addCase(fetchAllWorkspaces.pending, (state) => {
        console.log('pending');
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllWorkspaces.fulfilled, (state, action) => {
          
        console.log('fulfilled');
        state.workspaces = action.payload;
        console.log(state.workspaces, 'lkkkk');
      })
      .addCase(fetchAllWorkspaces.rejected, (state, action) => {
        state.loading = false;  
        state.error = action.payload;
      })


      // selected workspace
      .addCase(setCurrentWorkspace, (state, action) => {
        state.currentWorkspace = action.payload;
      });
  },
})


export default workspacesSlice.reducer;


export const selectWorkspaces = (state) => state.workspaces.workspaces;
export const selectLoading = (state) => state.workspaces.loading;
export const selectError = (state) => state.workspaces.error;
export const selectCurrentWorkspace = (state) => state.workspaces.currentWorkspace;


