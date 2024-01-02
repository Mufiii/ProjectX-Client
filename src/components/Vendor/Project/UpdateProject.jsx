import axios from 'axios'
import { useContext,useEffect,useState } from 'react'
import { useParams } from 'react-router-dom'
import { AuthContext } from '../../../context/AuthContext'

const UpdateProject = () => {


  const { authToken, projects, setProjects } = useContext(AuthContext)
  const [singleProject, setSingleProject] = useState(null);
  const {id} = useParams()

  const UpdateProjectView = async (e) => {
      e?.preventDefault()

      let response = await axios({
        method: !e? 'GET' : 'PUT',
        url:`http://127.0.0.1:8000/project/${id}`,
        headers: {
          Authorization: `Bearer ${authToken.access}`,
        },
      })
      const data = response.data
      setSingleProject(data)
      console.log(data);
  }

  useEffect(()=>{
    UpdateProjectView()
    
  },[])

  return (
    <div>

      <div>
        {singleProject && (
          <>
            <div>
                <h2>{singleProject.title}</h2>
                <p>{singleProject.description}</p>
            </div>
          </>
        )}
      </div>

    </div>
  )
}

export default UpdateProject