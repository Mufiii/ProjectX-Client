import React, { useContext, useState } from 'react'
import { AuthContext } from '../context/AuthContext';
import { Modal, Typography } from '@mui/material';
import { Button } from '@material-tailwind/react';
import { Box } from '@mui/system';
import CloseIcon from '@mui/icons-material/Close';
import AddLinkIcon from '@mui/icons-material/AddLink';
import SideBar from './SideBar';

const WorkspaceInviteModal = () => {

  const { authToken } = useContext(AuthContext)
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (


   <div>
      <Button style={{ color: "black", fontWeight: 'bold' }} onClick={handleOpen}></Button>

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
            width: '40%',
            height: '30%',
            margin: 'auto',
            backgroundColor: "#242424",
            padding: '60px',
            borderRadius: '8px',
            // overflow: "hidden",
          }}
        >
          <div className="flex">
            <div>
              <form >
                <Typography  style={{ color: "white", fontWeight: "700", fontSize: "25px" }}>
                  Invite to Workspace <CloseIcon style={{float:"right"}}/>
                </Typography>
                <input type="text" placeholder="Email address or name" className="mt-2 h-12 p-5"
                  id="name"
                  style={{
                    width: "36em", backgroundColor: "#242424", border: "1px solid white",
                    borderRadius: "4px",
                    padding: "15px",
                    color: "white",
                    marginBottom: "0.5em"
                  }} />
                  <div className='flex justify-between mt-5 items-center'>
                      <p style={{ color: "white", fontSize: "0.8em" }}>Invite someone to this workspace with this link</p>
                      <Button><AddLinkIcon/> Copy link</Button>
                  </div>

              </form>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  )
}

export default WorkspaceInviteModal