import { createSlice } from "@reduxjs/toolkit";
import { fetchBoardDetails } from "../Actions/Actions";



const initialState = {
  // Your existing state properties here
  boardDetails: null,
  boardDetailsLoading: false,
  boardDetailsError: null
}



const BoardDataSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Existing reducers

    builder
      .addCase(fetchBoardDetails.pending, (state) => {
        state.boardDetailsLoading = true;
        state.boardDetailsError = null;
      })
      .addCase(fetchBoardDetails.fulfilled, (state, action) => {
        state.boardDetailsLoading = false;
        state.boardDetails = action.payload;
      })
      .addCase(fetchBoardDetails.rejected, (state, action) => {
        state.boardDetailsLoading = false;
        state.boardDetailsError = action.payload;
      });
  },
});
  
export const selectBoardDetails = (state) => state.board.boardDetails;
export const selectBoardDetailsLoading = (state) => state.board.boardDetailsLoading;
export const selectBoardDetailsError = (state) => state.board.boardDetailsError;


export default BoardDataSlice.reducer;