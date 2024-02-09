import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { useLocation, useParams } from "react-router-dom"
import { AuthContext } from "../../context/AuthContext"
import { Button } from "@mui/material"
import CreateBoard from "../Board/CreateBoard"
import { useDispatch, useSelector } from "react-redux"
import { fetchWorkspaceData } from "../../Redux/Actions/Actions"
import { selectError, selectLoading, selectWorkspaces } from "../../Redux/slices/WorkspaceSlice"


const GetWorkspace = () => {

  const { workspace_id } = useParams()
  // const {workspaceData, setWorkspaceData} = useContext(AuthContext)
  const location = useLocation()
  console.log(location.pathname);

  const dispatch = useDispatch();
  // const workspaces = useSelector(selectWorkspaces);
  // const loading = useSelector(selectLoading);
  // const error = useSelector(selectError);


  useEffect(() => {
    console.log("mufees rahman");
    dispatch(fetchWorkspaceData(workspace_id))
      .then((result) => console.log("Fetch success in WorkData:", result))
      .catch((err) => console.error("fetch error in WorkData:", err));
  }, [dispatch, workspace_id]);


  return (
    <div>
          
      {/* {workspaces.length > 0 ? (
        workspaces.map((work) => (
          <div key={work.id}>
            <p>{work.name}</p>
          </div>
        ))
      ) : (
        <p>lllllllllllllllll</p>
      )} */}


    </div>
  )
}

export default GetWorkspace