import axios from "axios"
import { useContext, useRef, useState } from "react"
import { AuthContext } from "../../context/AuthContext"
import { Button, Modal, Typography } from "@mui/material"
import { Box } from "@mui/system"
import { useParams } from "react-router-dom"
import { useDispatch } from "react-redux"
import { fetchWorkspaceData } from "../../Redux/Actions/Actions"

const CreateBoard = () => {

  const inputRef = useRef()
  const { authToken ,store, } = useContext(AuthContext)
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  console.log(store.id,'12345');
  const { workspace_id } = useParams()
  console.log(workspace_id ,'123456');

  const dispatch = useDispatch()


  const NewBoard = async(e) => {
      e.preventDefault()

      const formData = new FormData(inputRef.current);

      try {
        let response = await axios({
          url: `http://127.0.0.1:8000/workspace/boards/?q=${workspace_id}`,
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${authToken.access}`,
          },
          data:formData,
        })
        const newWorkspace = response.data.data;
        console.log(response,'**********');
        dispatch(fetchWorkspaceData())
        console.log(newWorkspace, "Fetched Boards");
      } catch (error) {
        console.log((error));
        console.log("response",error.response);
        console.log("messsage",error.message);
      }
  }

  
  
  return (
    <div>
    <Button style={{ color: "black" }} onClick={handleOpen}>
      Create Board
    </Button>

    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '30%', // Adjusted for responsiveness
          height: '60%', // Adjusted for responsiveness
          margin: 'auto',
          backgroundColor: "#242424",
          padding: '3%', // Adjusted for responsiveness
          borderRadius: '8px',
          overflow: "hidden",
        }}
      >
        <div className="flex flex-col">
          <form ref={inputRef} onSubmit={NewBoard}>
            <Typography style={{ color: "white", fontWeight: "700", fontSize: "2rem" }}>
              Create Board
            </Typography>
            <Typography style={{ color: "white", marginTop: "20px" }} id="modal-modal-title">
              Board Name
            </Typography>
            <input
              type="text"
              placeholder="Carrom Board"
              className="mt-2 h-12 p-5"
              name="title"
              id="title"
              style={{
                width: "100%", // Adjusted for responsiveness
                backgroundColor: "#242424",
                border: "1px solid white",
                borderRadius: "4px",
                padding: "15px",
                color: "white",
                marginBottom: "1.5em"
              }}
            />
            <Typography style={{ color: "white", marginTop: "20px" }} id="modal-modal-title">
              Workspace Name
            </Typography>
            <input
              type="text"
              className="mt-2 h-12 p-5"
              defaultValue={workspace_id}// Adjusted for demonstration
              id="title"
              readOnly
              style={{
                width: "100%", // Adjusted for responsiveness
                backgroundColor: "#242424",
                border: "1px solid white",
                borderRadius: "4px",
                padding: "15px",
                color: "white",
                marginBottom: "1.5em"
              }}
            />
            <Button
              type="submit"
              style={{ width: "100%", height: "3.5em" }}
              variant="contained"
            >
              Create
            </Button>
          </form>
        </div>
      </Box>
    </Modal>
  </div>
  )
}

export default CreateBoard