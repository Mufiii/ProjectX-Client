import { createSlice } from "@reduxjs/toolkit";
import { fetchDeveloperProfile } from "../Actions/Actions";


const initialState = {
    devProfile : [],
    loading:false,
    error: null
}


const ProfileSlice = createSlice({
  name: "DeveloperProfile",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDeveloperProfile.pending, (state) => {
        console.log('pending');
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDeveloperProfile.fulfilled, (state, action) => {
        state.loading = false;
        console.log('fulfilled');
        console.log(action.payload);
        state.devProfile = action.payload;
        console.log(state.devProfile, 'lkkkk');
      })
      .addCase(fetchDeveloperProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default ProfileSlice.reducer;

export const selectDevProfile = (state) => state.DeveloperProfile.devProfile;
export const selectDevLoading = (state) => state.DeveloperProfile.loading;
export const selectDevError = (state) => state.DeveloperProfile.error;


