import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { AuthContext } from "../../../context/AuthContext"
import { 
  Button,
  Typography,
  TextareaAutosize,
  Card,
  CardContent,
  Grid
} from '@mui/material'
import ProjectSkills from "../../Vendor/Project/ProjectSkills"
import ProjectItemCreated from "../../Vendor/Project/ProjectItemCreated"
import './ProjectDetail.css'
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import PsychologyIcon from '@mui/icons-material/Psychology';
import VerifiedIcon from '@mui/icons-material/Verified';


const ProjectDetail = () => {

  const {project_id} = useParams()
  const {authToken} = useContext(AuthContext)
  const [ projectDetail,setProjectDetail ] = useState([])
  const [formData, setFormData] = useState({
    cover_letter: '',
    notes: '',
    approach: '',
    attachment: '',
  });
  console.log(formData,'123456789');


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    console.log(file,"wsedrcftvgbhn");
    setFormData({ ...formData, attachment: file });
  };

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
  
  const SingleProjectView = async() => {
    
    try {
      const response = await axios.get(`http://127.0.0.1:8000/developer/view_projects/${project_id}/`, {
        headers: {
          Authorization: `Bearer ${authToken.access}`
        }
      });

      const data = response.data;
      console.log(data,'yoyo');
      setProjectDetail(data)
    } catch (error) {
      console.error("Error fetching project data:", error.message);
    }
  }

  const ProjectProposal = async(e) => {
      e.preventDefault()

      const formDataToSend = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        formDataToSend.append(key, value);
      });

    try {
      let response = await axios.post(`http://127.0.0.1:8000/developer/view_projects/${project_id}/apply/`,
        formDataToSend,
      {
        headers: {
          Authorization: `Bearer ${authToken.access}`
        }
      })
      const data = response.data
      console.log(data);
    } catch (error) {
      console.error("Error submitting project proposal:", error.message);
    }
  }

  useEffect(()=>{
      SingleProjectView()
  },[])
    
  return (
    <>

      <Grid container spacing={2}>
        <Grid item xs={8} >
          <div className="left-content">
          {projectDetail.map(project => (
            <div key={project.id} className="project-container ml-40">
                <div style={{ display: 'flex', flexDirection: 'column', marginTop: '50px' }}>
                  <Typography className="main-title" style={{ fontWeight: 'bold', fontSize: '25px'  }}>
                    {project.title}
                  </Typography>
                  <div className="mb-5 mt-2">
                    <ProjectItemCreated project={project} />
                  </div>
                </div>
                <div className="max-w-5xl mb-8" style={{ "height": "2px","backgroundColor": "#ced4da "}}></div>
                      <h2>{project.category ? project.category.name : 'Unknown Category'}</h2>
                      <h2>{project.description}</h2>
                <div className="max-w-5xl mt-8 mb-8" style={{ "height": "2px","backgroundColor": "#ced4da "}}></div>
                <div className='flex gap-16'>
                        <div>
                          <p><AttachMoneyIcon/> <span className='font-bold'>${project.price}</span></p>
                          <p style={{color:"gray"}} className='mx-7'>{project.price_type}</p>
                        </div>

                        <div>
                            <p>
                              <PsychologyIcon />
                              <span className='font-bold'>{project.level.name}</span>
                              {project.level.name === 'Entry' && (
                                <>
                                    <br />
                                  <div className='mx-6'>
                                    <span style={{ color: 'gray' }}>
                                      I am looking for <br />freelancers with the <br /> lowest rates
                                    </span>
                                  </div>
                                </>
                              )}
                              {project.level.name === 'Expert' && (
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
                              {project.level.name === 'Intermediate' && (
                                <>
                                    <br />
                                  <div className='mx-6'>
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

                        <form >
                          <Card className="border-2 mb-10 border-blue-gray-300 max-w-5xl">
                            <CardContent>
                                <p className="font-bold text-xl mb-3">Additionol Details</p>
                                <div className="flex flex-col">
                                    <label className="mb-2">Cover Letter</label>
                                    <TextareaAutosize
                                        aria-label="Cover Letter"
                                        minRows={6}
                                        name="cover_letter"
                                        type="text"
                                        value={formData.cover_letter}
                                        onChange={handleInputChange}
                                        className="custom-textarea mb-5 "
                                        style={{ width: '100%' }}
                                        />
                                    <label className="mb-2">Describe your recent experience with similar projects
                                    </label>
                                    <TextareaAutosize
                                        minRows={6}
                                        name="notes"
                                        placeholder="Describe your recent experience with similar projects"
                                        type="text"
                                        value={formData.notes}
                                        onChange={handleInputChange}
                                        className="custom-textarea mb-5"
                                        style={{ width: '100%' }}
                                        />
                                    <label className="mb-2">Approach</label>
                                    <TextareaAutosize
                                        aria-label="Cover Letter"
                                        minRows={6}
                                        name="approach"
                                        label="Approach"
                                        type="text"
                                        value={formData.approach}
                                        onChange={handleInputChange}
                                        className="custom-textarea mb-5"
                                        style={{ width: '100%' }}
                                        />
                                    <label>Attatchments</label>
                                    <div
                                      name="attachments"
                                      type="text"
                                      placeholder="Upload the Project files"
                                      className="h-20 upload border-4 border-dashed rounded-lg bg-gray-300"
                                      >
                                      <Button component="label" variant="contained" startIcon={<CloudUploadIcon />}>
                                        Upload file
                                        <VisuallyHiddenInput 
                                            type="file"
                                            onChange={handleFileChange}
                                      />
                                      </Button>
                                      {formData.attachment && (
                                        <span className="ml-2">{formData.attachment.name}</span>
                                      )}
                                    </div>
                                </div>
                            </CardContent>
                          </Card>
                        </form>
            </div>
            ))} 
        </div>
      </Grid>
          <Grid item xs={4}>
            <div className="right-content">
              <div className="vertical-line">
                <div className="main-div mr-96">
                  <div className="mb-8 ml-10 justify-start">
                    <div className="flex flex-col w-48 ">
                        <Button
                          as="a"
                          variant="contained"
                          color="success"
                          className="buttons border-2 border-green-700 text-center mt-4"
                          onClick={ProjectProposal}
                          >
                          Apply
                        </Button>
                        <Button
                          as="a"
                          href=""
                          className="buttons border-2 border-green-700 rounded-xl mt-4 text-center" 
                        >
                          <FavoriteBorderIcon style={{color:"green"}} /> <span style={{color:"green"}}>Save job</span>
                        </Button>
                        <div className="mt-10">
                            <p className="flex justify-center" style={{ fontWeight: 'bold', fontSize: '20px'  }}>
                              About the client
                            </p>
                            <div className="mt-5">
                              <p className="flex gap-1"><VerifiedIcon  style={{ color: 'gray' }} /> Payment method verified</p>
                              <p></p>
                              <p></p>
                            </div>
                        </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Grid>
        </Grid>
    
    </>

  )
}

export default ProjectDetail