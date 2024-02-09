import axios from 'axios'
import { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AuthContext } from '../../../context/AuthContext';
import {
  Grid,
  Typography,
  Avatar,
  Card,
} from '@mui/material'
import ProjectSkills from './ProjectSkills'
import ProjectItemCreated from './ProjectItemCreated'
import './VendorProjectDetail.css'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import PsychologyIcon from '@mui/icons-material/Psychology';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { fetchSpecificProjectInDetail } from '../../../Redux/Actions/Actions';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { selectProjectDetail } from '../../../Redux/slices/ProjectDetailSlice';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';




const VendorProjectDetailPage = () => {


  const dispatch = useDispatch()
  const { projId } = useParams()
  const projectDetail = useSelector(selectProjectDetail)
  const [selectedSection, setSelectedSection] = useState('viewJob');

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


  return (
    <div>
      {/* <Card style={{ width: '60em', borderRadius: '10px', border: '2px solid #888' }} className=' h-full p-3'> */}
        <Grid container spacing={2} className='flex'>
          <Grid item xs={9}>
            {projectDetail ? (
              <div>

                  <div className="flex-1 mb-1">
                  <h5 style={{ color: "green", fontWeight: "700", fontSize: "1.2em" }}>{projectDetail.title}</h5>
                </div>
                <div>
                  <ProjectItemCreated project={projectDetail} />
                </div>
                <hr style={{ borderTop: "2px solid #ddd", margin: "12px 0", marginTop: "2em" }} />
                <h2>{projectDetail.description}</h2>
                <hr style={{ borderTop: "2px solid #ddd", margin: "12px 0", marginTop: "1em" }} />
                <div className='flex gap-12'>
                  <div>
                    <div className='flex flex-col'>
                      <p><AttachMoneyIcon /> <span className='font-bold'>${projectDetail.price}</span></p>
                      <p style={{ color: "gray" }} className='mx-7 flex'>{projectDetail.price_type}</p>
                    </div>

                    <div>
                      <p>
                        <PsychologyIcon />
                        <span className='font-bold'>{projectDetail.level.name}</span>
                        {projectDetail.level.name === 'Entry' && (
                          <>
                            <br />
                            <div className='mx-6'>
                              <span style={{ color: 'gray' }}>
                                I am looking for <br />freelancers with the <br /> lowest rates
                              </span>
                            </div>
                          </>
                        )}
                        {projectDetail.level.name === 'Expert' && (
                          <>
                            <br />
                            <div className='mx-6 mt-1'>
                              <span style={{ color: 'gray' }}>
                                I am willing to pay <br /> higher rates for the <br />
                                most experienced <br /> freelancers
                              </span>
                            </div>
                          </>
                        )}
                        {projectDetail.level.name === 'Intermediate' && (
                          <>
                            <br />
                            <div className='mx-6'>
                              <span style={{ color: 'gray' }}>
                                I am looking for a mix <br /> of experience and <br /> value
                              </span>
                            </div>
                          </>
                        )}
                        <hr style={{ borderTop: "2px solid #ddd", margin: "12px 0", marginTop: "1em" }} />
                        <div>

                          <p className='text-xl font-bold mb-5'>Skills and Expertise</p>
                          <p>
                            <ProjectSkills project_id={projectDetail.id} />
                          </p>
                        </div>
                        <hr style={{ borderTop: "2px solid #ddd", margin: "12px 0", marginTop: "1em" }} />
                        <h2><span>Project type:</span> {projectDetail.project_type}</h2>
                        <hr style={{ borderTop: "2px solid #ddd", margin: "12px 0", marginTop: "1em" }} />
                      </p>
                    </div>
                  </div>
                </div>
                        </div>
            ) : (
              <p>Loading...</p>
            )}
          </Grid>
          <Grid item xs={3}>
            <div className="flex-1 mt-10">
              <div className='h-full' style={{ borderLeft: '1px solid black', height: '70vh', marginRight: '1px' }}>
                <div className="flex items-center mx-10">
                  <EditIcon style={{ fontSize: '15px', color: 'green' }} />
                  <span style={{ fontSize: '15px', color: 'green' }}>Edit posting</span>
                </div>
                <div className="flex items-center mx-10">
                  <CloseIcon style={{ fontSize: '15px', color: 'green' }} />
                  <span style={{ fontSize: '15px', color: 'green', }}>Remove posting</span>
                </div>
                <hr style={{ borderTop: "2px solid #ddd", margin: "12px 0", marginTop: "2.7em", marginBottom: "5px" }} />
                {/* <div className='flex justify-center mt-5 items-center'>
                        <h6>About the client</h6>
                        <h6>Payment method Verified</h6>
                      </div> */}
              </div>
            </div>
          </Grid>


        </Grid>
      {/* </Card> */}
    </div>



  )
}

export default VendorProjectDetailPage