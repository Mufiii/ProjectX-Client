import axios from 'axios'
import { useContext, useEffect } from 'react'
import { AuthContext } from '../../../context/AuthContext'
import { 
  Button,
  Card,
  CardContent,
  Typography
} from '@mui/material'
import './ProjectList.css'
import ProjectSkills from './ProjectSkills'
import ProjectItemCreated from './ProjectItemCreated'
import { useNavigate } from 'react-router-dom'
// import FavoriteBorderIcon from



export const ProjectList = () => {

  const { authToken,projects,setProjects } = useContext(AuthContext)
  const navigate = useNavigate()

  useEffect(() =>{

  const ProjectView = async () => {
    
    try {
      const response = await axios.get('http://127.0.0.1:8000/vendor/project/', {
        headers: {
          Authorization: `Bearer ${authToken.access}`,
          'Content-Type': 'application/json',
        }
      })
      const data = response.data
      console.log(data,'222222222222');
      setProjects(data)
    }
    catch (error) {
      console.log(error.message);
    }
  }

    ProjectView()
  },[])

  
  
  return (
    <div>

      <form>
      <Button as="a" href='/Addprojects' variant="contained" color="success" className='float-right'>
        ADD PROJECT
      </Button><br />
        <div>
          <h1>Project List</h1>
          {projects.map(project => (
            <div key={project.id} className="project-container">
              <Card onClick={() => navigate(`/projects/detail/${project.id}`)} className="border-y-2  border-gray-100 max-w-7xl mx-16 hover:bg-gray-200 transition duration-300">
                <CardContent>
                    {/* <FavoriteBorderIcon style={{ position: 'absolute', top: 10, right: 10 }} /> */}
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <ProjectItemCreated project={project} />
                      <Typography style={{ fontWeight: 'bold', fontSize: '20px', marginBottom: '8px' }}>
                        {project.title}
                      </Typography>
                      <div style={{ display: 'flex' }}>
                        <Typography>{project.price_type} -</Typography>
                        <Typography>{project.level ? project.level.name : 'Unknown Level'} -</Typography>
                        <Typography>{project.price}</Typography>
                      </div>
                    </div>
                    <h2>{project.category ? project.category.name : 'Unknown Category'}</h2>
                    <h2>{project.description}</h2>
                    <p>
                      <ProjectSkills project_id={project.id}/>
                    </p>
                    {/* <h2>note: {project.note}</h2> */}
                    {/* {console.log("Yoyooooooooo",project.skills.map(skill => skill.name))} */}
                    {/* <h2>project_type: {project.project_type}</h2> */}
                    {/* <h2>status: {project.status}</h2> */}

                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </form>


    </div>
  )
}
