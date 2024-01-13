import { createSlice } from "@reduxjs/toolkit";


const WorkspaceSlice = createSlice({
    name: 'workspace',
    initialState : {
      // name : '',
      // description : ''
      currentWorkspace:null
    },
    reducers: {
      addWorkspace: (state, action) => {
        // const { name, description } = action.payload;
        // state.name = name;
        // state.description = description;
        state.currentWorkspace = action.payload
      },
    },
})

export const { addWorkspace } = WorkspaceSlice.actions;
export default WorkspaceSlice.reducer;