import { fetchSpecificProjectInDetail } from "../Actions/Actions";
import { createSlice } from "@reduxjs/toolkit";



const ProjectDetailSlice = createSlice({
  name: 'projectInDetail',
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSpecificProjectInDetail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSpecificProjectInDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        console.log( state.data,'yoyoyo');
      })
      .addCase(fetchSpecificProjectInDetail.rejected, (state, action) => {
        console.log("the rquest rejected");
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default ProjectDetailSlice.reducer;

export const selectProjectDetail = (state) => state.projectDetail.data;
export const selectProjectLoading = (state) => state.projectDetail.loading;
export const selectProjectError = (state) => state.projectDetail.error;