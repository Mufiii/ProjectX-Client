import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import axios from "axios"
import { useContext, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { useEffect } from "react";
import CloseIcon from '@mui/icons-material/Close';
import { Avatar, Grid } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useParams } from 'react-router-dom';
import './Applicants.css'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '60%',
  height: '90%',
  bgcolor: 'background.paper',
  // border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  borderRadius: "15px"
};

const ProjectApplicationsView = ({ isOpen, handleClose, selectedApplicant }) => {

  const { authToken } = useContext(AuthContext)
  console.log(selectedApplicant, 'selectedApplicant');
  const { projId } = useParams()
  console.log(projId);

  const ApplicantView = async () => {

    try {
      const { user_id } = selectedApplicant;
      const headers = {
        Authorization: `Bearer ${authToken.access}`,
        'Content-Type': 'application/json',
      };

      const response = await axios({
        url: `http://127.0.0.1:8000/vendor/applicants/${user_id}/?q=${projId}`,
        method: 'GET',
        headers: headers
      })
      const data = response.data
      console.log(data, '55555555');

    } catch (error) {
      console.log('response', error.response);
      console.log(error.status);
      console.log('message', error.message);
    }
  }

  useEffect(() => {
    if (selectedApplicant) {
      ApplicantView(); // Call ApplicantView only if selectedApplicant exists
    }
  }, [selectedApplicant]); // Add selectedApplicant to dependencies array




  return (
    <div>

      <div>
        <Modal
          open={isOpen}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            {selectedApplicant && (
              <div>
                <div className='flex p-5'>
                  <div>
                    <Avatar
                      alt="Remy Sharp"
                      // src={user.dev_profile?.profile_picture}
                      src="https://imgs.search.brave.com/mJ4YrS_RrRoky0lIxzt6wAE397Ote5gviw2cYAt0WmU/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9jZG4u/ZHJpYmJibGUuY29t/L3VzZXJzLzMyMzU3/MS9zY3JlZW5zaG90/cy81NDEyNjExL21l/ZGlhL2I0OTc4YzZk/MjAwMTUxNDQxM2Iy/Y2QxZmIyOWNhY2I4/LmpwZz9yZXNpemU9/NDAweDMwMCZ2ZXJ0/aWNhbD1jZW50ZXI"
                      style={{ width: '200px', height: '200px' }}
                    />
                  </div>
                  <div className='flex flex-col'>
                    <div className='flex justify-end mb-5'>
                      <CloseIcon style={{ cursor: 'pointer', fontSize: '30px' }} onClick={handleClose} />
                    </div>
                    <div className='flex items-center'>
                      {/* Left side */}
                      <div className='flex mx-3 flex-col'>
                        <Typography style={{ color: "black", fontWeight: "bold", fontSize: "1.5em", textTransform: 'uppercase' }}>
                          {selectedApplicant.developer.user.first_name} {selectedApplicant.developer.user.last_name}
                        </Typography>
                        <Typography>
                          {selectedApplicant.developer.user.country}
                        </Typography>
                      </div>
                      <div className='ml-60'></div>
                      {/* Right side */}
                      <div className='flex gap-5 items-center ml-auto'>
                        <Button variant='contained' color='success' style={{ borderRadius: "20px" }} className='w-52 h-10'>
                          Hire Freelancer
                        </Button>
                        <Button style={{ borderRadius: "50%", backgroundColor: "#ddd", width: "40px", height: "40px", minWidth: "auto" }}>
                          <FavoriteIcon style={{ fontSize: "20px", color: "green" }} />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>


                <hr style={{ borderTop: "2px solid #ddd", margin: "12px 0", marginTop: "1em" }} />
                <Grid container>
                    <Grid item xs={4}>

                    </Grid>
                    <Grid item xs={8}>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  <Typography style={{ color: "black", fontWeight: "bold", fontSize: "1.5em" }}>
                    Proposal details
                  </Typography>
                </Typography>
                <div className='mt-4'>
                  <div className='mt-4'>
                    {selectedApplicant.cover_letter || selectedApplicant.notes ||
                      selectedApplicant.approach || selectedApplicant.attachments ? (
                      <div>
                        <div className='mt-4'>
                          {selectedApplicant.cover_letter && (
                            <Typography>
                              <span className='drew'>Cover Letter</span> - {selectedApplicant.cover_letter}
                            </Typography>
                          )}
                        </div>
                        <div className='mt-4'>
                          {selectedApplicant.notes && (
                            <Typography>
                              <span className='drew'>Notes</span> - {selectedApplicant.notes}
                            </Typography>
                          )}
                        </div>
                        <div className='mt-4'>
                          {selectedApplicant.approach && (
                            <Typography>
                              <span className='drew'>Approach</span> - {selectedApplicant.approach}
                            </Typography>
                          )}
                        </div>
                        <div className='mt-4'>
                          {selectedApplicant.attachments && (
                            <Typography>
                              <span className='drew'>Attachments</span> - {selectedApplicant.attachments}
                            </Typography>
                          )}
                        </div>
                      </div>
                    ) : (
                      <Typography style={{ color: "gray", fontWeight: "bold", fontSize: "1em" }}>No data available</Typography>
                    )}
                  </div>
                </div>
                    </Grid>
                </Grid>
                
              </div>
            )}
          </Box>
        </Modal>
      </div>
      {/* <ReviewProposalsComponent isOpen={handleOpen} handleClose={() => setOpen(false)}/> */}

    </div>
  )
}

export default ProjectApplicationsView