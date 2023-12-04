import { createSlice } from '@reduxjs/toolkit'


const educationSlice = createSlice({
    name: 'education',
    initialState: {
      educationList: [],    
    },
    reducers: {
      add_education: (state, action) => {
        state.educationList.push(action.payload)
        console.log(action.payload);
      },
    }
})


export const { add_education } = educationSlice.actions;

export default educationSlice.reducer;