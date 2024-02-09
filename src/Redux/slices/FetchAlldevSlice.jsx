import { createSlice } from "@reduxjs/toolkit";
import { fetchAllDevelopers } from "../Actions/Actions";


const initialState = {
  data:[],
  loading:false,
  error:null,
}


const FetchAlldevSlice = createSlice({
  name:'AllDevelopers',
  initialState,
  reducers:{},
  extraReducers: (builder) => {
    builder

    .addCase(fetchAllDevelopers.pending, (state) => {
      console.log('pending');
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllDevelopers.fulfilled, (state, action) => {
        state.loading = false;
        console.log('fulfilled');
        console.log(action.payload);
        state.data = action.payload;
        console.log(state.data, 'lkkkk');
      })
      .addCase(fetchAllDevelopers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default FetchAlldevSlice.reducer;

export const selectDevelopers = (state) => state.AllDevelopers.data
export const selectDevLoading = (state) => state.AllDevelopers.loading;
export const selectDevError = (state) => state.AllDevelopers.error;