import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useParams } from 'react-router-dom'
import { AuthContext } from '../../../context/AuthContext'
import axios from 'axios'
import { useContext } from 'react';
import InviteFreelancersComponent from './InviteFreelancersComponent';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


const HirePostDevelopersComponent = ({ isOpen, onConfirm, onCancel }) => {

  const { authToken } = useContext(AuthContext)
  const { projId } = useParams()


  const HirePostDevelopers = async (userId) => {
    // e.preventDefault()
    console.log("User ID:", userId);
    try {
      const headers = {
        Authorization: `Bearer ${authToken.access}`,
        'Content-Type': 'application/json',
      };

      const response = await axios({
        url: `http://127.0.0.1:8000/hire/?project_id=${projId}`,
        data: {
          developer_id: 'userId',
          project_id: projId
        },
        method: 'POST',
        headers: headers,
      })
      const data = response.data
      console.log(data, 'qqqqqqqqq');
      if (response.status === 201) {
        console.log('Developer hired successfully');
      } else {
        console.log("something error");
      }
    } catch (error) {
      console.log(error.response);
      console.log(error.message);
    }
  }


  return (
    <div>
      <div>
        <Modal
          open={isOpen}
          // onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Are you sure to hire ?
            </Typography>
            <div className="modal-buttons">
              <Button variant='contained' color='success' onClick={onConfirm}>
                  Yes
              </Button>
              <Button variant='contained' color='error' onClick={onCancel}>
                No
              </Button>
            </div>
          </Box>
        </Modal>
      </div>
      {/* <InviteFreelancersComponent HirePostDevelopers={HirePostDevelopers}/> */}
    </div>

  )
}

export default HirePostDevelopersComponent