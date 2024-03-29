import { useRef, useContext, useEffect, useState } from 'react';
// import axios from 'axios';
import { AuthContext } from '../../../context/AuthContext';
import { styled } from '@mui/material/styles';
// import CloudUploadIcon from '@mui/icons-material/CloudUpload';
// import BannerUpload from '../../cloudinary/BannerCloudinary';
// import LogoUpload from '../../cloudinary/LogoCloudinary';
import {
  Avatar,
  Typography,
  Input,
  Button,
  Card,
  Grid,
  Box
} from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
// import './UpdateProfile.css'
import LocationOnIcon from '@mui/icons-material/LocationOn';
import FactoryIcon from '@mui/icons-material/Factory';
import ApartmentIcon from '@mui/icons-material/Apartment';
import InsertLinkIcon from '@mui/icons-material/InsertLink';
import Secondbar from '../../../utils/Secondbar';
import BottomBar from '../../../utils/BottomBar';
import { useDispatch, useSelector } from 'react-redux';
import { selectDevProfile, selectDevLoading, selectDevError } from '../../../Redux/slices/DevProfileSlice';
import { fetchDeveloperProfile } from '../../../Redux/Actions/Actions';
import { fontSize } from '@mui/system';
import ProjectSkills from '../../Vendor/Project/ProjectSkills';
import '../DeveloperProject/ProjectDetail.css'
import { MdEdit } from "react-icons/md";

