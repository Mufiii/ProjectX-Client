import axios from 'axios'
import { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AuthContext } from '../../../context/AuthContext';
import { 
  Grid,
  Typography,
  Avatar, 
} from '@mui/material'
import ProjectSkills from './ProjectSkills'
import ProjectItemCreated from './ProjectItemCreated'
import './VendorProjectDetail.css'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import PsychologyIcon from '@mui/icons-material/Psychology';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';




const VendorProjectDetailPage = () => {

  const {id} = useParams();
  const {authToken} = useContext(AuthContext)
  const [vendorProjects,setVendorProjects] = useState([])
  console.log(vendorProjects,'77777777777777');

  const ProjectDetailPage = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/vendor/project/${id}`, {
        headers: {
          Authorization: `Bearer ${authToken.access}`,
        },
      });
      const data = response.data;
      console.log(response, '33333333333');
      console.log(data, '66666666666');
      setVendorProjects([data]); 
    } catch (error) {
      console.error('Error fetching project details:', error);
    }
  }
  useEffect(()=>{
    ProjectDetailPage()
  },[])

  return (
    <>
     <Grid container spacing={2}>
        <Grid item xs={8}>
          <div className="left-content">
            {vendorProjects && vendorProjects.map(project => (

                <div key={project.id} className="project-container ml-40">
                    <div style={{ display: 'flex', flexDirection: 'column', marginTop: '50px' }}>
                      <Typography className="main-title" style={{ fontWeight: 'bold', fontSize: '25px'  }}>
                        {project.title}
                      </Typography>
                      <div className="mb-8">
                        <ProjectItemCreated project={project} />
                      </div>
                    </div>
                    <div className="max-w-5xl mb-8" style={{ "height": "2px","backgroundColor": "#ced4da "}}></div>
                      <h2>{project.category ? project.category.name : 'Unknown Category'}</h2>
                      <h2>{project.description}</h2>
                    <div className="max-w-7xl mt-10 mb-8" style={{ "height": "2px","backgroundColor": "#ced4da "}}></div>
                      <div className='flex gap-16'>
                        <div>
                          <p><AttachMoneyIcon/> <span className='font-bold'>${project.price}</span></p>
                          <p style={{color:"gray"}} className='mx-7'>{project.price_type}</p>
                        </div>

                        <div>
                             <p>
                               <PsychologyIcon />
                               <span className='font-bold'>{project.level.name}</span>
                               {project.level.name === 'Entry Level' && (
                                <>
                                    <br />
                                  <div className='mx-6'>
                                    <span style={{ color: 'gray' }}>
                                      I am looking for <br />freelancers with the <br /> lowest rates
                                    </span>
                                  </div>
                                </>
                              )}
                              {project.level.name === 'Expert Level' && (
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
                              {project.level.name === 'Entry' && (
                                <>
                                  <div className='mx-6'>
                                    <br />
                                    <span style={{ color: 'gray' }}>
                                      I am looking for a mix <br /> of experience and <br /> value
                                    </span>
                                  </div>
                                </>
                              )}
                             </p>
                           </div>
                         </div>
                     <div className="max-w-7xl mt-10 mb-8" style={{ "height": "2px","backgroundColor": "#ced4da "}}></div>
                     <p className='text-xl font-bold mb-5'>Skills and Expertise</p>
                     <p>
                       <ProjectSkills project_id={project.id}/>
                     </p>
                     <div className="max-w-6xl mt-10 mb-8" style={{ "height": "2px","backgroundColor": "#ced4da "}}></div>
                        <h2><span>Project type:</span> {project.project_type}</h2>
                     <div className="max-w-6xl mt-10 mb-8" style={{ "height": "2px","backgroundColor": "#ced4da "}}></div>
               </div>
              ))}
            </div>
          </Grid>
          <Grid item xs={4}>
          <div className="right-content">
            <div className="vertical-line">
              <div className="flex flex-col w-full mx-10" style={{ width: '200px', marginTop: '50px' }}>
                <p className='mt-7' style={{ fontWeight: 'bold', fontSize: '25px' }}>Applicants <span>List</span></p>
                <div className='mt-10'>
                  {vendorProjects.map((project) => (
                    <div key={project.id}>
                      {project.applicants.map((applicant) => (
                        <div className='flex gap-3 mb-2' key={applicant.user.id}>
                          {applicant.profile_picture ? (
                            <Avatar src={applicant.profile_picture} style={{ width: "40px", height: "40px" }} alt={`Profile Picture of ${applicant.user.username}`} />
                          ) : (
                            <Avatar style={{ width: "40px", height: "40px" }} src="/broken-image.jpg" />
                          )}
                          <Typography className='text-6xl font-bold'>{applicant.user.username}</Typography>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
                <div className="max-w-5xl mt-4" style={{ "height": "2px", "backgroundColor": "#ced4da " }}></div>
                    <p className='flex justify-end mt-4'>See all <ArrowForwardIosIcon /></p>
                <div className="max-w-5xl mt-4" style={{ "height": "2px", "backgroundColor": "#ced4da " }}></div>
              </div>
            </div>
          </div>
      </Grid> 
    </Grid>
    </>
  )
}

export default VendorProjectDetailPage