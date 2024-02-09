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
      const response = await axios.get('http://127.0.0.1:8000/developer/profile/', config);
      console.log(response.data, '0000000');
      return response.data;
    } catch (error) {
      console.log("222222222");
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
      console.log(response.data,'workspacedata');
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


export const fetchBoardDetails = createAsyncThunk(
  'boards/fetchDetails',
  async (boardId, { rejectWithValue }) => {
    try {
      const authTokenString = localStorage.getItem('authtokens');
      const authTokensObject = authTokenString ? JSON.parse(authTokenString) : null;

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authTokensObject.access}`,
        },
      };

      const response = await axios.get(`http://127.0.0.1:8000/boards/${boardId}/`, config);
      return response.data;
    } catch (error) {
      console.error('Error during Axios request:', error);
      console.error('response:', error.response);
      console.error(error.message);
      return rejectWithValue('Error fetching board details');
    }
  }
);


export const fetchAllProjectDetails = createAsyncThunk(
    'fetchallProjects',
    async(_,{rejectWithValue}) => {
      try {
        const authTokenString = localStorage.getItem('authtokens');
        const authTokensObject = authTokenString ? JSON.parse(authTokenString) : null;
  
        const config = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authTokensObject.access}`,
          },
        };
  
        const response = await axios.get('http://127.0.0.1:8000/vendor/project/', config);
        console.log('API Response:', response.data);
        console.log("oOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO");
        console.log(response.data,'woowowoow');
        return response.data;
      } catch (error) {
        if (error.response && error.response.status === 404) {
          // Handle not found scenario (e.g., redirect to an error page)
          console.log('project not found');
          return rejectWithValue('project not found');
        } else {
          console.error('Error during Axios request:', error);
          console.error('response:', error.response);
          console.error(error.message);
          return rejectWithValue('Error fetching workspace data');
        }
      }
    }
    
)

export const fetchSpecificProjectInDetail = createAsyncThunk(
    'fetchSpecificProject',
    async(projId , {rejectWithValue}) => {
      try {
        const authTokenString = localStorage.getItem('authtokens');
        const authTokensObject = authTokenString ? JSON.parse(authTokenString) : null;
  
        const config = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authTokensObject.access}`,
          },
        };

        const response = await axios.get(`http://127.0.0.1:8000/vendor/project/${projId}/`, config);
        console.log('API Response:', response.data);
        console.log("wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww");
        console.log(response.data,'woowowoow');
        return response.data;
      } catch (error) {
        if (error.response && error.response.status === 404) {
          // Handle not found scenario (e.g., redirect to an error page)
          console.log('project not found');
          return rejectWithValue('project not found');
        } else {
          console.error('Error during Axios request:', error);
          console.error('response:', error.response);
          console.error(error.message);
          return rejectWithValue('Error fetching workspace data');
        }
      }
    }
    
)


export const fetchAllDevelopers = createAsyncThunk(
  console.log('Starting fetchAllDevelopers'),
  'developers/fetchAllDevelopers',

  async(_, {rejectWithValue}) => {
    try {
      const authTokenString = localStorage.getItem('authtokens');
      const authTokensObject = authTokenString ? JSON.parse(authTokenString) : null;

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authTokensObject.access}`,
        },
      };

      const response = await axios.get('http://127.0.0.1:8000/vendor/developers/', config);
      console.log('API Response fetchAllDevelopers:', response.data);
      console.log("555555555");
      console.log(response.data,'lOOOOOOOO');
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 404) {
        // Handle not found scenario (e.g., redirect to an error page)
        console.log('developers not found');
        return rejectWithValue('developers not found');
      } else {
        console.error('Error during Axios request:', error);
        console.error('response:', error.response);
        console.error(error.message);
        return rejectWithValue('Error fetching developer data');
      }
    }
  }  
)