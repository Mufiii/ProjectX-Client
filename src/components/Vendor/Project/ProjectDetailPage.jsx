import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectProjectDetail, selectProjectLoading, selectProjectError } from '../../../Redux/slices/ProjectDetailSlice'
import { fetchSpecificProjectInDetail } from '../../../Redux/Actions/Actions'
import { useParams } from 'react-router-dom'
import { Divider, Grid, Typography } from '@mui/material'
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import { Card } from '@mui/material'
import { Box } from '@mui/system'
import ProjectItemCreated from './ProjectItemCreated'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import PsychologyIcon from '@mui/icons-material/Psychology';
import ProjectSkills from './ProjectSkills'
// import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import './VendorProjectDetail.css'
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import VendorProjectDetailPage from './VendorProjectDetailPage'
import InviteFreelancersComponent from './InviteFreelancersComponent'
import ReviewProposalsComponent from './ReviewProposalsComponent'
import HireDevelopersComponent from './HireDevelopersComponent'
import { useContext } from 'react'
import { AuthContext } from '../../../context/AuthContext'

const ProjectDetailPage = () => {

  const dispatch = useDispatch()
  const {hiredDevelopers} = useContext(AuthContext) 
  const { projId } = useParams()
  const projectDetail = useSelector(selectProjectDetail)
  // const loading = useSelector(selectProjectLoading)
  // const error = useSelector(selectProjectError)
  const [selectedSection, setSelectedSection] = useState('viewJob');

  const totalApplicants = hiredDevelopers.reduce(
    (total, item) => 
      total + item.applicant.length, 0
    );

  const handleSectionClick = (section) => {
    setSelectedSection(section === selectedSection ? null : section);
  };

  const getSectionStyle = (section) => ({
    flex: 1,
    cursor: 'pointer',
    backgroundColor: selectedSection === section ? 'green' : 'inherit',
    padding: '10px',
    textAlign: 'center',
    transition: 'background-color 0.3s',
  });

  useEffect(() => {
    console.log('inside UseEffect');
    dispatch(fetchSpecificProjectInDetail(projId))
      .then((result) => {
        console.log('Fetch success', result);
        setSelectedSection('viewJob');
      })
      .catch((err) => {
        console.error('Fetch error', err);
      });
  }, [dispatch, projId])

  // if (loading) {
  //   console.log(loading);
  //   return  <p>loading</p>
  // }

  // if (error) {
  //   console.log('error');
  //   return <p>error</p> 
  // }

  console.log('projectDetail', projectDetail);

  return (
    <div className='flex justify-center mt-32'>
      <div className=' px-10'>
        {projectDetail ? (
          <div>
            {/* <h1>{projectDetail.title}</h1> */}
            <h2 className='mb-5' style={{ fontWeight: "500", fontSize: "1.5em" }}>{projectDetail.title}</h2>
            {/* Other properties and components */}
          </div>
        ) : (
          <p>Loading...</p>
        )}

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            border: '1px solid',
            borderColor: 'divider',
            width: '60em',
            height: '3em',
            borderRadius: 2,
            bgcolor: 'background.paper',
            color: 'text.secondary',
            marginBottom: "2em"
          }}
        >
          <div className='text-center' style={getSectionStyle('viewJob')} onClick={() => handleSectionClick('viewJob')}>
            <Typography variant="body1">View Job Post</Typography>
          </div>
          <Divider orientation="vertical" variant="middle" flexItem />
          <div className='text-center' style={getSectionStyle('inviteFreelancers')} onClick={() => handleSectionClick('inviteFreelancers')}>
            <Typography variant="body1">Invite Freelancers</Typography>
          </div>
          <Divider orientation="vertical" variant="middle" flexItem />
          <div className='text-center' style={getSectionStyle('reviewProposals')} onClick={() => handleSectionClick('reviewProposals')}>
            <Typography variant="body1">Review Proposals</Typography>
          </div>
          <Divider style={{ borderRadius: "10px" }} orientation="vertical" variant="middle" flexItem />
          <div className='text-center' style={getSectionStyle('hire')} onClick={() => handleSectionClick('hire')}>
            <Typography variant="body1">Hire ({totalApplicants})</Typography>
          </div>
        </Box>
        <div>
          <Card style={{width:"60em"}} className='w-full mx-auto p-3 border-2 border-gray-500'>
            <div className='flex flex-col'>
              {selectedSection === 'viewJob' && <VendorProjectDetailPage />}
              {selectedSection === 'inviteFreelancers' && <InviteFreelancersComponent />}
              {selectedSection === 'reviewProposals' && <ReviewProposalsComponent />}
              {selectedSection === 'hire' && <HireDevelopersComponent />} 
            </div>
          </Card>
        </div>
      </div>


    </div>
  )
}

export default ProjectDetailPage