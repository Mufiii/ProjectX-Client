import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../context/AuthContext"
import { 
  Card,
  CardContent,
  Typography
} from '@mui/material'
import '../components/Vendor/Project/ProjectList.css'
import axios from "axios"
import ProjectSkills from "./Vendor/Project/ProjectSkills"
import './Vendor/Project/ProjectList.css'
import ProjectItemCreated from "./Vendor/Project/ProjectItemCreated"
import VerifiedIcon from '@mui/icons-material/Verified';

const Home = () => {

  const {authToken} = useContext(AuthContext)
  const [AllProjects,setAllProjects] = useState([])

  useEffect(()=>{

    let AllProjectsView = async() => {
      
      let response = await axios.get('http://127.0.0.1:8000/developer/view_projects/',{
        headers:{
          Authorization: `Bearer ${authToken.access}`
        }
      })
      const data = response.data
      console.log(data);
      setAllProjects(data)
    }

    AllProjectsView()

  },[])
    
  return (
    <div>
      <div className="mt-10">
          {AllProjects.map(project => (
            <div key={project.id} className="flex flex-col">
              <Card className="border-y-2  border-gray-100 max-w-7xl mx-16 hover:bg-gray-200 transition duration-300">
                <CardContent>
                    <div className="mb-5" style={{ display: 'flex', flexDirection: 'column' }}>
                    <ProjectItemCreated project={project} />
                      <Typography style={{ fontWeight: 'bold', fontSize: '20px', marginBottom: '8px' }}>
                        {project.title}
                      </Typography>
                      <div style={{ display: 'flex' }}>
                        <Typography>{project.price_type} -</Typography>
                        <Typography>{project.price}-</Typography>
                        <Typography>{project.level.name}</Typography>
                      </div>
                    </div>
                    <h2>{project.category ? project.category.name : 'Unknown Category'}</h2>
                    <h2>{project.description}</h2>
                    <p className="mt-5">
                      <ProjectSkills project_id={project.id}/>
                    </p>
                    <p className="mt-5"><VerifiedIcon style={{ color: 'gray' }}/> Payment verified</p>
                    {/* <h2>note: {project.note}</h2> */}
                    {/* {console.log("Yoyooooooooo",project.skills.map(skill => skill.name))} */}
                    {/* <h2>project_type: {project.project_type}</h2> */}
                    {/* <h2>status: {project.status}</h2> */}
                    
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      
    </div>
  )
}

export default Home