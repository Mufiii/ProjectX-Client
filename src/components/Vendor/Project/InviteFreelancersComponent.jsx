import { Avatar, Button, Card, Grid } from '@mui/material'
import { useContext, useEffect, useState } from 'react'
import { FaMagnifyingGlass } from "react-icons/fa6";
import { AuthContext } from '../../../context/AuthContext';
import InviteDevModal from './InviteDevModal';
import { useDispatch } from 'react-redux';
import { selectDevelopers } from '../../../Redux/slices/FetchAlldevSlice';
import { fetchAllDevelopers, fetchSpecificProjectInDetail } from '../../../Redux/Actions/Actions';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import HirePostDevelopersComponent from './HirePostDevelopersComponent';
import axios from 'axios';
// import { useParams } from 'react-router-dom';
// import { selectProjectDetail } from '../../../Redux/slices/ProjectDetailSlice';

const InviteFreelancersComponent = () => {

  const [selectedFilter, setSelectedFilter] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');


  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedUserId, setSelectedUserId] = useState(null);
  // console.log(selectedUser, '222222222');
  
  const [isModalOpen, setModalOpen] = useState(false);
  
  const handleOpenModal = (user) => {
    setModalOpen(true);
    setSelectedUser(user)
  };
  
  // const [isModalHire, setModalHire] = useState(false);
  
  
  // const handleCloseModal = () => {
    //   setModalHire(false);
  // };

  // const handleHireOpenModal = (userId) => {
  //   console.log(userId,'555');
  //   setSelectedUserId(userId); // Set the selected user ID
  //   setModalHire(true);
  // };
  
  
  // const handleConfirmHire = (userId) => {
    //   console.log(userId, 'pppppppppppp');
    //   HirePostDevelopersComponent(userId);
    //   setModalHire(false); // Close modal after confirmation
    // };
    
    
    const handleFilterClick = (filter) => {
      setSelectedFilter(filter);
    };
    
    // const handleSearchChange = (event) => {
      //   setSearchQuery(event.target.value);
      // };
      
      const dispatch = useDispatch()
      const developers = useSelector(selectDevelopers)
      console.log(developers);
  // const projectDetail = useSelector(selectProjectDetail)


  useEffect(() => {
    console.log("koooooooo");
    dispatch(fetchAllDevelopers())
      // dispatch(fetchSpecificProjectInDetail(projId))
      .then((result) => console.log(result))
      .catch((err) => console.error(err))

  }, [dispatch])


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
          developer_id: userId,
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
      <Grid item xs={12}>
        <div className="mt-5 mb-1">
          <div className="flex gap-4">
            <p
              className={`filter ${selectedFilter === 'bestMatches' ? 'selected' : ''}`}
              onClick={() => handleFilterClick('search')}
              style={{ 'fontWeight': '500', color: "gray" }}
            >
              Search
            </p>
            <p
              className={`filter ${selectedFilter === 'mostRecent' ? 'selected' : ''}`}
              onClick={() => handleFilterClick('invitedFreelancers')}
              style={{ 'fontWeight': '500', color: "gray" }}
            >
              Invited freelancers
            </p>
            <p
              className={`filter ${selectedFilter === 'savedJobs' ? 'selected' : ''}`}
              onClick={() => handleFilterClick('myHires')}
              style={{ 'fontWeight': '500', color: "gray" }}
            >
              My hires
            </p>
            {/* <p
                  className={`filter ${selectedFilter === 'savedJobs' ? 'selected' : ''}`}
                  onClick={() => handleFilterClick('saved')}
                  style={{ 'fontWeight': '500', color: "gray" }}
                >
                  Saved
                </p> */}
          </div>
        </div>
        <hr style={{ borderTop: '2px solid gray', width: '100%', margin: 0 }} />
      </Grid>

      <div className='flex mt-5 flex-col'>
        <div className="flex w-full md:w-3/4 border-2 border-gray-500 items-center bg-white rounded-lg p-1 shadow-md">
          <input
            type="text"
            placeholder="Search"
            className="flex-1 outline-none p-2"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <div style={{ backgroundColor: "green" }}>
            <Button className='h-10' variant="contained" color='success'>
              <FaMagnifyingGlass className="h-4 w-4" style={{ backgroundColor: "green" }} />
            </Button>
          </div>
        </div>
      </div>
      <div className='mt-3'>
        <div className='mb-3'>
          <p className='font-bold'>Invite the freelancers from here</p>
        </div>
        {developers.map((user) => (
          <Card key={user.id} className="position-relative">
            <Grid container className='p-5'>
              <Grid item xs={2}>
                <Avatar
                  alt="Remy Sharp"
                  // src={user.dev_profile?.profile_picture}
                  src="https://imgs.search.brave.com/mJ4YrS_RrRoky0lIxzt6wAE397Ote5gviw2cYAt0WmU/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9jZG4u/ZHJpYmJibGUuY29t/L3VzZXJzLzMyMzU3/MS9zY3JlZW5zaG90/cy81NDEyNjExL21l/ZGlhL2I0OTc4YzZk/MjAwMTUxNDQxM2Iy/Y2QxZmIyOWNhY2I4/LmpwZz9yZXNpemU9/NDAweDMwMCZ2ZXJ0/aWNhbD1jZW50ZXI"
                  style={{ width: '100px', height: '100px' }}
                />
              </Grid>
              <Grid item xs={10}>
                <div className='flex justify-between'>
                  <div className='flex flex-col mt-2'>
                    <p>{user.username}</p>
                  </div>
                  <div className='flex justify-end gap-2'>
                    {/* 
                        <IconButton aria-label="like" color="green">
                          <FavoriteIcon />
                        </IconButton> */}
                    <Button
                      style={{ borderRadius: "15px", textTransform: "none" }}
                      variant="contained" color="success" className="gap-1"
                      onClick={() => handleOpenModal(user)}
                    >
                      Invite to Project
                    </Button>
                    {/* {hiredDev} */}
                    <Button
                      style={{ borderRadius: "15px", textTransform: "none" }}
                      variant="outlined" color="success" className="gap-1"
                      onClick={()=>HirePostDevelopers(user.id)}
                    >
                      Hire
                    </Button>
                  </div>
                </div>
                <h6 style={{ fontWeight: "700", fontSize: "1em", margin: 0 }}>{user.dev_profile?.headline}</h6>
                <p>{user.dev_profile?.country}</p>
                <p>{user.dev_profile?.description}</p>
              </Grid>
            </Grid>
            {/* Buttons and Like Icon */}
            <Grid container justifyContent="flex-end" className="position-absolute top-0 end-0 p-2">

            </Grid>
          </Card>
        ))}
      </div>
      <InviteDevModal isOpen={isModalOpen} handleClose={() => setModalOpen(false)} selectedUser={selectedUser} />
      {/* <HirePostDevelopersComponent
                isOpen={isModalHire} 
                onConfirm={() => handleConfirmHire(selectedUser?.id)} // Pass a function that calls handleConfirmHire with the selectedUserId
                onCancel={handleCloseModal} 
        
      /> */}
    </div>

  )
}

export default InviteFreelancersComponent