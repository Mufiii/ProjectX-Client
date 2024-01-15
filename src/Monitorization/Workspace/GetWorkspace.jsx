import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { AuthContext } from "../../context/AuthContext"
import { Button } from "@mui/material"
import CreateBoard from "../Board/CreateBoard"


const GetWorkspace = () => {

  const { workspace_id } = useParams()
  const { authToken } = useContext(AuthContext)
  const [workspaceData, setWorkspaceData] = useState(null);

  const TheWorkspace = async(e) => {
    e?.preventDefault()
    try {
      const response = await axios({
        url:`http://127.0.0.1:8000/workspace/${workspace_id}`,
        method: !e? 'GET':'PUT',
        headers: {
          'Authorization': `Bearer ${authToken.access}`,
        },
      })
      const data = response.data
      console.log(data);
      setWorkspaceData(data)
      console.log(workspaceData);
    } catch (error) {
        console.log((error));
    }
  }

  useEffect(()=>{
    TheWorkspace()
  },[])

  return (
    <div>
      
      {workspaceData ? (
        <>
          <h2>{workspaceData.name}</h2>
          <p>{workspaceData.description}</p>
        </>
      ) : (
        <p>Loading...</p>
        )}

    </div>
  )
}

export default GetWorkspace