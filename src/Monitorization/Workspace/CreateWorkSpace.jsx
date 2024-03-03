import axios from "axios"
import { useContext, useEffect, useRef, useState } from "react"
import { AuthContext } from "../../context/AuthContext"
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useDispatch } from "react-redux";
import { fetchAllWorkspaces, fetchWorkspaceData } from "../../Redux/Actions/Actions";
// import { addWorkspace } from "../../Redux/slices/WorkspaceSlice";


const CreateWorkSpace = () => {

  const { authToken } = useContext(AuthContext)
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const inputRef = useRef()
  const dispatch = useDispatch()

  const [formData, setFormData] = useState({
    name: "",
    description: ""
  })

  const handleChange = (e) => {
    const { value, id } = e.target;
    setFormData({ ...formData, [id]: value })
  }

  const NewWorkspace = async (e) => {
    e.preventDefault()

    try {
      let response = await axios({
        url: 'http://127.0.0.1:8000/workspace/workspace/',
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${authToken.access}`,
        },
        data: formData,
      })
      const newWorkspace = response.data.data;
      console.log(newWorkspace, "Fetched Workspaces")
      // dispatch(fetchAllWorkspaces());
      dispatch(fetchWorkspaceData())
    } catch (error) {
      console.log((error));
      console.error(error.messages);
      console.error(error.response);
    }
  }

  return (

    <div>
      <Button style={{ color: "black", fontWeight: 'bold' }} onClick={handleOpen}>Create Workspace</Button>

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
            width: '70%',
            height: '80%',
            margin: 'auto',
            backgroundColor: "#242424",
            padding: '80px',
            borderRadius: '8px',
            // overflow: "hidden",
          }}
        >
          <div className="flex">
            <div>
              <form ref={inputRef} onSubmit={NewWorkspace}>
                <Typography style={{ color: "white", fontWeight: "700", fontSize: "25px" }}>
                  Let's build a Workspace
                </Typography>
                <p style={{ color: "white", fontSize: "20px" }}>Boost your productivity by making it easier for everyone <br />  to access boards in one location.</p>
                <Typography style={{ color: "white", marginTop: "20px" }} id="modal-modal-title">
                  Workspace Name
                </Typography>
                <input type="text" placeholder="Coxswain's co" className="mt-2 h-12 p-5"
                  value={formData.name}
                  onChange={handleChange}
                  id="name"
                  style={{
                    width: "28em", backgroundColor: "#242424", border: "1px solid white",
                    borderRadius: "4px",
                    padding: "15px",
                    color: "white",
                    marginBottom: "0.5em"
                  }} />
                <p style={{ color: "white", fontSize: "0.8em" }}>This is the name of your company, team or organization.</p>

                <Typography style={{ color: "white", marginTop: "20px" }} id="modal-modal-description" sx={{ mt: 2 }}>
                  Workspace description <span style={{ color: "gray" }} >optional</span>
                </Typography>
                <input
                  type="text"
                  placeholder="Our team organizes everything here"
                  className="mt-2 h-44"
                  id="description"
                  onChange={handleChange}
                  value={formData.description}
                  style={{
                    width: "28em",
                    backgroundColor: "#242424",
                    border: "1px solid white",
                    borderRadius: "4px",
                    padding: "15px",
                    color: "white",
                    lineHeight: "1",
                    marginBottom: "0.5em",
                  }}
                />
                <p className="mb-3" style={{ color: "white", fontSize: "0.8em" }}>Get your members on board with a few words about your Workspace.</p>
                <Button type="submit" style={{ width: "32em", height: "3.5em" }} variant="contained">Continue</Button>
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

export default CreateWorkSpace