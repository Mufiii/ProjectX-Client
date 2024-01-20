import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../../context/AuthContext"
import {
  Card,
  CardContent,
  Grid,
  Typography,
} from '@mui/material'
import axios from "axios"
import ProjectSkills from "../Vendor/Project/ProjectSkills"
import '../Vendor/Project/ProjectList.css'
import ProjectItemCreated from "../Vendor/Project/ProjectItemCreated"
import VerifiedIcon from '@mui/icons-material/Verified';
import { useNavigate } from 'react-router-dom'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import './Home.css'
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';

const Home = () => {

  const { authToken } = useContext(AuthContext)
  const [AllProjects, setAllProjects] = useState([])
  const navigate = useNavigate()
  const [selectedFilter, setSelectedFilter] = useState(null);

  const handleFilterClick = (filter) => {
    setSelectedFilter(filter);
  };

  useEffect(() => {

    let AllProjectsView = async () => {

      let response = await axios.get('http://127.0.0.1:8000/developer/view_projects/', {
        headers: {
          Authorization: `Bearer ${authToken.access}`
        }
      })
      const data = response.data
      console.log(data);
      setAllProjects(data)
    }

    AllProjectsView()

  }, [])

  return (
    <div>

      <Grid container spacing={2}>
        <Grid item xs={3}>
          {/* <div className="left-content mx-32 mt-14 ">
            <div className="">
              <p className="flex flex-col text-lg font-bold">Category</p>
                <div className="flex justify-center">
              <Card style={{height:"70vh", width:"400px"}} className="h-72 border-2 border-blue-gray-800 mt-5 ">
                  <label className="text-lg">Experience Level</label>
                  <div className="flex flex-col">
                    <h5><CheckBoxOutlineBlankIcon/> Entry level</h5>
                    <h5><CheckBoxOutlineBlankIcon/> Intermidiate level</h5>
                    <h5><CheckBoxOutlineBlankIcon/> Expert level</h5>
                  </div>
              </Card>
                </div>
            </div>
          </div> */}
        </Grid>
        <Grid item xs={8}>
          <div className="mt-10 mx-16  ">
            <div style={{ marginLeft: "410px" }} className="flex gap-4">
              <p
                className={`filter ${selectedFilter === 'bestMatches' ? 'selected' : ''}`}
                onClick={() => handleFilterClick('bestMatches')}
                style={{ 'fontWeight': '700' }}
              >
                Best matches
              </p>
              <p
                className={`filter ${selectedFilter === 'mostRecent' ? 'selected' : ''}`}
                onClick={() => handleFilterClick('mostRecent')}
                style={{ 'fontWeight': '700' }}
              >
                Most recent
              </p>
              <p
                className={`filter ${selectedFilter === 'savedJobs' ? 'selected' : ''}`}
                onClick={() => handleFilterClick('savedJobs')}
                style={{ 'fontWeight': '700' }}
              >
                Saved jobs
              </p>
            </div>
          </div>

          <div className="horizontal-line max-w-6xl ml-auto"></div>
          <div className="flex justify-end">
            <div>
              {AllProjects.map(project => (
                <div key={project.id} className="flex flex-col">
                  <Card className="border-y-2  border-gray-100 max-w-6xl  hover:bg-gray-200 transition duration-300"
                    onClick={() => navigate(`/projects/${project.id}`)}
                  >
                    <CardContent style={{ position: 'relative' }}>
                      <div>
                        <FavoriteBorderIcon style={{ position: 'absolute', top: 25, right: 25, zIndex: 1, color: 'green' }} />
                      </div>
                      <div className="mb-5" style={{ display: 'flex', flexDirection: 'column' }}>
                        <ProjectItemCreated project={project} />
                        <Typography style={{ fontWeight: 'bold', fontSize: '20px', marginBottom: '8px' }}>
                          {project.title}
                        </Typography>
                        <div style={{ display: 'flex' }}>
                          <Typography>{project.price_type} - </Typography>
                          <Typography>{project.price} - </Typography>
                          <Typography> {project.level.name}</Typography>
                        </div>
                      </div>
                      <h2>{project.category ? project.category.name : 'Unknown Category'}</h2>
                      <h2>{project.description}</h2>
                      <p className="mt-5">
                        <ProjectSkills project_id={project.id} />
                      </p>
                      <p className="mt-5"><VerifiedIcon style={{ color: 'gray' }} /> Payment verified</p>
                      {/* <h2>note: {project.note}</h2>
                      {console.log("Yoyooooooooo", project.skills.map(skill => skill.name))}
                      <h2>project_type: {project.project_type}</h2>
                      <h2>status: {project.status}</h2> */}

                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  )
}

export default Home