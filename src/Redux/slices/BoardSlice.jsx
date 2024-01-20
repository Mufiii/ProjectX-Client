// import { createSlice } from "@reduxjs/toolkit";
// import { fetchAllBoards } from "../Actions/Actions";

// const initialState = {
//     allBoards: [],
//     loading: false,
//     error: null,
// }

// const BoardSlice = createSlice({
//     name: 'boards',
//     initialState,
//     reducers: {},
//     extraReducers: (builder) => {
//         builder
//             // fetchAllBoards
//             .addCase(fetchAllBoards.pending, (state) => {
//                 console.log('pending');
//                 state.loading = true;
//                 state.error = null;
//             })
//             .addCase(fetchAllBoards.fulfilled, (state, action) => {
//                 state.loading = false;
//                 console.log("fullfilled");
//                 state.allBoards = action.payload;
//                 console.log(action.payload, 'boards');
//             })
//             .addCase(fetchAllBoards.rejected, (state, action) => {
//                 state.loading = false;
//                 state.error = action.payload;
//             });
//     },
// })

// export default BoardSlice.reducer;

// export const selectBoards = (state) => state.spaceBoards.allBoards;
// export const boardLoading = (state) => state.spaceBoards.loading;
// export const boardError = (state) => state.spaceBoards.error;
