import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import DoneIcon from '@mui/icons-material/Done';
import { useNavigate } from 'react-router-dom';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "30%",
  height: "82%",
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: "10px"
};

const ApplySuccessModal = ({ isOpen, handleClose }) => {

  const navigate = useNavigate()
  return (
    <div>
      <Modal
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <img style={{ height: 200, width: 300 }} src="https://img.freepik.com/free-vector/hand-businessman-holding-paper-plane-office-person-with-origami-airplane-flat-vector-illustration-success-idea-career-direction-concept-banner-website-design-landing-web-page_74855-24703.jpg?w=1060&t=st=1709408121~exp=1709408721~hmac=3124a317e721f2b0dc7710e36347a742ab3770bdf555552d926ec180bb135d43" alt="" />
          </div>
          <Typography style={{ fontWeight: "bold", fontSize: "1.8em", textAlign: "center" }} id="modal-modal-description" sx={{ mt: 2 }}>
            Your application has been <br /> submitted!
          </Typography>
          <div className='flex gap-3 mt-5' style={{ alignItems: "center" }}>
            <div>
              <DoneIcon style={{ color: "green", justifyContent: "center" }} />
            </div>
            <div>
              <Typography style={{ alignSelf: "center" }}>
                You will get an email confirmation on your <br /> Email Address
              </Typography>
            </div>
          </div>
          <div className='mt-3'>
            <p style={{ fontWeight: "bold" }}>Keep track of your applications</p>
            <p>
              You will receive a status update in an email from Indeed within a few weeks of submitting your application. In the meantime, you can view and track all your applications in the Indeed My jobs section at any time.
            </p>
          </div>


          <div className='mt-5'>
            <Button
              fullWidth
              variant='outlined'
              onClick={() => navigate('/home')}
              style={{
                fontWeight: "bold",
                textTransform: "none",
                height: "50px",  /* Increase button height */
                borderColor: "gray",  /* Change outlined color to gray */
                '&:hover': { backgroundColor: "red" },
                fontSize: "1.1em"
              }}
            >
              Return to Project Search
            </Button>
          </div>

        </Box>
      </Modal>
    </div >
  );
}

export default ApplySuccessModal