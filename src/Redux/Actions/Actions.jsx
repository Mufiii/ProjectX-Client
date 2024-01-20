import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';


export const setCurrentWorkspace = createAction('workspaces/setCurrentWorkspace');



export const fetchAllWorkspaces = createAsyncThunk(
  
  'workspaces/fetchAll',
  
  async (_, { rejectWithValue }) => {
    
    
    try {

      const authTokensString = localStorage.getItem('authtokens');
      const authTokensObject = authTokensString ? JSON.parse(authTokensString) : null;

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authTokensObject.access}`, // Use the extracted accessToken
        },
      };
      const response = await axios.get('http://127.0.0.1:8000/workspace/', config);
      console.log("daaa",response.data);
      return response.data;
    } catch (error) {
      console.error('Error in fetchAllWorkspaces:', error);
      return rejectWithValue(error.message);
    }
  }
);


export const fetchDeveloperProfile = createAsyncThunk(
  
  'DeveloperProfile',
  async (_, { rejectWithValue }) => {
    try {
      const authTokensString = localStorage.getItem('authtokens');
      const authTokensObject = authTokensString ? JSON.parse(authTokensString) : null;

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authTokensObject.access}`,
        },
      };
      const response = await axios.get('http://127.0.0.1:8000/developer/profile', config);
      console.log(response.data, '0000000');
      return response.data;
    } catch (error) {
      console.error('Error in user profile:', error);
      return rejectWithValue(error.message);
    }
  }
);


// export const fetchAllBoards = createAsyncThunk(
//     'fetchBoards',

//     async (_, {rejectWithValue}) => {
//         try {
//           const authTokensString = localStorage.getItem('authtokens');
//           const authTokensObject = authTokensString ? JSON.parse(authTokensString) : null;

//           const config = {
//             headers: {
//               'Content-Type': 'application/json',
//               Authorization: `Bearer ${authTokensObject.access}`,
//             },
//           };
//           const response = await axios.get('http://127.0.0.1:8000/boards/', config);
//           console.log(response.data, '+++++++++++');
//           return response.data;
//         }catch(error) {
//           console.error('Error in fetching boards:', error);
//           return rejectWithValue(error.message);
//         }
//     }
// )




export const fetchWorkspaceData = createAsyncThunk(
  'workspace/fetchData',
  async (workspaceId, { rejectWithValue }) => {
    try {
      const authTokenString = localStorage.getItem('authtokens');
      const authTokensObject = authTokenString ? JSON.parse(authTokenString) : null;

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authTokensObject.access}`,
        },
      };

      const response = await axios.get(`http://127.0.0.1:8000/workspace/${workspaceId}/`, config);
      console.log(response.data,'9999999999');
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 404) {
        // Handle not found scenario (e.g., redirect to an error page)
        console.log('Workspace not found');
        return rejectWithValue('Workspace not found');
      } else {
        console.error('Error during Axios request:', error);
        console.error('response:', error.response);
        console.error(error.message);
        return rejectWithValue('Error fetching workspace data');
      }
    }
  }
);
