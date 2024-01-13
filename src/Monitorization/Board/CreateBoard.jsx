import axios from "axios"
import { useContext, useRef, useState } from "react"
import { AuthContext } from "../../context/AuthContext"
import { Button, Modal, Typography } from "@mui/material"
import { Box } from "@mui/system"
import { useParams } from "react-router-dom"

const CreateBoard = () => {

  const inputRef = useRef()
  const { authToken ,store, } = useContext(AuthContext)
  console.log(store);
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const NewBoard = async(e) => {
      e.preventDefault()
      try {
        let response = await axios({
          url: 'http://127.0.0.1:8000/boards/',
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${authToken.access}`,
          },
          data: e
            ? {
              title: inputRef.current.title?.value,
              workspaceId:workspaceId
              // description: inputRef.current.description?.value,
            }
            : null,
        })
        const newWorkspace = response.data.data;
        console.log(newWorkspace, "Fetched Boards");
      } catch (error) {
        console.log((error));
      }
  }
  
  return (
    <div>
      
      <Button style={{color:"black"}} onClick={handleOpen}>Create Board</Button>

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
            width: '30%',
            height: '55%',
            margin: 'auto',
            backgroundColor: "#242424",
            padding: '30px',
            borderRadius: '8px',
            // overflow: "hidden",
          }}
        >
          <div className="flex">
            <div>
              <form ref={inputRef} onSubmit={NewBoard}>
                <Typography style={{ color: "white", fontWeight: "700", fontSize: "25px" }}>
                  Create Board
                </Typography>
                <Typography style={{ color: "white", marginTop: "20px" }} id="modal-modal-title">
                  Board Name
                </Typography>
                <input type="text" placeholder="Carrom Board" className="mt-2 h-12 p-5"
                  // value={formData.name}
                  id="title"
                  style={{
                    width: "28em", backgroundColor: "#242424", border: "1px solid white",
                    borderRadius: "4px",
                    padding: "15px",
                    color: "white",
                    marginBottom: "1.5em"
                  }} />
                <Typography style={{ color: "white", marginTop: "20px" }} id="modal-modal-title">
                  workspace Name
                </Typography>
                <input type="text" placeholder="Workspace Name" className="mt-2 h-12 p-5"
                  // value={formData.name}
                  defaultValue={store.name}
                  id="title"
                  style={{
                    width: "28em", backgroundColor: "#242424", border: "1px solid white",
                    borderRadius: "4px",
                    padding: "15px",
                    color: "white",
                    marginBottom: "1.5em"
                  }} />
                <Button type="submit" style={{ width: "32em", height: "3.5em" }} variant="contained">Create</Button>
              </form>
            </div>
            <div className="ml-36">
              <img src="https://trello.com/assets/d1f066971350650d3346.svg" alt="" />
            </div>
          </div>
        </Box>
      </Modal>

    </div>
  )
}

export default CreateBoard