const DevProfile = () => {

  const { logoutUser, profile } = useContext(AuthContext)

  const dispatch = useDispatch();
  const devProfile = useSelector(selectDevProfile);
  // const loading = useSelector(selectDevLoading);
  // const error = useSelector(selectDevError);

  useEffect(() => {
    console.log('Inside useEffect');
    dispatch(fetchDeveloperProfile())
      .then((result) => console.log('Fetch success developer profile:', result))
      .catch((err) => console.error('Fetch error developer profile:', err));
  }, [dispatch]);

  // if (loading) {
  //   console.log('Loading...');
  //   return <p>Loading...</p>;
  // }

  // if (error) {
  //   console.log('Error:', error);
  //   return <p>Error: {error}</p>;
  // }

  console.log('000000000', devProfile);

  const experiences = devProfile.dev_profile?.experiences;
  const educations = devProfile.dev_profile?.educations;


  const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });

  return (
    <div >
      <BottomBar />
      <div className='flex justify-center'>
        <Grid container  >
          <Grid item xs={3} >
            <div className="flex justify-center">
              <div className="flex flex-col my-8">
                <div className="mb-2">
                  <Avatar
                    alt="{dev_profile.dev_profile.first_name[0].toUpperCase() + dev_profile.dev_profile.last_name[0].toUpperCase()}" style={{height:"300px",width:"300px"}} />
                </div>
                <div>
                  <Typography className='mb-5' variant="h5">
                    {devProfile.first_name} {devProfile.last_name}
                  </Typography>
                  <Typography className='mb-5' variant="h6">{devProfile.username} </Typography>
                  <Typography className='mb-5' variant="h6">{devProfile.email} </Typography>
                  <Button style={{ color: "white", backgroundColor: "gray" }} className='w-72 h-12 mb-5 bg-blue-gray-500' >
                      Edit Profile
                  </Button>
                  <div className='mt-3'>
                    <Typography variant="body1">
                      <LocationOnIcon />country
                    </Typography>
                    <Typography variant="body1 flex">
                      <FactoryIcon /> {devProfile.dev_profile?.city}, {devProfile.dev_profile?.state}
                    </Typography>
                    <Typography variant="body1 flex">
                      <ApartmentIcon />{devProfile.dev_profile?.country ? devProfile.dev_profile?.country : "country"}
                    </Typography>
                    <Typography variant="body1 flex">
                      <InsertLinkIcon /> {devProfile.dev_profile?.media_links}
                    </Typography>
                    <hr style={{ borderTop: "2px solid #ddd", margin: "12px 0", marginTop: "1em" }} />
                    <div className='p-2 flex justify-between ' onClick={()=> logoutUser()}>
                        Sign out <LogoutIcon/>
                    </div>
                    <hr style={{ borderTop: "2px solid #ddd", margin: "12px 0", marginTop: "1em" }} />
                  </div>
                </div>
              </div>
            </div>
          </Grid>
          <Grid item xs={9}>
            <div>
              <Card style={{ width: "65em", height: "auto", margin: "10px", marginTop: "40px" }}>
                <Card className='first h-full border-2  border-gray-500' style={{ width: "100%", margin: "auto" }}>
                  <div>
                    <p className='p-8'>
                      <div className='mb-5 flex justify-between'>
                        <Typography className='font-bold mb-4 flex gap-9' variant="h4">
                          {devProfile.dev_profile?.headline} <MdEdit className='font-thin' />
                        </Typography>
                      </div>
                      <Typography variant="h6">
                        {devProfile.dev_profile?.description}
                      </Typography>
                    </p>
                  </div>
                </Card>
                <Card className='second h-full border-2  border-gray-500' style={{ width: "100%", margin: "auto" }}>
                  <div>
                    <p className='p-8'>
                      <div>
                        <Typography variant="h4" >Work History</Typography>
                        {experiences && experiences.length > 0 ? (
                          <div className='mb-8'>
                            <Typography variant="h6">
                              {experiences[0].designation_title} | {experiences[0].company}
                            </Typography>
                            <Typography variant="h6">
                              {experiences[0].start_date} - {experiences[0].end_date}
                            </Typography>
                            <Typography variant="h6">
                              {experiences[0].location}, {experiences[0].country}
                            </Typography>
                          </div>
                        ) : (
                          <Typography style={{ color: "gray" }} variant="h6">No work history</Typography>
                        )}
                      </div>
                    </p>
                  </div>
                </Card>
                <Card className='second h-full border-2  border-gray-500' style={{ width: "100%", margin: "auto" }}>
                  <div>
                    <p className='p-8'>
                      <Typography variant="h4">Education History</Typography>
                      {educations && educations.length > 0 ? (
                        <div className='mb-8'>
                          <Typography variant="h6">
                            {educations[0].degree} | {educations[0].field_of_study}
                          </Typography>
                          <Typography variant="h6">
                            {educations[0].school}
                          </Typography>
                          <Typography variant="h6">
                            {/* {educations[0].start_date} - {educations[0].end_date} */}
                          </Typography>
                          <Typography variant="h6">
                            {educations[0].note}
                          </Typography>
                        </div>
                      ) : (
                        <Typography style={{ color: "gray" }} variant="h6">No work history</Typography>
                      )}
                    </p>
                  </div>
                </Card>
                <Card className='second h-full border-2  border-gray-500' style={{ width: "100%", margin: "auto" }}>
                  <div className='p-8'>
                    <p>
                      <Typography variant="h4">Skills</Typography>
                      <div className='flex'>

                        {/* <ProjectSkills project_id={devProfile.dev_profile.skills} /> */}

                        {/* If devProfile.dev_profile.skills is also available, you can render it as well */}
                        {/* {devProfile.dev_profile.skills && devProfile.dev_profile.skills.length > 0 ? (
                        <ul>
                        {devProfile.dev_profile.skills}
                        </ul>
                        ) : (
                        <Typography variant="h6">No skills available</Typography>
                      )}  */}
                      </div>
                    </p>
                  </div>
                </Card>
                <Card className='second h-full border-2  border-gray-500' style={{ width: "100%", margin: "auto" }}>
                  <div className='p-8'>
                    <p>
                      <Typography variant="h4">CV</Typography>
                      <Box
                        bgcolor="background.paper"
                        boxShadow={3}
                        p={3}
                        borderRadius={5}
                        marginTop={3}
                      >
                        {/* Your content inside the Box goes here */}
                        <Typography variant="body1">
                          <LibraryBooksIcon/>
                          Mufees Rahman.pdf
                          {/* Date Added: 31/1/2024 */}
                        </Typography>
                      </Box>
                    </p>
                  </div>
                </Card>

              </Card>
            </div>
          </Grid>
        </Grid>
      </div>
    </div >
  )
}

export default DevProfile