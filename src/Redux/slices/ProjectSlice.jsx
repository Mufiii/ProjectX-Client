import { createSlice } from "@reduxjs/toolkit";
import { fetchAllProjectDetails } from "../Actions/Actions";


const initialState = {
    projectsData:null,
    loading: false,
    error: null,
}


export const projectDetailSlice = createSlice({
    name:'projects',
    initialState,
    reducers:{},

    extraReducers: (builder) => {
      builder

      .addCase(fetchAllProjectDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllProjectDetails.fulfilled, (state, action) => {
        console.log('API Response:', action.payload); 
        state.loading = false;
        state.projectsData = action.payload;
        console.log("LLLLLLLLL",state.projects);
      })
      
      .addCase(fetchAllProjectDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    }
})


export default projectDetailSlice.reducer;

export const selectProjects = (state) => {
  // console.log('Redux State:', state);
  return state.projects.projectsData
};

export const selectLoading = (state) => state.projects.loading;
export const selectError = (state) => state.projects.error;



// ProjectSlice.jsx

// import { createSlice } from "@reduxjs/toolkit";
// import { fetchAllProjectDetails } from "../Actions/Actions";

// const initialState = {
//   projectsDetail: [],
//   loading: false,
//   error: null,
// };

// export const projectSlice = createSlice({
//   name: 'projectsDetail',
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchAllProjectDetails.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchAllProjectDetails.fulfilled, (state, action) => {
//         state.loading = false;
//         state.projectsDetail = action.payload;
//       })
//       .addCase(fetchAllProjectDetails.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       });
//   },
// });

// export const selectProjectsDetail = (state) => state.projectsDetail;
// export const selectLoading = (state) => state.projectsDetail.loading;
// export const selectError = (state) => state.projectsDetail.error;

// export default projectSlice.reducer;