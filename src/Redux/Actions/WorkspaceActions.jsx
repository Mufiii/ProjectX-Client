import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";



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
