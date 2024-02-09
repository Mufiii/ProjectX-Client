import { Avatar, Box, Button, Modal, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import React, { useState } from 'react';
import { borderRadius, fontWeight } from '@mui/system';
import { useContext } from 'react';
import { AuthContext } from '../../../context/AuthContext';
import { useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { toast} from 'react-toastify';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '40%', // Set default width
  height: '65%', // Set default height
  bgcolor: 'white',
  // border: '2px solid #333',
  borderRadius: '16px', // Add border-radius
  boxShadow: 24,
  p: 4,
};

const InviteDevModal = ({ isOpen, handleClose, selectedUser }) => {

  
  const {authToken} = useContext(AuthContext)
  const { projId } = useParams()
  const [message,setMessage] = useState('')
  const handleInputChange = (e) => {
    setMessage(e.target.value)
  };

  const Invitation = async(e) => {
    e.preventDefault()

    try {
      
      let response = await axios({
        url: 'http://127.0.0.1:8000/invite/',
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${authToken.access}`,
        },
        data: {
          email:selectedUser.email,
          message:message, 
          project_id:projId
        }
      })
      const data = response.data
      console.log(data,'666');
      toast.success('Email send successfully')
      console.log("invitation send successfully");

      handleClose();
    } catch (error) {
      console.log((error));
      if (error.response) {
        console.error('Response data:', error.response.data);
        console.error('Response status:', error.response.status);
        console.error('Response headers:', error.response.headers);
      }
    }
  }

  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
      <form onSubmit={Invitation}> 
          <div className='flex justify-between p-3'>
          <Typography style={{ fontWeight: "600" }} id="modal-modal-title" variant="h6" component="h2">
            Invite to job
          </Typography>
          <CloseIcon onClick={handleClose} />
        </div>
        <div className='mt-4 flex items-center gap-4'>
          <div>
            <Avatar
              alt="Remy Sharp"
              // src={user.dev_profile?.profile_picture}
              src="https://imgs.search.brave.com/mJ4YrS_RrRoky0lIxzt6wAE397Ote5gviw2cYAt0WmU/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9jZG4u/ZHJpYmJibGUuY29t/L3VzZXJzLzMyMzU3/MS9zY3JlZW5zaG90/cy81NDEyNjExL21l/ZGlhL2I0OTc4YzZk/MjAwMTUxNDQxM2Iy/Y2QxZmIyOWNhY2I4/LmpwZz9yZXNpemU9/NDAweDMwMCZ2ZXJ0/aWNhbD1jZW50ZXI"
              style={{ width: '100px', height: '100px' }}
            />
          </div>
          <div className='flex flex-col'>
            {selectedUser && (
              <>
                <p>{selectedUser.username}</p>
                <p>{selectedUser.dev_profile.headline}</p>
                <p>{selectedUser.email}</p>
              </>
            )}
          </div>
        </div>
        <div className='mt-5'>
          <Typography style={{ fontWeight: "600" }}>
            Message
          </Typography>
          <textarea
            type="text"
            className='p-2 h-44 w-full mt-2'
            style={{ border: "1px solid #222", borderRadius: "10px" }}
            placeholder='Write your message here'
            name='message'
            onChange={handleInputChange}
            
          />
          <div className=' mt-5 flex justify-end ' >
            <Button type='submit' style={{ borderRadius: "15px", textTransform: "none" }} variant='contained' color='success' >Send invitation</Button>
          </div>
        </div>
        </form>
      </Box>
    </Modal>
  );
};

export default InviteDevModal;
